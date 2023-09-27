import { Menu } from "../components/Menu";

const Home = () => {
    return (
        <>
            <div className="container h-screen w-full flex items-center justify-center bg-white">
                <div className=" w-full h-screen">
                    <div className="flex items-center justify-center h-screen">
                        <img
                            src="/constructorpractice/mask.png"
                            alt="mask"
                            className="h-[50%]"
                        />
                    </div>
                </div>
                <Menu userImg="/constructorpractice/user.jpg" />
            </div>
        </>
    );
};

export default Home;
