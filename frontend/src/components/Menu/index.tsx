import { FC } from "react";
import questions from "../../assets/icons/questions.svg";
import gallery from "../../assets/icons/gallery.svg";
import rectangle from "../../assets/icons/rectangle.svg";
import list from "../../assets/icons/list.svg";
import { IMenuProps } from "./MenuInterface";
import { MenuItem } from "@/src/shared/MenuItem";

const Menu: FC<IMenuProps> = ({ userImg }) => {
    return (
        <div className="fixed bottom-0 w-fit right-0 left-0 mx-auto  ">
            <ul className="grid grid-cols-5 gap-[34px] mb-[10%] items-center ">
                <li>
                    <MenuItem
                        img={questions}
                        link="/constructorpractice/questions"
                    />
                </li>
                <li>
                    <MenuItem
                        img={gallery}
                        link="/constructorpractice/gallery"
                    />
                </li>
                <li>
                    <MenuItem
                        img={rectangle}
                        link="/constructorpractice/blanks"
                    />
                </li>
                <li>
                    <MenuItem img={list} link="/constructorpractice/list" />
                </li>
                <li>
                    <MenuItem
                        img={userImg}
                        link="/constructorpractice/profile"
                    />
                </li>
            </ul>
        </div>
    );
};

export { Menu };
