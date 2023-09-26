import { Swiper } from "swiper/react";

import { SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import EditForm from "./EditForm";
import useLongPress from "../../hooks/useLongPress";
import { DeleteButton } from "../../shared/Buttons/DeleteButton";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { setActive } from "@/src/store/slice/ButtonSlice";
import { Categories } from "./Categories";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { axiosInstance, getTemplates } from "@/src/axios";
import { setActiveIndexEdit, setTemp } from "@/src/store/slice/EditSlice";
import TwoBlockPreview from "@/src/shared/FormsPrev/TwoBlockPreview";
import { setIndex } from "@/src/store/slice/FormIndexSlice";

const PageEdit = () => {
    const [buttonActive, setButtonActive] = useState(false);
    const templates = useAppSelector(state=>state.edit.templates)
    const backspaceLongPress = useLongPress(() => {
        setButtonActive(!buttonActive);
    });
    const activeIndex = useAppSelector((state) => state.formIndex.index);

    const dispatch = useAppDispatch();

    async function get() {
        const response = await getTemplates();
        dispatch(setTemp(await response));
    }
    useEffect(() => {
        get();

    }, []);

    async function delTemp() {
        if(typeof templates !== 'string'){
            await axiosInstance.delete(`/api/templates/delete${templates[activeIndex].id}`);
        }

        await get();
    }

    return (
        <>
            <img
                src="/constructorpractice/maskProject.png"
                alt=""
                className="absolute z-0 w-full h-screen object-cover"
            />
            <div className="container" id="dropZone">
                {templates[activeIndex] && templates && (
                    <Categories tempalteId={templates[activeIndex].id} />
                )}

                <div className="forms pt-[273px]">
                    <Swiper
                        spaceBetween={13}
                        className="mySwiper overflow-visible transition-all duration-500 absolute top-1/2 left-0 w-full"
                        slidesPerView={1.6}
                        centeredSlides={true}
                        breakpoints={{
                            550: {
                                slidesPerView: 1.2,
                            },
                        }}
                        onSlideChange={(e) => console.log(e.realIndex)}
                        initialSlide={0}
                        onActiveIndexChange={(e) => {
                            dispatch(setIndex(e.activeIndex));
                            dispatch(
                                setActiveIndexEdit(
                                    (e.realIndex = e.activeIndex)
                                )
                            );
                            // dispatch(setIndex(e.realIndex));
                            // if (typeof template !== "string") {
                            //     // Здесь TypeScript знает, что template - это объект типа Template
                            //     dispatch(setActiveId(template.id));
                            // }
                        }}
                    >
                        {templates !== "" &&
                            templates.map((_: any, i: number) => {
                                // debugger;
                                return (
                                    <SwiperSlide
                                        {...backspaceLongPress}
                                        key={i}
                                        className="w-auto flex justify-center"
                                    >
                                        <div
                                            className={`py-[30px] px-[26px] bg-white rounded-[15px] flex gap-[10px] justify-center items-center transition-all duration-200 ${
                                                activeIndex === i
                                                    ? "scale-[1.2]"
                                                    : ""
                                            }`}
                                        >
                                            <TwoBlockPreview h={70} w={70} />
                                            <span
                                                className={`absolute -bottom-8 text-white transition-all duration-200 ${
                                                    activeIndex === i
                                                        ? "translate-y-0"
                                                        : "-translate-y-10"
                                                }`}
                                            >
                                                {_.name === ""
                                                    ? "Название формы"
                                                    : _.name}
                                            </span>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                    </Swiper>
                </div>
            </div>
            <EditForm />

            {buttonActive ? (
                <DeleteButton
                    title="Удалить"
                    buttonActive={false}
                    handleClick={() => {
                        delTemp();
                        setButtonActive(false);
                    }}
                />
            ) : (
                <button
                    disabled={false}
                    className={`transition absolute left-1/2 -translate-x-1/2 bottom-2 tall:bottom-[7%] text-white mx-auto w-[90%] py-[15px] rounded-[15px] bg-gradient-to-r whitespace-nowrap  disabled:opacity-50 from-black to-[#545454]`}
                    onClick={() => {
                        dispatch(setActive(true));
                    }}
                >
                    Все формы
                </button>
            )}
        </>
    );
};

export default PageEdit;
