import { useState } from "react";
import { Filter } from "../../shared/Filter";
import FormBlock from "../Edit/FormBlock";
import Equalizer from "@/src/shared/Equalizer";
import { PagePallete } from "@/src/shared/Pallete";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { addOpacity, setColor } from "@/src/store/slice/ColorSlice";
import Procedur from "./Procedur";

const PageBackgroundEdit = () => {
    const [index, setIndex] = useState<number>(0);
    const color = useAppSelector((state) => state.color.ColorHex);

    const [checked, setChecked] = useState<boolean>(false);
    const [value, setValue] = useState<number>(100);

    const dispatch = useAppDispatch();
    //Сохраняет новое значение опасити в формате hex в состояние(для слайдера в палетке)
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        function convertOpacityToHexOpacity(opacity: number | number[]) {
            // Преобразование процентного значения в десятичное число от 0 до 255
            const decimalAlpha = Math.round(((opacity as number) / 100) * 255);
            // Преобразование десятичного числа в шестнадцатеричное значение
            const hexAlpha = decimalAlpha
                .toString(16)
                .toUpperCase()
                .padStart(2, "0");
            // Возврат HEX-кода с альфа-каналом
            return `${hexAlpha}`;
        }
        const hexOpacity = convertOpacityToHexOpacity(newValue);
        setValue(newValue as number); // Преобразуем newValue в number
        dispatch(addOpacity(hexOpacity));
    };
    //устанавливает цвет в состояние без опасити
    const setHex = (value: string) => {
        dispatch(setColor(value));
    };

    // Забираем значение валю из инпута
    const [valueRange, setValueRange] = useState(1);

    return (
        <div className=" overflow-auto h-full">
            <div className="container pt-10">
                {/* Фильтр */}
                <Filter
                    filterName={["Процедурный", "Файл", "Цвет", "ИИ"]}
                    setIndex={setIndex}
                />
            </div>

            {index === 0 && (
                // компонент эквалайзера
                <>
                    <Procedur valueRange={valueRange}>
                        <FormBlock h={100} w={100} />
                    </Procedur>
                    <Equalizer
                        handleChange={(e) => setValueRange(e)}
                        state={valueRange}
                    />
                </>
            )}
            {index === 2 && (
                <>
                    <div
                    style={{
                        background: color
                    }}
                     className="w-full h-[250px] flex justify-center items-center">
                        <FormBlock h={100} w={100} />
                    </div>
                    // Компонент паллетки
                    <PagePallete
                        color={color}
                        checked={checked}
                        setChecked={setChecked}
                        value={value}
                        handleSliderChange={handleSliderChange}
                        setHex={setHex}
                    />
                </>
            )}
        </div>
    );
};

export default PageBackgroundEdit;
