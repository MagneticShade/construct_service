import { InputDefault } from '@/src/shared/Inputs/InputDefault'
import Alignment from '../Alignment'
import { CheckedButton } from '@/src/shared/Buttons/CheckedButton'

const FormParametrs = () => {
  return (
    <>
     <div className="">
                <h1 className="pt-4 text-xl font-bold text-center">
                    Параметры Текста формы
                </h1>
                <p className="descr font-semibold text-black/60 spacing leading-[143.4%] text-center text-[14px] pt-4">
                    Редактируйте параметры всей формы Выбери центрирование
                    Выбери цвет
                </p>
            </div>
            <div className="pt-4">
                <InputDefault
                    name="nameForm"
                    type="text"
                    placeholder="Название Формы "
                />
            </div>
            <div className="flex items-center justify-between pt-8">
                <span className="font-medium text-[#B6B6B6] spacing leading-[143.4%] text-center text-[18px]">
                    Цвет текста
                </span>

                <div className="w-[200px] h-[30px] bg-black rounded-[10px]"></div>
            </div>
            <div className="pt-8">
                <Alignment />
            </div>
            <div className="flex justify-between items-center pt-8">
                <span>Отображать название  <br /> на сайте </span>
                <CheckedButton checked={false} />
            </div></>
  )
}

export default FormParametrs