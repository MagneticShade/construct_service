import { useQuery } from "react-query";
import Filter from "./Filter"
import Projects from "./Projects";

const ModalProjects = () => {

    const { data = [], isLoading } = useQuery("repoData", () =>
    fetch("http://localhost:3000/blanks").then((res) => res.json())
);
  return (
    <>
        <div className="px-40 max-xl:px-20 max-sm:px-10">

            <h2 className="pt-4 text-xl font-bold text-center">
                Мои проекты
            </h2>

            <Filter filterName={['все','В работе','Готовые','Архив']} />

        </div>
        <div className="blanks mt-10 h-screen overflow-scroll">
            {isLoading ? null : <Projects data={data} />}
        </div>
    </>
  )
}

export default ModalProjects