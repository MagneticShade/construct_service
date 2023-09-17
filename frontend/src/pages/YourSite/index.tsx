import { axiosInstance, getTemplates } from "@/src/axios";
import TroshkinBlock from "@/src/forms/TroshkinBlock/TroshkinBlock";
import TwoBlock from "@/src/forms/Twoblock/TwoBlock";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { useEffect, useState } from "react";

const YourSite = () => {
    const { template } = useAppSelector((state) => state.yourSite);
    axiosInstance.get(`/api/users`).then(() => {
        // console.log(data);
    });
    const [getTemplate, setGetTemplate] = useState([]);
    async function get() {
        const data = await getTemplates();
        setGetTemplate(await data);
    }

    useEffect(() => {
        get();
    }, []);

    return (
        <>
            <div className="h-screen overflow-y-scroll">
                {getTemplate.map((_, i) => {

                    return (
                        <>
                            <TroshkinBlock
                                background={template.background}
                                backgroundBlock={template.module[0].background}
                                id={i}
                                textAlign={template.textAlign}
                                textColor={template.module[0].textColor}
                                title={template.name}
                            />
                            <TwoBlock
                                background={template.background}
                                id={template.id}
                                localId={template.local_id}
                                module={template.module}
                                name={template.name}
                                order={template.order}
                                textAlign={template.textAlign}
                                key={i}
                            />
                        </>
                    );
                })}
            </div>
        </>
    );
};

export default YourSite;
