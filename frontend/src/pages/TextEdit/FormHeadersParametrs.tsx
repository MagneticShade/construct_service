import { useEffect, useState } from "react";
import Alignment from "./Alignment";
import { axiosInstance } from "@/src/axios";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import _ from "lodash";
type Props = {};

const FormHeadersParametrs = ({}: Props) => {
    const [activeModule, setActiveModule] = useState(0);

    const [modules, setModules] = useState<any>([]);
    const edit = useAppSelector((state) => state.edit);
    const template = edit.templates[edit.activeIndex];
    const module = typeof template !== "string" && template.modules;
    const [firstModuleHeader, setFirstModuleHeader] = useState("");
    const [firstModuleSubHeader, setFirstModuleSubHeader] = useState("");
    const [secondModuleHeader, setSecondModuleHeader] = useState("");
    const [secondModuleSubHeader, setSecondModuleSubHeader] = useState("");

    function extractId(jsonString: string) {
        const match = jsonString.match(/"(\$oid)":\s*"([^"]+)"/);
        if (match) {
            return match[2]; // Возвращаем значение ID (вторая группа регулярного выражения)
        } else {
            return null; // Возвращаем null, если ID не найден
        }
    }
    useEffect(() => {
        module &&
            module.forEach((e: any) => {
                axiosInstance
                    .get(`/api/modules${extractId(e)}`)
                    .then(({ data }) => {
                        setModules((prev: any) => [...prev, data]);
                    });
            });
    }, []);

    
    // const debouncedConsoleLog = useCallback(
    //     _.debounce(async (mok) => {
    //         if (typeof template !== "string") {
    //             debugger;
    //             await axiosInstance.put(
    //                 `/api/modules/update${mok[activeModule].id}`,
    //                 {
    //                     background: mok[activeModule].background,
    //                     header:
    //                         activeModule === 0
    //                             ? firstModuleHeader
    //                             : secondModuleHeader,
    //                     subheader:
    //                         activeModule === 0
    //                             ? firstModuleSubHeader
    //                             : secondModuleSubHeader,
    //                     textAlign: mok[activeModule].textAlign,
    //                     order: mok[activeModule].order,
    //                     color: mok[activeModule].color,
    //                 }
    //             );
    //         }
    //     }, 500),
    //     []
    // );

    return (
        <div className="pt-4 h-full">
            <div className="relative">
                <div
                    className={`w-full py-[60px] bg-bg bg-cover mt-1 left-0 absolute`}
                >
                    <div className="flex gap-2 justify-center">
                        {modules.map((_: any, i: number) => {
                            return (
                                <div
                                    key={i}
                                    onClick={() => setActiveModule(i)}
                                    style={{
                                        width: `${100}px`,
                                        height: `${100}px`,
                                    }}
                                    className={`shadow-md bg-gradient-to-b shadow-[rgba(0,0,0,0.25)] from-[#9E9E9E] to-white ${
                                        activeModule === i
                                            ? "opacity-100"
                                            : "opacity-50"
                                    }`}
                                ></div>
                            );
                        })}
                    </div>
                </div>
            </div>

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
                name="nameForm"
                type="text"
                className="text-[16px] text-[#999] not-italic font-medium mt-[43px] mb-[12px] capitalize tracking-[-1.2px] bg-[#E7E7E7] rounded-2xl h-[50px] w-full indent-2.5"
                placeholder="Название Формы"
                value={
                    activeModule === 0 ? firstModuleHeader : secondModuleHeader
                }
                onChange={(e) => {
                    activeModule === 0
                        ? setFirstModuleHeader(e.target.value)
                        : setSecondModuleHeader(e.target.value);
                    if (typeof template !== "string") {
                        axiosInstance.put(
                            `/api/modules/update${modules[activeModule].id}`,
                            {
                                background: modules[activeModule].background,
                                header:
                                    activeModule === 0
                                        ? e.target.value
                                        : secondModuleHeader,
                                subheader:
                                    activeModule === 0
                                        ? firstModuleSubHeader
                                        : secondModuleSubHeader,
                                textAlign: modules[activeModule].textAlign,
                                order: modules[activeModule].order,
                                color: modules[activeModule].color,
                            }
                        );
                    }
                }}
            />

            <input
                name="nameForm"
                type="text"
                className="text-[16px] mb-[29px] text-[#999] not-italic font-medium capitalize tracking-[-1.2px] bg-[#E7E7E7] rounded-2xl h-[50px] w-full indent-2.5"
                placeholder="Название Формы"
                value={
                    activeModule === 1
                        ? secondModuleSubHeader
                        : firstModuleSubHeader
                }
                onChange={(e) => {
                    activeModule === 0
                        ? setFirstModuleSubHeader(e.target.value)
                        : setSecondModuleSubHeader(e.target.value);
                    if (typeof template !== "string") {
                        axiosInstance.put(
                            `/api/modules/update${modules[activeModule].id}`,
                            {
                                background: modules[activeModule].background,
                                header:
                                    activeModule === 0
                                        ? firstModuleHeader
                                        : secondModuleHeader,
                                subheader:
                                    activeModule === 0
                                        ? e.target.value
                                        : secondModuleSubHeader,
                                textAlign: modules[activeModule].textAlign,
                                order: modules[activeModule].order,
                                color: modules[activeModule].color,
                            }
                        );
                    }
                }}
            />

            <div className="grid gap-[12px]">
                <Alignment />
                <Alignment />
            </div>
            <div className="flex items-center justify-between pt-8">
                <span className="font-medium text-[#B6B6B6] spacing leading-[143.4%] text-center text-[18px]">
                    Цвет текста
                </span>

                <div className="w-[200px] h-[30px] bg-black rounded-[10px]"></div>
            </div>
        </div>
    );
};

export default FormHeadersParametrs;
