import { FC } from "react";
import { IBlanksItemProps } from "./BlanksItemInterface";

const BlanksItem: FC<IBlanksItemProps> = ({
    imgUrl,
    handleClick,
    isBlockSelected,
    isBlurBlanks,
    index,
}) => {
    return (
        <>
            <div
                style={{
                    transitionDelay: `${
                        Math.floor(index ? index : 0 % 3) * 100
                    }ms`,
                }}
                className={`w-full h-[200px] bg-black [&:not(:first-child)]:mt-1 [&:last-child]:mb-20 transition-all after:h-fit after:w-fit after:bg-black duration-200 after:relative after:z-10 top-0 ${
                    isBlockSelected || isBlurBlanks ? "" : "blur-[4.5px]"
                }`}
                onClick={handleClick}
            >
                <img
                    src={imgUrl}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
        </>
    );
};

export default BlanksItem;
