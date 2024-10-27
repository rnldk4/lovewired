import React, { useState } from "react";
import logo from "../../assets/placeholderlogo.png";
import LoginModal from "./LoginModal";

const Header: React.FC = () => {
    const [modalOpened, setModalOpened] = useState<boolean>(false);

    const handleLoginClick = () => {
        setModalOpened(true);
    };

    const closeModal = () => {
        setModalOpened(false);
    };

    return (
        <>
            <div className="flex justify-between w-full mt-8">
                <img
                    src={logo}
                    className="rounded-full w-36 ml-24"
                    alt="Logo"
                />
                <div className="flex font-poppins items-center mb-8 space-x-20 text-3xl mr-24">
                    <p>contact us</p>
                    <p onClick={handleLoginClick} className="cursor-pointer">
                        login
                    </p>
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
