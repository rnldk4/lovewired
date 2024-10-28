import React, { useState } from "react";
import logo from "../../assets/placeholderlogo.png";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const [modalOpened, setModalOpened] = useState<boolean>(false);
    const navigate = useNavigate();

    async function handleLoginClick() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/check-session`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const responseMessage = await response.text();

            if (!response.ok) {
                throw new Error(`Error occurred - ${responseMessage}`);
            }

            console.log(responseMessage);
            navigate("/home");
        } catch (err) {
            console.log(err);
            setModalOpened(true);
        }
    }

    function handleContactClick() {
        //
    }

    function closeModal() {
        setModalOpened(false);
    }

    return (
        <>
            <div className="flex justify-between w-full mt-8">
                <img
                    src={logo}
                    className="rounded-full w-36 ml-24"
                    alt="Logo"
                />
                <div className="flex font-poppins items-center mb-8 space-x-20 text-3xl mr-32 relative">
                    <div
                        className="relative cursor-pointer group"
                        onClick={handleContactClick}
                    >
                        <p>contact us</p>
                        <div className="absolute -left-[20px] -bottom-[10px] h-[4px] bg-[#fe85d2] transition-all duration-300 w-0 group-hover:w-[200px]"></div>
                    </div>
                    <div
                        className="relative cursor-pointer group"
                        onClick={handleLoginClick}
                    >
                        <p>login</p>
                        <div className="absolute -left-[20px] -bottom-[10px] h-[4px] bg-[#2596be] transition-all duration-300 w-0 group-hover:w-[114px]"></div>
                    </div>
                </div>
            </div>
            <LoginModal
                modalOpened={modalOpened}
                handleCloseClick={closeModal}
            />
        </>
    );
};

export default Header;
