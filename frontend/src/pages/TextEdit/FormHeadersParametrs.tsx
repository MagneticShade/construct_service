import { FC, useEffect, useState } from "react";
import Alignment from "./Alignment";
import { axiosInstance } from "@/src/axios";
import { SubmitButton } from "@/src/shared/Buttons/SubmitButton";
import { useQuery } from "react-query";
import { useAppSelector } from "@/src/hooks/useAppSelector";

const FormHeadersParametrs: FC = () => {
    const [value, setValue] = useState({ nameModule: "", descrModule: "" });
    const [align, setAlign] = useState("right");
    const [textColor, setTextColor] = useState("red");
    const [backgroundColor, setBackgroundColor] = useState("red");
    const [activeModule, setActiveModule] = useState<number>(0);
    const activeIndex = useAppSelector((state) => state.formIndex.index);
    const { data = [] } = useQuery("repoData", () =>
        axiosInstance.get("/api/templates").then((res) => res.data)
    );
    console.log(data);

    const moduleId = () => {
        if (data[activeIndex]) {
            return JSON.parse(data[activeIndex].modules[activeModule])._id.$oid;
        }
    };
    const updateModule = () => {
        axiosInstance.put(`api/modules/update${moduleId()}`, {
            background: backgroundColor,
            header: value.nameModule,
            subheader: value.descrModule,
            textAlign: align,
            order: "string",
            color: textColor,
        });
    };

    const getModule = async () => {
        if (data.length) {
            await axiosInstance.get(`api/modules${moduleId()}`).then((res) => {
                setBackgroundColor(res.data.background);
                setAlign(res.data.textAlign);
                setTextColor(res.data.color);
                setValue({
                    nameModule: res.data.header,
                    descrModule: res.data.subheader,
                });
            });
        }
    };
    useEffect(() => {
        getModule();
    }, [data, activeModule]);

    return (
        <div className="pt-4 h-full">
            <div className="relative">
                <div
                    className={`w-full py-[60px] bg-bg bg-cover mt-1 left-0 absolute`}
                >
                    <div className="flex gap-2 justify-center">
                        {data.length &&
                            data[0].modules.map((_: any, i: number) => {
                                return (
                                    <div
                                        key={i}
                                        onClick={() => setActiveModule(i)}
                                        style={{
                                            width: `${100}px`,
                                            height: `${100}px`,
                                        }}
                                        className={`shadow-md bg-gradient-to-b shadow-[rgba(0,0,0,0.25)] from-[#9E9E9E] to-white ${
                                            activeModule == i
                                                ? "opacity-100"
                                                : "opacity-50"
                                        }`}
                                    ></div>
                                );
                            })}
                    </div>
                </div>
            </div>

            <>
                <div className="mt-60">
                    <h1 className="pt-4 text-xl font-bold text-center">
                        Параметры {activeModule + 1}-ого модуля
                    </h1>
                    <p className="descr font-semibold text-black/60 spacing leading-[143.4%] text-center text-[14px] pt-4">
                        Введи необходимую информацию, <br />
                        Введи заголовок, <br />
                        Введи подзаголовок
                    </p>
                </div>
                <input
                    name="nameModule"
                    type="text"
                    className="text-[16px] text-[#999] not-italic font-medium mt-[43px] mb-[12px] capitalize tracking-[-1.2px] bg-[#E7E7E7] rounded-2xl h-[50px] w-full indent-2.5"
                    placeholder="Название Модуля"
                    onChange={(e) =>
                        setValue({ ...value, nameModule: e.target.value })
                    }
                    value={value.nameModule}
                />

                <input
                    name="descrModule"
                    type="text"
                    className="text-[16px] mb-[29px] text-[#999] not-italic font-medium capitalize tracking-[-1.2px] bg-[#E7E7E7] rounded-2xl h-[50px] w-full indent-2.5"
                    placeholder="Описание"
                    onChange={(e) =>
                        setValue({ ...value, descrModule: e.target.value })
                    }
                    value={value.descrModule}
                />

                <div className="grid gap-[12px]">
                    <Alignment align={align} setAlign={setAlign} />
                </div>
                <div className="h-[250px]">
                    <div className="flex items-center justify-between pt-8 ">
                        <span className="font-medium text-[#B6B6B6] spacing leading-[143.4%] text-center text-[18px]">
                            Цвет текста
                        </span>

                        <label
                            className="w-[200px] h-[30px] bg-black rounded-[10px]"
                            style={{ background: textColor }}
                        >
                            <input
                                name={"textColor"}
                                type="color"
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                                className="w-full h-full opacity-0"
                            />
                        </label>
                    </div>
                    <div className="flex items-center justify-between pt-8 ">
                        <span className="font-medium text-[#B6B6B6] spacing leading-[143.4%] text-center text-[18px]">
                            цвет фона
                        </span>

                        <label
                            className="w-[200px] h-[30px] bg-black rounded-[10px]"
                            style={{ background: backgroundColor }}
                        >
                            <input
                                name="backgroundColor"
                                type="color"
                                value={backgroundColor}
                                onChange={(e) =>
                                    setBackgroundColor(e.target.value)
                                }
                                className="w-full h-full opacity-0"
                            />
                        </label>
                    </div>
                </div>

                <SubmitButton
                    buttonActive={false}
                    title="Отправить на сайт"
                    handleClick={() => updateModule()}
                />
            </>
        </div>
    );
};

export default FormHeadersParametrs;
