import { useState } from "react";
import x from "../../assets/x.svg";

interface LoginModalProps {
    modalOpened: boolean;
    handleCloseClick: () => void;
}

export default function LoginModal({
    modalOpened,
    handleCloseClick,
}: LoginModalProps) {
    if (!modalOpened) return null;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(e: any) {
        e.preventDefault();
        console.log(`Login - email: ${email}, password: ${password}`);

        if (!email.includes("@") || !email.includes(".")) {
            setError("Please enter a valid email address.");
        } else {
            setError("");
        }

        if (error === "") {
            try {
                const response = await fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                });

                const responseMessage = await response.text();

                if (!response.ok) {
                    throw new Error(
                        `Error occurred - status: ${response.status} text: ${responseMessage}`
                    );
                }
                console.log(responseMessage);
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white rounded-lg relative pb-10 animate-modalpop">
                <img
                    src={x}
                    className="absolute right-4 top-4 cursor-pointer"
                    onClick={handleCloseClick}
                />
                <form
                    className="flex flex-col space-y-10 w-96 ml-6 mt-16 mr-6"
                    onSubmit={handleLogin}
                >
                    <div>
                        <input
                            type="text"
                            id="email"
                            className="placeholder-black p-0 block w-full bg-transparent border-b border-black focus:outline-none font-sansation"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className="text-red-500">{error}</p>
                    </div>
                    <div>
                        <input
                            type="password"
                            id="password"
                            className="placeholder-black p-0 block w-full bg-transparent border-b border-black focus:outline-none font-sansation"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="w-28 h-10 rounded-full bg-black text-white font-outfit"
                        >
                            login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
