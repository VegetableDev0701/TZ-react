import { Button } from 'antd';
import PinItem from '../common/PinItem';
import { IoSettingsOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { PiNotepadThin, PiNotebookDuotone } from "react-icons/pi";
export default function FinControl () {
  return (
    <div className="bg-[#171D2C] rounded-lg p-[10px] flex flex-col gap-2">
      <div className="w-full p-1 flex justify-between items-center">
        <div className="flex justify-space">
          <span className="text-[20px] text-white bg-blue-500 rounded-lg p-1 ">фин</span>
          <span className="text-[20px] text-white p-1">Контроль</span>
        </div>
        <div>
          <Button className='bg-[#283147] text-[15px] text-[#525D7B] rounded-lg p-1' type="text" icon={<span>X</span>} iconPosition='end'>Меню</Button>
        </div>
      </div>
      <PinItem classNames='bg-[#283047]' Icon={<IoSettingsOutline className='text-white'/>} title={'Настройки'} />
      <PinItem classNames='bg-[#283047]' Icon={<FiEdit className='text-white' />} title={'Внесение данных'} />
      <PinItem classNames='bg-[#283047]' Icon={<PiNotepadThin className='text-white' />} title={'Отчеты'} />
      <PinItem classNames='bg-[#283047]' Icon={<PiNotebookDuotone className='text-white' />} title={'База знаний'} />
    </div>
  )
}