import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import useCanvas from "@/src/hooks/useCanvas";
import useRandomColor from "@/src/hooks/useRandomColor";
import { setBackground } from "@/src/store/slice/ProcedurSlice";
import { FC, ReactNode, useState } from "react";

interface IProcedurProps {
    valueRange: number;
    children: ReactNode;
    blur: number
    count: number
    size:number
}
const Procedur: FC<IProcedurProps> = ({ children, valueRange, blur, count, size }) => {
    // Создаем рандомнй цвет для бэкграунда и самих кругов
    const [canvasBackground, setCanvasBackground] = useState(useRandomColor());
    const [circleColor, setCircleColor] = useState(useRandomColor());
    const {blur: procedurBlur} = useAppSelector(state => state.protcedur)
    // хук делающий канвас 
    const canvasRef = useCanvas(valueRange, circleColor, count, size);

    // функция по нажатию на ревреш, что бы передать другие рандомные цвета
    const handleColorChange = () => {
        setCanvasBackground(useRandomColor());
        setCircleColor(useRandomColor());
    };
    const dispatch = useAppDispatch()
    dispatch(setBackground(canvasBackground));
    return (
        <div className="relative w-full h-[250px] flex justify-center items-center">
            {/* Сам канвас */}

                        <div className=" absolute w-full h-full" style={{
                            backdropFilter: `blur(${procedurBlur}px)`
                        }}></div>
                        <canvas
                            ref={canvasRef}
                            className="w-full absolute -z-10 h-full"
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

