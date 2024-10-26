import logo from "../../assets/placeholderlogo.png";

export default function Header() {
    return (
        <>
            <div className="flex justify-between w-full mt-4">
                <img src={logo} className="rounded-full w-36 ml-6" />
                <div className="flex font-poppins items-center mb-8 space-x-20 text-3xl mr-24">
                    <p>contact us</p>
                    <p>login</p>
                </div>
            </div>
        </>
    );
}
