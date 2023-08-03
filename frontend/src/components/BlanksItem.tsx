import { FC } from "react";

interface IBlanksItemProps {
    imgUrl: string;
    tags: string[];
}

const BlanksItem: FC<IBlanksItemProps> = ({ imgUrl, tags }) => {

    
    return (
        <>
                <div
                    className={`blok w-full overflow-hidden h-[500px] max-sm:h-[200px] relative mt-5`}
                    >
                    <img
                        src={imgUrl}
                        className="absolute top-0 left-0 z-0 w-full object-cover"
                        alt=""
                    />
                    <ul className="tags flex flex-wrap gap-4 text-sm pt-10 pl-4">
                        {tags.map((item, id) => (
                            <li
                                key={id}
                                className="text-white relative z-10 border border-white px-4 py-2 rounded-full">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
        </>
    );
};

export default BlanksItem;
