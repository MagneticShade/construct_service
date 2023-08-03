import { FC } from "react";
import { useDispatch } from "react-redux";
import { setOpenModal } from "../store/slice/openModalSlice";
import { setOpenBlanks } from "../store/slice/openBlanksSlice";
import { setOpenProject } from "../store/slice/openProjectSlice";
import questions from "../assets/icons/questions.svg";
import photo from "../assets/icons/photo.svg";
import rectangle from "../assets/icons/rectangle.svg";
import list from "../assets/icons/list.svg";

interface IMenuProps {
    userImg: string;
}
const Menu: FC<IMenuProps> = ({ userImg }) => {
    const dispatch = useDispatch();
    const openBlanks = () => {
        dispatch(setOpenModal());
        dispatch(setOpenBlanks(true));
    };
    const openProjects = () => {
        dispatch(setOpenModal());
        dispatch(setOpenProject(true));
    };
    return (
        // <div className="fixed bottom-[7%] w-full">
        //     <ul className="flex justify-between px-4">
        //         <li>
        //             <a href="#"><img src="./questions.svg" alt="" /></a>
        //         </li>
        //         <li>
        //             <a href="#"><img src="./list.svg" alt="" /></a>
        //         </li>
        //         <li>
        //             <button onClick={() => openBlanks()}><img src="./rectangle.svg" alt="" /></button>
        //         </li>
        //         <li>
        //             <button onClick={() => openProjects()}><img src="./photo.svg" alt="" /></button>
        //         </li>
        //         <li>
        //             <a href="#">
        //                 <img src={userImg} alt="userImg" />
        //             </a>
        //         </li>
        //     </ul>
        // </div>
        //
        <div className="fixed bottom-0 w-fit right-0 left-0 mx-auto  ">
            <ul className="grid grid-cols-5 gap-[34px] mb-[10%]  ">
                <li>
                    <button>
                        <img src={questions} alt="" />
                    </button>
                </li>
                <li>
                    <button>
                        <img src={photo} alt="" />
                    </button>
                </li>
                <li>
                    <button>
                        <img onClick={() => openBlanks()} src={rectangle} alt="" />
                    </button>
                </li>
                <li>
                    <button>
                        <img onClick={() => openProjects()} src={list} alt="" />
                    </button>
                </li>
                <li>
                    <button>
                        <img className="rounded-full" src={userImg} alt="" />
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Menu;
