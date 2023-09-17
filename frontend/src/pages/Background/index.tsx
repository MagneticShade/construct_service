import { useState } from "react";
import { Filter } from "../../shared/Filter";
import FormBlock from "../Edit/FormBlock";
import Equalizer from "@/src/shared/Equalizer";
import { PagePallete } from "@/src/shared/Pallete";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { addOpacity, setColor } from "@/src/store/slice/ColorSlice";
import useCanvas from "@/src/hooks/useCanvas";
import useRandomColor from "@/src/hooks/useRandomColor";

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

    // Создаем рандомнй цвет для бэкграунда и самих кругов
    const [canvasBackground, setCanvasBackground] = useState(useRandomColor());
    const [circleColor, setCircleColor] = useState(useRandomColor());

    // хук делающий канвас (НУЖНО ПОМЕНЯТЬ ЛОГИКУ ВНИТРИ НЕГО)
    const canvasRef = useCanvas(valueRange, circleColor);

    // функция по нажатию на ревреш, что бы передать другие рандомные цвета
    const handleColorChange = () => {
        setCanvasBackground(useRandomColor());
        setCircleColor(useRandomColor());
    };

    return (
        <div className=" overflow-auto h-full">
            <div className="container pt-10">
                {/* Фильтр */}
                <Filter
                    filterName={["Процедурный", "Файл", "Цвет", "ИИ"]}
                    setIndex={setIndex}
                />
            </div>
            <div className="relative w-full h-[250px] flex justify-center items-center">
                {/* Сам канвас */}
                <canvas
                    ref={canvasRef}
                    className={`w-full h-full mt-1 z-0 absolute`}
                    style={{ background: canvasBackground }}
                ></canvas>
                {/* Блоки находящиеся внутри канваса */}
                <div className="container relative z-10">
                    <FormBlock h={100} w={100} />
                </div>

                <div className="w-full left-0 mt-[30px] flex justify-center absolute bottom-0 cursor-pointer">
                    {/* Кнопка рефреш */}
                    <span onClick={() => handleColorChange()}>Refresh</span>
                </div>
            </div>

            {index === 0 && (
                // компонент эквалайзера
                <Equalizer
                    handleChange={(e) => setValueRange(e)}
                    state={valueRange}
                />
            )}
            {index === 2 && (
                // Компонент паллетки
                <PagePallete
                    color={color}
                    checked={checked}
                    setChecked={setChecked}
                    value={value}
                    handleSliderChange={handleSliderChange}
                    setHex={setHex}
                />
            )}
        </div>
    );
};

export default PageBackgroundEdit;
