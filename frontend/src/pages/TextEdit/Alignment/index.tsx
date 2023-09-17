
import AlignLeft from "@/src/assets/icons/alignLeft.svg";
import AlignCenter from "@/src/assets/icons/AlignCenter.svg";
import AlignRight from "@/src/assets/icons/AlignRight.svg";


const Alignment = () => {
    return (
        <div className="w-[307px] h-[30px] bg-slate-100 mx-auto rounded-[10px] shadow-xl">
            <ul className="flex w-full h-full justify-around items-center ">
                <li>
                    <img src={AlignLeft} alt="" />
                </li>
                <li>
                    <img src={AlignCenter} alt="" />
                </li>{" "}
                <li>
                    <img src={AlignRight} alt="" />
                </li>
            </ul>
        </div>
    );
};

export default Alignment;
