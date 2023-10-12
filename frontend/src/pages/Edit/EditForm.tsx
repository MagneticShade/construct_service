import { Swiper, SwiperSlide } from "swiper/react";
import { FC, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Filter } from "../../shared/Filter";

import { setActive } from "../../store/slice/ButtonSlice";

import useDraggableBlock from "@/src/hooks/useDragble";
import { postModuleById, postTemplateById } from "@/src/axios";
import { getProjectWithTemplatesByIdThunk } from "@/src/store/slice/EditSlice";
import TwoBlockPreview from "@/src/shared/FormsPrev/TwoBlockPreview";

interface IeditForm {
    projectId: string;
}

const EditForm: FC<IeditForm> = ({ projectId }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const isActive = useAppSelector((state) => state.isActive.valueModal);
    const dispatch = useAppDispatch();

    let y: number | null = null;
    let x: number | null = null;

    const handleTouchStart = (e: any) => {
        const firstTouch = e.touches[0];
        y = firstTouch.clientY;
        x = firstTouch.clientY;
    };

    const handleTouchMove = (e: any) => {
        if (!y || !x) {
            return false;
        }

        let y2 = e.touches[0].clientY;
        let x2 = e.touches[0].clientY;
        let yDiff = y2 - y;
        let xDiff = x2 - x;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                console.log("right");
            } else {
                console.log("left");
            }
        } else {
            if (yDiff > 0) {
                if (yDiff > 10) {
                    dispatch(setActive(false));
                    console.log("down");
                }
            } else {
                console.log("top");
            }
        }
        console.log(yDiff);

        x = null;
        y = null;
    };

    const { position, isDragging, handleStart } = useDraggableBlock({
        initialPosition: { x: 0, y: 0 },
        dropZoneId: "dropZone",
        onDragEnd: handleAdd,
    });
    async function get() {
        console.log(projectId);

        await dispatch(
            getProjectWithTemplatesByIdThunk({ projectId: projectId })
        );
    }
    // const edit = useAppSelector((state) => state.edit);
    async function handleAdd() {
        position.x = 0;
        position.y = 0;

        const targetTemp = await postTemplateById(projectId, {
            name: "troshkinBlock",
            background_color: "#333",
            text_align: "",
            text_color: "",
            scheme: "",
            background_type: "COLOR",
        });

        await postModuleById(targetTemp, {
            background_color: "#fff",
            header_text: "",
            subheader_text: "",
            text_align: "",
            text_color: "#abf",
        });
        await postModuleById(targetTemp, {
            background_color: "#fff",
            header_text: "",
            subheader_text: "",
            text_align: "",
            text_color: "#abf",
        });
        await get();

        dispatch(setActive(!isActive));
    }

    async function addTemplate() {
        await postTemplateById(projectId, {
            name: "string",
            background_color: "string",
            text_color: "string",
            text_align: "string",
            scheme: "string",
            background_type: "COLOR",
        });
        await get();
    }
    return (
        <>
            <div
                className={`absolute top-[30vh] w-full bg-white h-[70vh] z-50 transition-all duration-500 ${
                    isActive ? "" : "translate-y-full"
                }`}
                onTouchStart={(e) => handleTouchStart(e)}
                onTouchMove={(e) => handleTouchMove(e)}
            >
                <div className="container">
                    <Filter
                        filterName={["Популярные", "Избранные", "Все", "Архив"]}
                        setIndex={() => {}}
                    />
                    <div className="pt-4">
                        <Swiper
                            spaceBetween={13}
                            className="mySwiper overflow-visible  relative"
                            slidesPerView={2}
                            loop={true}
                            centeredSlides={true}
                            breakpoints={{
                                550: {
                                    slidesPerView: 1.2,
                                },
                            }}
                            onSlideChange={(e) => setActiveIndex(e.realIndex)}
                        >
                            {[...new Array(8)].map((_, i) => {
                                const isActive = activeIndex === i;
                                const [isDraggingSlide, setIsDraggingSlide] =
                                    useState(false);
                                return (
                                    <SwiperSlide
                                        key={i}
                                        className="w-auto flex justify-center relative top-0 left-0 transition-all duration-500"
                                        style={{
                                            left: isActive ? position.x : 0,
                                            top: isActive ? position.y : 0,
                                            cursor: isDragging
                                                ? "grabbing"
                                                : "grab",
                                            transition: isDraggingSlide
                                                ? "none"
                                                : ".2s", // Применяем transition только при отпускании
                                        }}
                                        onMouseDown={(e: any) => {
                                            if (isActive) {
                                                setIsDraggingSlide(true); // Устанавливаем флаг перетаскивания
                                                handleStart(e);
                                            }
                                        }}
                                        onMouseUp={() => {
                                            setIsDraggingSlide(false); // Сбрасываем флаг перетаскивания при отпускании
                                        }}
                                        onTouchStart={(e: any) => {
                                            if (isActive) {
                                                setIsDraggingSlide(true); // Устанавливаем флаг перетаскивания
                                                handleStart(e);
                                            }
                                        }}
                                        onTouchEnd={() => {
                                            setIsDraggingSlide(false); // Сбрасываем флаг перетаскивания при отпускании
                                        }}
                                        onClick={() => addTemplate()}
                                    >
                                        <div
                                            className={`p-[20px] bg-white rounded-[15px] flex gap-[10px] justify-center items-center transition-all duration-200 ${
                                                isActive
                                                    ? "scale-[1.2] shadow-inner"
                                                    : ""
                                            }`}
                                        >
                                            <div className="w-[45px] h-[45px] shadow-md bg-gradient-to-b shadow-[rgba(0,0,0,0.25)] from-[#9E9E9E] to-white"></div>
                                            <div className="w-[45px] h-[45px] shadow-md bg-gradient-to-b shadow-[rgba(0,0,0,0.25)] from-[#9E9E9E] to-white"></div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                        <span className=" block pt-[40px] text-[16px] font-[600] opacity-60 text-center">
                            Эта форма лучше всего подойдет для
                        </span>
                        <TwoBlockPreview h={100} w={100} />
                    </div>

                    <button
                        disabled={false}
                        className={`transition absolute left-1/2 -translate-x-1/2 bottom-2 tall:bottom-[7%] text-white mx-auto w-[90%] py-[15px] rounded-[15px] bg-gradient-to-r whitespace-nowrap  disabled:opacity-50 from-black to-[#545454]`}
                        onClick={() => {
                            dispatch(setActive(!isActive));
                        }}
                    >
                        Закрыть
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditForm;
