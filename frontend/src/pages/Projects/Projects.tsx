import { FC, useState,useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import maskProject from "@/public/maskProject.png";
import "swiper/css";
import useLongPress from "@/src/hooks/useLongPress.ts";
import { SelectedBlock } from "./SelectedBlock";
import { axiosInstance, userId } from "@/src/axios";
import { useLocation } from "react-router-dom";

const Projects: FC = () => {
    const [selectedImageWidth, setSelectedImageWidth] = useState<any>();
    const [modalStatus, setModalStatus] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [userProjects, setUserProjects] = useState([]);
    const location = useLocation()
    const openModalWindow = (e: any) => {
        const rect = e.target.getBoundingClientRect();
        setModalStatus(!modalStatus);
        setSelectedImageWidth({ margin: rect.top, height: rect.height });
        console.log(rect.height);
    };
    const longPress = useLongPress(openModalWindow);

    function extractId(jsonString:string) {
        const match = jsonString.match(/"(\$oid)":\s*"([^"]+)"/);
        if (match) {
          return match[2]; // Возвращаем значение ID (вторая группа регулярного выражения)
        } else {
          return null; // Возвращаем null, если ID не найден
        }
      }
      async function getProjects() {
        const {data} = await axiosInstance.get(`/api/project/own/${userId}`)
        setUserProjects( await data)
        console.log(data);
        
       
    }
    useEffect(()=> {
        getProjects()
    },[location])

    async function handleDeleteProject(){
       await axiosInstance.delete(`/api/project/delete/${extractId(userProjects[activeIndex])}`);
       await getProjects()
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
                    handleDeleteProject={handleDeleteProject}
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
                            style={{ backgroundImage: `url(${maskProject})` }}
                            {...longPress}

                            className={`w-full h-[276px] transition-all duration-200  ${
                                activeIndex === i ? "!scale-[1.1] " : "" 
                            }`}
                            key={i}
                        >
                            
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
};

export { Projects };
