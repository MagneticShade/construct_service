import { useSelector } from "react-redux";
import Menu from "../components/Menu";
import Modal from "../components/Modal";
import ModalBlanks from "../components/ModalBlanks";
import { RootState } from "../store/store";
import ModalProjects from "../components/ModalProjects";

const Home = () => {
    const openPrpject = useSelector((state: RootState) => state.openProjects.value);
    const openBlanks = useSelector((state: RootState) => state.openBlanks.value);
    const openModal = useSelector((state: RootState) => state.openModal.value);

    return (
        <>
            <div className="container h-screen w-full flex items-center justify-center">
                {/* <div className="img w-[250px] h-[400px] bg-slate-600"></div> */}

                <div className=" w-full h-screen">
                    <div className="flex items-center justify-center h-full">
                        <img src="/mask.png" alt="mask" className="h-[50%]" />
                    </div>
                </div>
                <Menu userImg="" />
            </div>
            <Modal open={openModal}>
                {openBlanks ? null : <ModalBlanks />}
                {openPrpject ? null : <ModalProjects />}
            </Modal>
        </>
    );
};

export default Home;
