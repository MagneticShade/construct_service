import { axiosInstance, getTemplates } from "@/src/axios";

import TwoBlock from "@/src/forms/Twoblock/TwoBlock";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";

import { Template, setTemp } from "@/src/store/slice/YourSiteSlice";
import { useEffect, useState } from "react";

const YourSite = () => {
   
    axiosInstance.get(`/api/users`).then(() => {
        // console.log(data);
    });

    const dispath = useAppDispatch();
    const [getTemplate, setGetTemplate] = useState<Template[]>([]);
    async function get() {
        const data = await getTemplates();
        setGetTemplate(await data);
        dispath(setTemp(await data));
        console.log(await data);
    }

    useEffect(() => {
        get();
    }, []);

    return (
        <>
            <div className="h-screen overflow-y-scroll">
                {getTemplate.map((e, i) => {
                    return (
                        <>
                            <TwoBlock
                                background={e.background}
                                id={e.id}
                                localId={e.local_id}
                                module={e.modules}
                                name={e.name}
                                order={e.order}
                                textAlign={e.textAlign}
                                key={i}
                            />

                            {/* {e.modules.length === 5 && (
                                <TroshkinBlock
                                    background={template.background}
                                    backgroundBlock={
                                        template.modules[0].background
                                    }
                                    id={i}
                                    textAlign={template.textAlign}
                                    textColor={template.modules[0].textColor}
                                    title={template.name}
                                    key={i}
                                />
                            )} */}
                        </>
                    );
                })}
            </div>
        </>
    );
};

export default YourSite;
