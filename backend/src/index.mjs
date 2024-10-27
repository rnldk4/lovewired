import { PrismaClient } from "@prisma/client";
import { Sequelize } from "sequelize";
import connectSessionSequelize from "connect-session-sequelize";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT;

const prisma = new PrismaClient();
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "mysql",
});
const SequelizeStore = connectSessionSequelize(session.Store);

const app = express();

app.use(express.json());
app.use(cors());

app.use(
    session({
        secret: "fakesecret",
        store: new SequelizeStore({
            db: sequelize,
            tableName: "Session",
        }),
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 30,
        },
    })
);

async function startServer() {
    try {
        await sequelize.sync();
        console.log("Session store synchronized");
        app.listen(PORT, () => {
            console.log(`Running on port: ${PORT}`);
        });
    } catch (err) {
        console.log("Error syncing session store", err);
    }
}

startServer();

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send("Not logged in / authenticated");
    }
};

app.get("/users", isAuthenticated, async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).send(users);
    } catch (err) {
        console.log(err);
        res.send.status(500)("Error retrieving data");
    }
});

app.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: password,
            },
        });
        res.status(201).send(
            `User with ID ${newUser.id} and email ${newUser.email} is now registered in the database` //FIXME: username issue
        );
    } catch (err) {
        console.log(err);
        res.status(500).send("Error posting data");
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const findUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!findUser) {
            return res.status(404).send("User not found");
        } else if (findUser.password !== password) {
            return res.status(403).send("Invalid password");
        }

        req.session.user = findUser;

        return res.status(200).send(`Logged in as ${findUser.username}`);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Error retrieving data");
    }
});

app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Session destruction error", err);
        }
        res.clearCookie("connect.sid");
        console.log("Cleared cookie");
        res.status(200).send("Successfully logged out and cleared session.");
    });
});

// app.post("/refresh-session", (req, res) => {
//     if (req.session.user) {
//         req.session.touch();
//         return res.status(200).send("Session refreshed");
//     }
//     return res.status(401).send("User not authenticated");
// });

app.get("/status", isAuthenticated, (req, res) => {
    res.status(200).send("Authenticated");
});

app.post("/addpartner", isAuthenticated, async (req, res) => {
    const user = req.session.user;
    const { givenPartnerid } = req.body;

    try {
        const currentUser = await prisma.user.findUnique({
            where: { id: user.id },
        });

        const partnerUser = await prisma.user.findUnique({
            where: { id: givenPartnerid },
        });

        if (!currentUser && !partnerUser) {
            return res.status(404).send("Both user and partner not found");
        } else if (!currentUser) {
            return res.status(404).send("User not found");
        } else if (!partnerUser) {
            return res.status(404).send("Partner not found");
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                partnerid: givenPartnerid,
            },
        });

        await prisma.user.update({
            where: { id: givenPartnerid },
            data: {
                partnerid: user.id,
            },
        });

        res.status(200).send("Partner has been added");
    } catch (err) {
        res.status(500).send("Error retrieving data", err);
    }
});
