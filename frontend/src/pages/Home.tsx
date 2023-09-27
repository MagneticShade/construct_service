import { Swiper, SwiperSlide } from "swiper/react";
import { Menu } from "../components/Menu";
import { useState } from "react";

const Home = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0)
    return (
        <>
            <div className=" h-screen justify-center bg-white">
                <div className="h-screen">
                    <div className="flex items-center h-screen">
                        <Swiper
                            className="mySwiper container overflow-visible z-0"
                            slidesPerView={"auto"}
                            spaceBetween={20}
                            centeredSlides={true}
                            onSlideChange={(e) => {
                                setActiveIndex(e.realIndex);
                            }}
                            breakpoints={{
                                550: {
                                    slidesPerView: 1.2,
                                },
                            }}
                        >
                            {[...Array(5)].map((_, i) => (
                                <SwiperSlide
                                    className={`flex w-[200px] items-center justify-center ${
                                        activeIndex === i ? "scale-[1.2]" : ""
                                    }`}
                                >
                                    <img
                                        src="/constructorpractice/mask.png"
                                        alt="mask"
                                        className={`h-[50%] duration-200 ${
                                            activeIndex === i
                                                ? "scale-[1.2]"
                                                : ""
                                        }`}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className="container">
                    <Menu userImg="/constructorpractice/user.jpg" />
                </div>
            </div>
        </>
    );
};

export default Home;
