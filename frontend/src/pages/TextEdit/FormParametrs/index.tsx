import { axiosInstance } from "@/src/axios";
import Alignment from "../Alignment";
import { CheckedButton } from "@/src/shared/Buttons/CheckedButton";
import _ from "lodash";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { SubmitButton } from "@/src/shared/Buttons/SubmitButton";
import { useQuery } from "react-query";
import { useAppSelector } from "@/src/hooks/useAppSelector";

const FormParametrs = () => {
    const [align, setAlign] = useState("right");
    const [value, setValue] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("blue");
    const { id } = useParams();
    const activeIndex = useAppSelector((state) => state.formIndex.index);
    const updateTemplate = () => {
        axiosInstance.put(`/api/templates/update${id}`, {
            name: value,
            background: backgroundColor,
            textAlign: align,
        });
    };
    useQuery("repoData", () =>
        axiosInstance.get("api/templates").then((res) => {
            setAlign(res.data[activeIndex].textAlign);
            setValue(res.data[activeIndex].name);
            setBackgroundColor(res.data[activeIndex].background);
        })
    );
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
                        onChange={(e) => setValue(e.target.value)}
                    />
                    {/* {active && (
                        <div className=" aspect-square w-5 absolute block rotate-180 top-4 rounded-full bg-green-200 text-[30px] right-3"></div>
                    )} */}
                </div>
            </div>
            <div className="flex items-center justify-between pt-8">
                <span className="font-medium text-[#B6B6B6] spacing leading-[143.4%] text-center text-[18px]">
                    Цвет фона
                </span>

                <label
                    htmlFor=""
                    className="w-[200px] h-[30px] bg-black rounded-[10px]"
                    style={{
                        background: backgroundColor,
                    }}
                >
                    <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-full h-full opacity-0"
                    />
                </label>
            </div>
            <div className="pt-8">
                <Alignment align={align} setAlign={setAlign} />
            </div>
            <div className="flex justify-between items-center pt-8">
                <span>
                    Отображать название <br /> на сайте{" "}
                </span>
                <CheckedButton checked={false} />
            </div>
            <SubmitButton
                buttonActive={false}
                title="Изменить форму"
                handleClick={() => updateTemplate()}
            />
        </>
    );
};

export default FormParametrs;
