import { useState } from "react";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSignup(e: any) {
        e.preventDefault();
        console.log(`Signup - email: ${email}, password: ${password}`);

        if (!email.includes("@") || !email.includes(".")) {
            setError("Please enter a valid email address.");
        } else {
            setError("");
        }
    }

    return (
        <>
            <div className="max-w-sm mt-20 ml-12">
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
