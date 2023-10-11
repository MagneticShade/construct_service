import { axiosInstance } from "@/src/axios";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import {
    getProjectWithTemplatesByIdThunk,
    getTemplatesWithModulesByIdThunk,
} from "@/src/store/slice/EditSlice";
import { useEffect, useState } from "react";

const Header = () => {
    const id = localStorage.getItem("projectId");
    const [logo, setLogo] = useState("");
    const getLogo = async () => {
        if (id) {
            axiosInstance
                .get(`/project/${JSON.parse(id)}/logo`)
                .then((data) => setLogo(data.data));
        }
    };
    const template = useAppSelector((state) => state.edit.templates);
     useEffect(() => {
        getTemplatesWithModulesByIdThunk({ templateId: id as string });
        getLogo();
    }, []);
    return (
        <div className="fixed left-0 right-0 w-[12%] bg-slate-200 bg-opacity-50 h-screen z-50">
            <div
                className="w-10 h-10"
                dangerouslySetInnerHTML={{
                    __html: logo,
                }}
            ></div>
            <ul>
                {template.map((item) => (
                    <li>
                        <a href={`#${item.name}`}>{item.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Header;
