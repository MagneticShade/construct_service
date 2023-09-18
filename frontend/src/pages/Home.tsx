import { Menu } from "../components/Menu";

const Home = () => {
    return (
        <>
            <div className="container h-screen w-full flex items-center justify-center">
                <div className=" w-full h-screen">
                    <div className="flex items-center justify-center h-screen">
                        <img src="./mask.png" alt="mask" className="h-[50%]" />
                    </div>
                </div>
                <Menu userImg="./user.jpg" />
            </div>
        </>
    );
};

export default Home;
