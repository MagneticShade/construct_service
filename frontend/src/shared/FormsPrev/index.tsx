import { FC } from "react";
import TwoBlockPreview from "./TwoBlockPreview";

interface IFormsPrevProps {
    name: string;
}

const FormsPrev: FC<IFormsPrevProps> = ({ name }) => {
    if (name === "twoBlock") {
        return (
            <>
                <TwoBlockPreview h={100} w={100}/>
            </>
        );
    }
    if (name === "troshkinBlock") {
        return (
            <>
                <div className="">troshkinBlock</div>
            </>
        );
    }
};

export default FormsPrev;
