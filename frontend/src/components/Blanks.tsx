import { FC } from "react";
import BlanksItem from "./BlanksItem";
import { Link } from "react-router-dom";


interface IData {
  data: BlanksItem[];
}
type BlanksItem ={
  id: number
  imgUrl: string;
  tags: string[]
}

const Blanks: FC<IData> = ({ data }) => {
    return (
        <div className="w-full h-full">
            {data.map((item: BlanksItem, id) => (
                <Link to={`/card`}>
                    <BlanksItem key={id} imgUrl={item.imgUrl} tags={item.tags} />
                </Link>

            ))}
        </div>
    );
};

export default Blanks;
