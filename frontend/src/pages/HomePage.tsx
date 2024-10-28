import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/logout`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            const responseMessage = await response.text();

            if (!response.ok) {
                throw new Error(`Logout failed: ${responseMessage}`);
            }

            console.log(responseMessage);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className="ml-20 mt-20">
                <h1 className="text-6xl">Hello world!</h1>
                <button
                    className="w-40 h-20 rounded-full bg-black text-white font-outfit text-2xl mt-20"
                    onClick={handleLogout}
                >
                    Log out
                </button>
            </div>
        </>
    );
}
