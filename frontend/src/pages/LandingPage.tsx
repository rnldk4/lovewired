import Header from "../components/landingpage/Header";
import MainBears from "../components/landingpage/MainBears";
import Signup from "../components/landingpage/Signup";
import ParagraphLanding from "../components/landingpage/ParagraphLanding";
import Ring1 from "../components/landingpage/Ring1";
import Ring2 from "../components/landingpage/Ring2";
import { useEffect } from "react";

export default function LandingPage() {
    useEffect(() => {
        document.body.classList.add("overflow-hidden");

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    return (
        <>
            <Header />
            <MainBears />
            <div className="ml-24">
                <ParagraphLanding />
                <Signup />
            </div>
            <Ring1></Ring1>
            <Ring2></Ring2>
        </>
    );
}
