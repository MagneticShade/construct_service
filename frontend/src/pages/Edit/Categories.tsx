import { Category } from "@/src/shared/Category";
import { FC } from "react";
import { Link } from "react-router-dom";

interface ICategoriesProps {
    tempalteId: string
}
const Categories:FC<ICategoriesProps> = ({tempalteId}) => {
    return (
        <div className="tags relative pt-10 flex flex-wrap gap-[9px] justify-center">
            <Category handleMass={() => {}} title="Кнопка действия" />
            <Link to={`/constructorpractice/list/edit/background/${tempalteId}`}>
                <Category handleMass={() => {}} title="Фон" />
            </Link>
            <Category handleMass={() => {}} title="Соц. сети" />
            <Category handleMass={() => {}} title="Управление" />
            <Category handleMass={() => {}} title="Оформление" />
            <Link to={`/constructorpractice/list/edit/text/${tempalteId}`}>
                <Category handleMass={() => {}} title="Текст" />
            </Link>
        </div>
    );
};

export { Categories };
