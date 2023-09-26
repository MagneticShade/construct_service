import { axiosInstance, getTemplates } from "@/src/axios";

import TwoBlock from "@/src/forms/Twoblock/TwoBlock";


import { Template } from "@/src/store/slice/YourSiteSlice";
import { useEffect, useState } from "react";

const YourSite = () => {
   
    axiosInstance.get(`/api/users`).then(() => {
        // console.log(data);
    });

    const [getTemplate, setGetTemplate] = useState<Template[]>([]);
    console.log(getTemplate);
    
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
                {getTemplate.length && getTemplate.map((item, i) => {
                    console.log(item);
                    // debugger
                    return (
                        <>
                            <TwoBlock
                                background={item.background}
                                id={item.id}
                                localId={item.local_id}
                                module={item.modules}
                                name={item.name}
                                order={item.order}
                                textAlign={item.textAlign}
                                key={i}
                                // color={item.color}
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
