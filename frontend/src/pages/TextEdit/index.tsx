import { Filter } from "@/src/shared/Filter";
import FormParametrs from "./FormParametrs";
import { useState } from "react";

const PageTextEdit = () => {
    const [index, setIndex] = useState<number>(0);
    console.log(index);
    
    return (
        <div className="container pt-10">
            <Filter filterName={["Форма", "Модули"]} setIndex={setIndex}/>
            {index == 0 ? <FormParametrs /> : ''}
        </div>
    );
};

export { PageTextEdit };
