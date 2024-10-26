import mainbears from "../../assets/mainbears.png";

export default function MainBears() {
    return (
        <div className="absolute overflow-hidden right-0 bottom-0">
            <img
                src={mainbears}
                className="relative -bottom-24 max-h-[45rem]"
            />
        </div>
    );
}
