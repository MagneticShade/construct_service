import { Filter } from "@/src/shared/Filter";
import FormParametrs from "./FormParametrs";
import { useState } from "react";
import FormHeadersParametrs from "./FormHeadersParametrs";

const PageTextEdit = () => {
    const [index, setIndex] = useState<number>(0);
    console.log(index);
    
    return (
        <div className="container pt-10 overflow-auto h-full">
            <Filter filterName={["Форма", "Модули"]} setIndex={setIndex}/>
            {index == 0 ? <FormParametrs /> : ''}
            {index == 1 ? <FormHeadersParametrs /> : ''}
        </div>
    );
};

export { PageTextEdit };
