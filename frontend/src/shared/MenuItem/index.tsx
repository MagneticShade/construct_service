import { FC } from "react";
import { Link } from "react-router-dom";
import { IMenuItemProps } from "./MenuItemInterface";

const MenuItem: FC<IMenuItemProps> = ({ img, link }) => {
    return (
        <Link to={link}>
            <button className="w-10 h-10">
                <img src={img} alt="questions"/>
            </button>
        </Link>
    );
};

export { MenuItem };
