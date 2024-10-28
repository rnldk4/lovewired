import { useState } from "react";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSignup(e: any) {
        e.preventDefault();

        if (!email.includes("@") || !email.includes(".")) {
            setError("Please enter a valid email address.");
        } else {
            setError("");
        }

        if (error === "") {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/register`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            email: email,
                            password: password,
                        }),
                    }
                );

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
        <>
            <div className="max-w-sm mt-20">
                <form
                    className="flex flex-col space-y-10"
                    onSubmit={handleSignup}
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
                            className="placeholder-black p-0 block w-full bg-tansparent border-b border-black focus:outline-none font-sansation"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-28 h-10 rounded-full bg-black text-white font-outfit"
                    >
                        sign up
                    </button>
                </form>
            </div>
        </>
    );
}
