import { CheckedButton } from "../../shared/Buttons/CheckedButton";
import { LinkButton } from "../../shared/Buttons/LinkButton";
import { Filter } from "../../shared/Filter";
import { Projects } from "./Projects";

const PageProjects = () => {
    const isLoading = false;

    return (
        <>
            <div className="relative">
                <div className="container">
                    <h2 className="pt-10 text-xl font-bold text-center">
                        Мои проекты
                    </h2>

                    <Filter
                        setIndex={() => {}}
                        filterName={["все", "В работе", "Готовые", "Архив"]}
                    />
                </div>

                <div className="blanks mt-[2vh]">
                    {isLoading ? null : <Projects />}
                </div>
                <div className="container">
                    <div className="max-w-[300px] mx-auto flex justify-between items-center pt-12">
                        <span>Совместный доступ</span>
                        <CheckedButton checked={true} setChecked={() => {}} />
                    </div>
                </div>
            </div>
            <LinkButton link={""} title={"дальше"} buttonActive={false} />
        </>
    );
};

export default PageProjects;
