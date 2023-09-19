import AlignLeft from "@/src/assets/icons/alignLeft.svg";
import AlignCenter from "@/src/assets/icons/alignCenter.svg";
import AlignRight from "@/src/assets/icons/alignRight.svg";
import { FC } from "react";

interface IAlignmentProps {
    setAlign: (align: string) => void;
}

const Alignment:FC<IAlignmentProps> = ({ setAlign }) => {
    return (
        <div className="w-[307px] h-[30px] bg-slate-100 mx-auto rounded-[10px] shadow-xl">
            <ul className="flex w-full h-full justify-around items-center ">
                <li>
                    <img src={AlignLeft} alt="" onClick={() => setAlign('left')}/>
                </li>
                <li>
                    <img src={AlignCenter} alt="" onClick={() => setAlign('center')}/>
                </li>{" "}
                <li>
                    <img src={AlignRight} alt="" onClick={() => setAlign('right')}/>
                </li>
            </ul>
        </div>
    );
};

export default Alignment;
