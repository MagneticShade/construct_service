import { FC, useEffect } from "react";
import { ITwoBlockProps } from "./TwoBlockInterface";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { getTemplatesWithModulesByIdThunk } from "@/src/store/slice/EditSlice";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import useCanvas from "@/src/hooks/useCanvas";

enum TextAlign {
    Left = "left",
    Center = "center",
    Right = "right",
}

const TwoBlock: FC<ITwoBlockProps> = ({
    backgroundColor,
    backgroundProcedur,
    id,
    name,
    textAlign,
    color,
    backgroundIs,
    speed,
    circleColor,
    blur,
    count,
    size,
    backgroundImage,
}) => {
    console.log(blur);

    const dispatch = useAppDispatch();
    const modules = useAppSelector((state) => state.edit.modules);
    
    useEffect(() => {
        dispatch(getTemplatesWithModulesByIdThunk({ templateId: id }));
    }, []);
    

    const canvasRef = useCanvas(speed, circleColor, count, size);
    return (
        <>
            <div
                id={name}
                className="w-full relative bg-no-repeat bg-cover"
                style={{
                    background: backgroundIs === "COLOR" ? backgroundColor : "",
                    backgroundImage:
                        backgroundIs === "IMAGE"
                            ? `url(${backgroundImage})`
                            : "",
                }}
            >
                {backgroundIs === "PROCEDURE" && (
                    <>
                        <div className="w-full h-full absolute -z-10 filteredBackground"></div>
                        <canvas
                            ref={canvasRef}
                            className="w-full absolute -z-20 h-full"
                            style={{ background: backgroundProcedur }}
                        ></canvas>
                    </>
                )}
                <div
                    style={{
                        textAlign: textAlign as TextAlign,
                        color: color,
                    }}
                    className="pt-[160px]  pb-[160px]"
                >
                    <h2
                        className="font-[500] text-[58px] text-black mb-[58px]"
                        style={{ color: color }}
                    >
                        {name}
                    </h2>
                    <div className="flex w-full justify-center gap-[58px] flex-wrap">
                        {modules.length &&
                            modules.map((item: any, i: number) => {
                                console.log(item.background_type);
                                
                                return (
                                    <div
                                        key={i}
                                        style={{
                                            background: item.background_color,
                                            color: item.text_color,
                                            textAlign:
                                                item.text_align as TextAlign,
                                            backgroundImage: item.background_type === 'IMAGE' ? `url("https://practice-test.ru:8080/module/${item.ID}/image")` : '',
                                        }}
                                        className="w-[589px] h-[620px] p-20 duration-200 hover:shadow-my hover:-translate-y-2"
                                    >
                                        <h2 className="text-[58px] leading-[1] font-[700] w-full">
                                            {item.header_text}
                                        </h2>
                                        <p className="opacity-80 font-[500] pt-5">
                                            {item.subheader_text}
                                        </p>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TwoBlock;
