
import Filter from './Filter'
import { useQuery } from 'react-query';
import Blanks from './Blanks';


const ModalBlanks = () => {

    const { data =[], isLoading } = useQuery("repoData", () =>
    fetch("http://localhost:3000/blanks").then((res) => res.json())
);
  return (
    <>
        <div className="px-40 max-xl:px-20 max-sm:px-10">

            <h2 className="pt-4 text-xl font-bold text-center">
                Выбери болванку
            </h2>

            <Filter filterName={['все','обычные','с дайджестом']} />

            <p className="descr pt-4 text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quam aspernatur autem optio amet ullam et esse
                reprehenderit sequi.
            </p>
        </div>
        <div className="blanks mt-10 h-screen overflow-scroll">
            {isLoading ? null : <Blanks data={data} />}
        </div>
    </>
  )
}

export default ModalBlanks