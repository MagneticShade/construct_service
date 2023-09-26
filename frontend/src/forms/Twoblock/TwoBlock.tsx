import { FC, useEffect, useState } from "react";
import { ITwoBlockProps } from "./TwoBlockInterface";
import { axiosInstance } from "@/src/axios";

enum TextAlign {
    Left = "left",
    Center = "center",
    Right = "right",
}

const TwoBlock: FC<ITwoBlockProps> = ({
    background,
    module,
    name,
    textAlign,
}) => {
    const [modules, setModules] = useState<any>([]);
    console.log(modules);
    
    function extractId(jsonString: string) {
        const match = jsonString.match(/"(\$oid)":\s*"([^"]+)"/);
        if (match) {
            return match[2]; // Возвращаем значение ID (вторая группа регулярного выражения)
        } else {
            return null; // Возвращаем null, если ID не найден
        }
    }
    useEffect(() => {
        const fetchData = async () => {
          const moduleData = await Promise.all(
            module.map(async (e: any) => {
              const response = await axiosInstance.get(`/api/modules${extractId(e)}`);
              return response.data;
            })
          );
          
          setModules(moduleData);
        };
      
        fetchData();
      }, []);
      
    console.log(modules);
    
    return (
        <>
            <div
                style={{
                    background: background,
                    textAlign: textAlign as TextAlign,
                }}
                className="pt-[160px] pb-[320px]  border-b border-b-black"
            >
                <h2 className="font-[500] text-[58px] text-black mb-[58px]">
                    {name}
                </h2>
                <div className="flex w-full justify-center gap-[58px] flex-wrap">
                    {module.length && modules.map((item: any, i: number) => {
                        // debugger
                        console.log(item.textAlign);
                        
                        return (
                            <div
                                key={i}
                                style={{
                                    background: item.background,
                                    color: item.color,
                                    textAlign: item.textAlign as TextAlign,
                                }}
                                className="w-[589px] h-[620px] p-20 duration-200 hover:shadow-my hover:-translate-y-2"
                            >
                                <h2 className="text-[58px] leading-[1] font-[700] w-full">
                                    {item.header}
                                </h2>
                                <p className="opacity-80 font-[500] pt-5">
                                    {item.subheader}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default TwoBlock;
