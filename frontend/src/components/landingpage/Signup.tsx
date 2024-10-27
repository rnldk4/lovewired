export default function Signup() {
    return (
        <>
            <div className="max-w-sm mt-20 ml-12">
                <form className="flex flex-col space-y-10">
                    <div>
                        <input
                            type="email"
                            id="email"
                            className="placeholder-black p-0 block w-full bg-transparent border-b border-black focus:outline-none font-sansation"
                            placeholder="email"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="password"
                            className="placeholder-black p-0 block w-full bg-tansparent border-b border-black focus:outline-none font-sansation"
                            placeholder="password"
                        />
                    </div>
                    <button
                        type="button"
                        className="w-28 h-10 rounded-full bg-black text-white font-outfit"
                    >
                        sign up
                    </button>
                </form>
            </div>
        </>
    );
}
