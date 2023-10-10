import { FC, useEffect, useState } from "react";
import Alignment from "./Alignment";
import { getModuleById, patchModuleById } from "@/src/axios";
import { SubmitButton } from "@/src/shared/Buttons/SubmitButton";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import Success from "@/src/components/Success";
import Loader from "@/src/shared/Loader";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { getTemplatesWithModulesByIdThunk } from "@/src/store/slice/EditSlice";
import { useParams } from "react-router-dom";

const FormHeadersParametrs: FC = () => {
    const [value, setValue] = useState({ nameModule: "", descrModule: "" });
    const [align, setAlign] = useState<string>("left");
    const [textColor, setTextColor] = useState<string>("white");
    const [backgroundColor, setBackgroundColor] = useState<string>("black");
    const [activeModule, setActiveModule] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { isLoading, modules } = useAppSelector((state) => state.edit);
    const { id } = useParams();
    async function get() {
        const getLocal = localStorage.getItem("projectId");
        if (getLocal) {
            await dispatch(
                getTemplatesWithModulesByIdThunk({
                    templateId: id as string,
                })
            );
        }
    }
    useEffect(() => {
        get();
    }, []);

    const updateModule = async () => {
        await patchModuleById(modules[activeModule].ID, {
            background_color: backgroundColor,
            header_text: value.nameModule,
            subheader_text: value.descrModule,
            text_align: align,
            text_color: textColor,
        });
        setVisible(true);
    };
    if (visible) {
        setTimeout(() => {
            setVisible(false);
        }, 2500);
    }
    const getModule = async () => {
        if (modules.length) {
            const data = await getModuleById(modules[activeModule].ID);
            setBackgroundColor(data.background_color);
            setAlign(data.text_align);
            setTextColor(data.text_color);
            setValue({
                nameModule: data.header_text,
                descrModule: data.subheader_text,
            });
        }
    };
    useEffect(() => {
        if(modules)  getModule();
       
    }, [modules, activeModule]);

    return (
        <>
            <div className="w-full flex justify-center items-center">
                <Success title="Форма успешно изменена" visible={visible} />
            </div>

            {isLoading ? (
                <div className="w-full h-full flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
                <div className="pt-4 h-full">
                    <div className="relative">
                        <div
                            className={`w-full py-[60px] bg-bg bg-cover mt-1 left-0 absolute`}
                        >
                            <div className="flex gap-2 justify-center">
                                {modules.length &&
                                    modules.map(
                                        (_: any, i: number) => {
                                            return (
                                                <div
                                                    key={i}
                                                    onClick={() =>
                                                        setActiveModule(i)
                                                    }
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
                                        }
                                    )}
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
                                setValue({
                                    ...value,
                                    nameModule: e.target.value,
                                })
                            }
                            value={value.nameModule}
                        />

                        <input
                            name="descrModule"
                            type="text"
                            className="text-[16px] mb-[29px] text-[#999] not-italic font-medium capitalize tracking-[-1.2px] bg-[#E7E7E7] rounded-2xl h-[50px] w-full indent-2.5"
                            placeholder="Описание"
                            onChange={(e) =>
                                setValue({
                                    ...value,
                                    descrModule: e.target.value,
                                })
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
                                        onChange={(e) =>
                                            setTextColor(e.target.value)
                                        }
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
            )}
        </>
    );
};

export default FormHeadersParametrs;
