import { Filter } from "@/src/shared/Filter";

const EditLogo = () => {
    return (
        <div className="container pt-10">
            <Filter
                filterName={["Логотип", "Панели", "Эффекты"]}
                setIndex={() => {}}
            />
            <div className="content pt-[52px] h-[150px]">
                <span className="opacity-60 text-[14px] font-[600] block text-center">
                    Прикрепи файл логотипа.
                    <br /> Формат SVG
                </span>
            </div>
            <label className="flex items-center px-4 py-2 bg-black text-white rounded">
                <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                </svg>
                Выберите файл
                <input type="file" className="hidden" />
            </label>
        </div>
    );
};

export default EditLogo;
