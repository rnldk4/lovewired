import ring1 from "../../assets/ring1.svg";

export default function Ring1() {
    return (
        <div className="absolute overflow-hidden bottom-0 left-0 -z-10">
            <img
                src={ring1}
                className="relative -bottom-[19rem] left-[30rem]"
            />
        </div>
    );
}
