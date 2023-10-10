import { FC, useEffect, } from "react";
import { ITwoBlockProps } from "./TwoBlockInterface";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { getTemplatesWithModulesByIdThunk } from "@/src/store/slice/EditSlice";
import { useAppSelector } from "@/src/hooks/useAppSelector";

enum TextAlign {
    Left = "left",
    Center = "center",
    Right = "right",
}

const TwoBlock: FC<ITwoBlockProps> = ({
    background,
    id,
    name,
    textAlign,
    color,
}) => {
    const dispatch = useAppDispatch();
    const modules = useAppSelector((state) => state.edit.modules);
    useEffect(() => {
        dispatch(getTemplatesWithModulesByIdThunk({ templateId: id }));
    }, []);

    return (
        <>
            <div
                style={{
                    background: background,
                    textAlign: textAlign as TextAlign,
                    color: color,
                }}
                className="pt-[160px] pb-[320px]  border-b border-b-black"
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
                            return (
                                <div
                                    key={i}
                                    style={{
                                        background: item.background_color,
                                        color: item.text_color,
                                        textAlign: item.text_align as TextAlign,
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
        </>
    );
};

export default TwoBlock;
