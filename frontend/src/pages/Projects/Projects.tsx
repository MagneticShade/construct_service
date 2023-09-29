import { FC, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import maskProject from "/maskProject.png";
import "swiper/css";
import useLongPress from "@/src/hooks/useLongPress.ts";
import { SelectedBlock } from "./SelectedBlock";
import { axiosInstance, userId } from "@/src/axios";
import { Link } from "react-router-dom";

const Projects: FC = () => {
    const [selectedImageWidth, setSelectedImageWidth] = useState<any>();
    const [modalStatus, setModalStatus] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const openModalWindow = (e: any) => {
        const rect = e.target.getBoundingClientRect();
        setModalStatus(!modalStatus);
        setSelectedImageWidth({ margin: rect.top, height: rect.height });
    };
    const longPress = useLongPress(openModalWindow);
    const [projectOwn, setProjectOwn] = useState<any>([]);
    const [projects, setProjects] = useState<any>([]);

    function extractId() {
        if (projectOwn.length) {
            return JSON.parse(projectOwn[activeIndex])._id.$oid;
        }
    }

    const getProjectOwn = async () => {
        await axiosInstance
            .get(`/api/project/own/${userId}`)
            .then((res) => setProjectOwn(res.data));
    };
    const getProject = async () => {
        const projectData = await Promise.all(
            projectOwn.map((item: any) => {
                const projectId = JSON.parse(item)._id.$oid;
                return axiosInstance
                    .get(`/api/project/${projectId}`)
                    .then((res) => res.data);
            })
        );
        setProjects(projectData);
    };

    useEffect(() => {
        getProjectOwn();
    }, []);
    useEffect(() => {
        getProjectOwn();
    }, [location.pathname]);
    useEffect(() => {
        getProject();
    }, [projectOwn, activeIndex]);

    async function handleDeleteProject() {
        await axiosInstance.delete(`/api/project/delete/${extractId()}`);
        getProjectOwn();
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
                onSlideChange={(e) => {
                    setActiveIndex(e.realIndex);
                    if (e.activeIndex + 1 == 0) e.slideTo(1);
                    else if (e.activeIndex == e.slides.length - 1)
                        e.slideTo(e.slides.length - 2);
                }}
                breakpoints={{
                    550: {
                        slidesPerView: 1.2,
                    },
                }}
            >
                {projects.map((item: any, i: number) => {
                    return (
                        <SwiperSlide key={i++} {...longPress}>
                            <Link
                                className=" block w-full h-full"
                                to="/constructorpractice/yoursite/"
                            >
                                <div
                                    style={{
                                        backgroundImage: `url(${maskProject})`,
                                    }}
                                    className={`w-full h-[276px] transition-all duration-200 text-center ${
                                        activeIndex === i ? "!scale-[1.1]" : ""
                                    }`}
                                ></div>
                                <span
                                    className={`text-black text-[24px] uppercase absolute -bottom-12 left-1/2 -translate-x-1/2 duration-200 -z-10`}
                                >
                                    {item.title}
                                </span>
                            </Link>
                        </SwiperSlide>
                    );
                })}
                <SwiperSlide>
                    <div
                        className={`w-full h-[276px] transition-all duration-200 text-center flex items-center justify-center`}
                    >
                        <Link
                            to={"/constructorpractice/blanks/1"}
                            className="w-20 h-20 border border-black rounded-full flex items-center justify-center text-[48px] font-medium"
                        >
                            +
                        </Link>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export { Projects };
