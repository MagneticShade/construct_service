import { Category } from "@/src/shared/Category";
import { Link } from "react-router-dom";

const Categories = () => {
    return (
        <div className="tags relative pt-10 flex flex-wrap gap-[9px] justify-center">
            <Category handleMass={() => {}} mass={[]} title="Кнопка действия" />
            <Link to="/constructorpractice/background/">
                <Category handleMass={() => {}} mass={[]} title="Фон" />
            </Link>
            <Category handleMass={() => {}} mass={[]} title="Соц. сети" />
            <Category handleMass={() => {}} mass={[]} title="Управление" />
            <Category handleMass={() => {}} mass={[]} title="Оформление" />
            <Link to="/constructorpractice/text/">
                <Category handleMass={() => {}} mass={[]} title="Текст" />
            </Link>
        </div>
    );
};

export { Categories };
