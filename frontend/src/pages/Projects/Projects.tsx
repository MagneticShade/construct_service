import { FC, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import maskProject from "/maskProject.png";
import "swiper/css";
import useLongPress from "@/src/hooks/useLongPress.ts";
import { SelectedBlock } from "./SelectedBlock";
import { axiosInstance, getProjects } from "@/src/axios";
import { Link, useLocation } from "react-router-dom";
import { tg } from "@/src/tg";

const Projects: FC = () => {
    const [selectedImageWidth, setSelectedImageWidth] = useState<any>();
    const [modalStatus, setModalStatus] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [userProjects, setUserProjects] = useState([]);
    const location = useLocation();
    const openModalWindow = (e: any) => {
        const rect = e.target.getBoundingClientRect();
        setModalStatus(!modalStatus);
        setSelectedImageWidth({ margin: rect.top, height: rect.height });
        console.log(rect.height);
        tg.HapticFeedback.impactOccurred("heavy");
    };
    const longPress = useLongPress(openModalWindow);

    function extractId(jsonString: string) {
        const match = jsonString.match(/"(\$oid)":\s*"([^"]+)"/);
        if (match) {
            return match[2]; // Возвращаем значение ID (вторая группа регулярного выражения)
        } else {
            return null; // Возвращаем null, если ID не найден
        }
    }
    async function get() {
        const data = await getProjects();
        console.log(await data);

        setUserProjects(await data);
        console.log(await data);
    }
    useEffect(() => {

     get();

    }, []);

    async function handleDeleteProject() {
        await axiosInstance.delete(
            `/api/project/delete/${extractId(userProjects[activeIndex])}`
        );
        await get();
    }
    return (
        <>
            {modalStatus && (
                <SelectedBlock
                    style={{
                        marginTop: selectedImageWidth
                            ? selectedImageWidth.margin
                            : "" ?? "auto",
                        backgroundImage: `url(${maskProject})`,
                        height: selectedImageWidth.height,
                    }}
                    setModalStatus={setModalStatus}
                    handleDeleteProject={() => handleDeleteProject()}
                />
            )}
            <Swiper
                spaceBetween={15}
                className="mySwiper container w-[300px] overflow-visible "
                slidesPerView={1.5}
                centeredSlides={true}
                onSlideChange={(e) => setActiveIndex(e.realIndex)}
                breakpoints={{
                    550: {
                        slidesPerView: 1.2,
                    },
                }}
            >
                {userProjects.map((_, i) => {
                    return (
                        <SwiperSlide
                            style={{
                                backgroundImage: `url(${maskProject})`,
                            }}
                            {...longPress}
                            className={`w-full h-[276px] transition-all duration-200  ${
                                activeIndex === i ? "!scale-[1.1] " : ""
                            }`}
                            key={i++}
                        >
                            <Link
                                className=" block w-full h-full"
                                to="/constructorpractice/yoursite/"
                            ></Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
};

export { Projects };
