import { FC } from "react";
import { ITwoBlockProps } from "./TwoBlockInterface";

enum TextAlign {
    Left = "left",
    Center = "center",
    Right = "right",
}

const TwoBlock: FC<ITwoBlockProps> = ({
    background,
    id,
    module,
    name,
    textAlign,
}) => {
    console.log(module);

    return (
        <>
            {module.map((item) => {
                console.log(module[0]);
                
                
                return (
                    <div
                        key={id}
                        style={{
                            background: background,
                            textAlign: textAlign as TextAlign,
                        }}
                        className="pt-[160px] pb-[320px]  border-b border-b-black"
                    >
                        <h2 className="font-[500] text-[58px] text-black mb-[58px]">
                            {name}
                        </h2>
                        <div className="flex w-full justify-center gap-[58px] flex-wrap">
                            <div
                                style={{
                                    background: item.background,
                                    color: item.textColor,
                                    textAlign: textAlign as TextAlign,
                                }}
                                className="w-[589px] h-[620px] shadow-md p-20 duration-200 hover:shadow-my hover:-translate-y-2"
                            >
                                <h2 className="text-[58px] leading-[1] text-black font-[700]">
                                    {module[0].header}
                                </h2>
                                <p className="text-black opacity-80 font-[500] pt-5">
                                    {module[0].subHeader}
                                </p>
                            </div>
                            <div
                                style={{
                                    background: item.background,
                                    color: item.textColor,
                                    textAlign: textAlign as TextAlign,
                                }}
                                className="w-[589px] h-[620px] shadow-md p-20 duration-200 hover:shadow-my hover:-translate-y-2"
                            >
                                <h2 className="text-[58px] leading-[1] text-black font-[700]">
                                    {module[1].header}
                                </h2>
                                <p className="text-black opacity-80 font-[500] pt-5">
                                    {module[1].subHeader}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default TwoBlock;
