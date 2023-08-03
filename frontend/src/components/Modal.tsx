import { useDispatch } from "react-redux";
import close from "../assets/icons/close.svg";
import { FC } from "react";
import { setOpenModal } from "../store/slice/openModalSlice";
import { setOpenBlanks } from "../store/slice/openBlanksSlice";
import { setOpenProject } from "../store/slice/openProjectSlice";

interface IModalProps {
    children: React.ReactNode;
    open: boolean;
}
const Modal: FC<IModalProps> = ({ children, open }) => {
    const dispatch = useDispatch();
    const closeModal = (): void => {
        dispatch(setOpenModal());
        dispatch(setOpenBlanks(false));
        dispatch(setOpenProject(false));
    };

    return (
        //модальное окно
        <div
            className={`fixed top-0 left-0 w-full ${
                open ? "pointer-events-none opacity-0" : ""
            } h-screen bg-black bg-opacity-50 transition-all duration-500`}
        >
            <div
                className={`fixed  ${
                    open ? "top-full" : "top-0"
                } left-0 mt-[6vh] w-full bg-white transition-all duration-500`}
            >
                <button className="p-5" onClick={() => closeModal()}>
                    <img className="w-7 aspect-square" src={close} alt="close button" />
                </button>

                {children}
            </div>
        </div>
    );
};

export default Modal;
