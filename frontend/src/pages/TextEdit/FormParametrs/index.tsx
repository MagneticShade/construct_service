import { axiosInstance } from "@/src/axios";
import Alignment from "../Alignment";
import { CheckedButton } from "@/src/shared/Buttons/CheckedButton";
import _ from "lodash";
import { useCallback, useState } from "react";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { useParams } from "react-router-dom";

const FormParametrs = () => {
    const edit = useAppSelector((state) => state.edit);

    const template = edit.templates[edit.activeIndex];
    // const name = typeof template !== "string" && template.name
    // const [inputText, setInputText] = useState(name as string);

    // Создайте функцию, которая будет вызываться с задержкой
    const [align, setAlign] = useState("right");
    const [value, setValue] = useState("");
    const [active, setActive] = useState(false);
    const [textColor, setTextColor] = useState('red')

    const { id } = useParams();
    const debounced = useCallback(
        _.debounce((text, align) => {
            if (typeof template !== "string") {
                axiosInstance.put(`/api/templates/update${id}`, {
                    name: text,
                    localId: template.local_id,
                    modules: template.modules,
                    order: template.order,
                    background: template.background,
                    textAlign: align,
                });
                setActive(true);
            }
        }, 500),
        []
    );

    const handleInputChange = (e: any) => {
        setActive(false);
        setValue(e.target.value);
    };
    debounced(value, align);


    return (
        <>
            <div className="">
                <h1 className="pt-4 text-xl font-bold text-center">
                    Параметры Текста формы
                </h1>
                <p className="descr font-semibold text-black/60 spacing leading-[143.4%] text-center text-[14px] pt-4">
                    Редактируйте параметры всей формы Выбери центрирование
                    Выбери цвет
                </p>
            </div>
            <div className="pt-4">
                <div className="relative">
                    <input
                        name={"nameForm"}
                        type="text"
                        className={`text-[16px] text-[#999] not-italic font-medium capitalize tracking-[-1.2px] bg-[#E7E7E7] rounded-2xl h-[50px] w-full indent-2.5`}
                        placeholder="Название Формы "
                        value={value}
                        onChange={handleInputChange}
                    />
                    {active && (
                        <div className=" aspect-square w-5 absolute block rotate-180 top-4 rounded-full bg-green-200 text-[30px] right-3"></div>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between pt-8">
                <span className="font-medium text-[#B6B6B6] spacing leading-[143.4%] text-center text-[18px]">
                    Цвет текста
                </span>

                <label
                    htmlFor=""
                    className="w-[200px] h-[30px] bg-black rounded-[10px]"
                    style={{background: textColor}}
                >
                    <input type="color" onChange={(e) => setTextColor(e.target.value)} className="w-full h-full opacity-0" />
                </label>
            </div>
            <div className="pt-8">
                <Alignment setAlign={setAlign} />
            </div>
            <div className="flex justify-between items-center pt-8">
                <span>
                    Отображать название <br /> на сайте{" "}
                </span>
                <CheckedButton checked={false} />
            </div>
        </>
    );
};

export default FormParametrs;
