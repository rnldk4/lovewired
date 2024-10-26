import Header from "../components/landingpage/Header";
import MainBears from "../components/landingpage/MainBears";
import Signup from "../components/landingpage/Signup";
import ParagraphLanding from "../components/landingpage/ParagraphLanding";
import Ring1 from "../components/landingpage/Ring1";
import Ring2 from "../components/landingpage/Ring2";

export default function LandingPage() {
    return (
        <>
            <Header />
            <MainBears />
            <div className="ml-10">
                <ParagraphLanding />
                <Signup />
                <Ring1></Ring1>
                <Ring2></Ring2>
            </div>
        </>
    );
}
