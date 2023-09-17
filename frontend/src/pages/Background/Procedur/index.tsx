import useCanvas from "@/src/hooks/useCanvas";
import useRandomColor from "@/src/hooks/useRandomColor";
import { FC, ReactNode, useState } from "react";

interface IProcedurProps {
    valueRange: number;
    children: ReactNode
}
const Procedur: FC<IProcedurProps> = ({ children, valueRange }) => {
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
        <div className="relative w-full h-[250px] flex justify-center items-center">
            {/* Сам канвас */}
            <canvas
                ref={canvasRef}
                className={`w-full h-full mt-1 z-0 absolute`}
                style={{ background: canvasBackground }}
            ></canvas>
            {/* Блоки находящиеся внутри канваса */}
            <div className="container relative z-10">{children}</div>

            <div className="w-full left-0 mt-[30px] flex justify-center absolute bottom-0 cursor-pointer">
                {/* Кнопка рефреш */}
                <span onClick={() => handleColorChange()}>Refresh</span>
            </div>
        </div>
    );
};

export default Procedur;
