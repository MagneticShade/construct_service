import { FC } from "react"

interface IFilterProps{
    filterName: string[]
}

const Filter:FC<IFilterProps> = ({filterName}) => {
  return (
    <div>
        <ul className="flex gap-4 pt-4 flex-wrap font-semibold">
            {filterName.map((name, id) => <li key={id}>{name}</li>)}
        </ul>
    </div>
  )
}

export default Filter