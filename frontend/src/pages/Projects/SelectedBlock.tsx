import { FC, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { IProjectProps } from "./SelectedBlockInterface";
import { Link } from "react-router-dom";
import gsap from "gsap";
import useDraggableBlock from "@/src/hooks/useDragble";
import { DeleteButton } from "@/src/shared/Buttons/DeleteButton";
import { tg } from "@/src/tg";

interface ISelectedBlockProps extends IProjectProps {
    setModalStatus: (status: boolean) => void;
    handleDeleteProject: () => void;
}

const SelectedBlock: FC<ISelectedBlockProps> = ({
    style,
    setModalStatus,
    handleDeleteProject,
}) => {
    const spawn = useRef<any>();
    useEffect(() => {
        gsap.to(spawn.current, {
            duration: 0.1,
            opacity: 1,
            ease: "linear",
        });
    }, []);
    const handleContextMenu = (event: any) => {
        event.preventDefault(); // Предотвращаем стандартное действие браузера (появление контекстного меню)
        return false; // Дополнительно предотвращаем появление контекстного меню на устройствах с сенсорными экранами
    };

    const handleDelete = () => {
        tg.offEvent("viewportChanged", projectMove)
        handleDeleteProject();
        setModalStatus(false);
    };
    const { position, isDragging, handleStart } = useDraggableBlock({
        initialPosition: { x: 0, y: 0 },
        dropZoneId: "dropZone",
        onDragEnd: handleDelete,
    }); // хук который позволяет делать свайп
    tg.onEvent("viewportChanged", projectMove)

    function projectMove(this:any){
        tg.expand();
        this.viewportHeight = tg.viewportStableHeight;
    }
    return (
        <div
            ref={spawn}
            onClick={() => setModalStatus(false)}
            className=" opacity-0 fixed top-0 left-0 h-screen w-full z-10 bg-[#53535359] backdrop-blur-sm transition"
        >
            <Swiper
                className="mySwiper z-20 container overflow-visible transition-all h-full w-[300px] "
                slidesPerView={1.5}
                centeredSlides={true}
                breakpoints={{
                    550: {
                        slidesPerView: 1.2,
                    },
                }}
            >
                <SwiperSlide className="w-auto">
                    <div
                        style={{
                            ...style,
                            position: "relative",
                            left: position.x,
                            top: position.y,
                            cursor: isDragging ? "grabbing" : "grab",
                            zIndex: 100,
                        }}
                        onMouseDown={handleStart}
                        onTouchStart={handleStart}
                        className="w-full object-cover animate-shake select-none z-10"
                        onContextMenu={handleContextMenu}
                    ></div>
                    {tg.viewportHeight}
                    {tg.viewportStableHeight}
                    <div className="w-[300px] select-none py-[10px] bg-[#EEEEEE] opacity-70 absolute  left-1/2 -translate-x-1/2 rounded-[16px] mt-4 z-0">
                        <Link
                            to={"edit/"}
                            className=" block px-[18px] w-full border-b border-b-[#A6A0A0] text-[16px] whitespace-nowrap ] mb-[5px]"
                        >
                            Редактировать
                        </Link>
                        <Link
                            to={"/"}
                            className="block px-[18px] w-full border-b border-b-[#A6A0A0] text-[16px] whitespace-nowrap mt-[5px] mb-[5px]"
                        >
                            Изменить название проекта
                        </Link>
                        <Link
                            to={"/"}
                            className="block px-[18px] w-full border-b border-b-[#A6A0A0] text-[16px] whitespace-nowrap mt-[5px] mb-[5px]"
                        >
                            Настройка домена
                        </Link>
                        <button
                            className=" px-[18px] text-[#FF0000] text-[16px] font-[500]"
                            onClick={handleDeleteProject}
                        >
                            Удалить
                        </button>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div>Drag me</div>
            <div
                id="dropZone"
                className={`w-full absolute left-0 bottom-0 h-24 transition-all duration-200 z-0`}
            >
                <DeleteButton
                    title="Удалить"
                    buttonActive={false}
                    handleClick={handleDeleteProject}
                />
            </div>
        </div>
    );
};

export { SelectedBlock };
