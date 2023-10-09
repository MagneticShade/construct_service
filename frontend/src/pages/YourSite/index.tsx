import TwoBlock from "@/src/forms/Twoblock/TwoBlock";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { getProjectWithTemplatesByIdThunk } from "@/src/store/slice/EditSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const YourSite = () => {
    const dispatch = useAppDispatch();
    const templates = useAppSelector((state) => state.edit.templates);
    console.log(templates);

    const { id } = useParams();
    useEffect(() => {
        dispatch(getProjectWithTemplatesByIdThunk({ projectId: id as string }));
    }, []);
    return (
        <>
            <div className="h-screen overflow-y-scroll">
                {templates.length &&
                    templates.map((item, i) => {
                        console.log(item);
                        // debugger
                        return (
                            <>
                                <TwoBlock
                                    background={item.background_color}
                                    id={item.ID}
                                    name={item.name}
                                    textAlign={item.text_align}
                                    key={i}
                                    color={item.text_color}
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
