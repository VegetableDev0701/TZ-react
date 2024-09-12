import { ReactNode } from "react";
import { PiCaretDownFill } from "react-icons/pi";
interface PropInterface {
  classNames?: string;
  Icon: ReactNode;
  title: string;
}
export default function PinItem(props: PropInterface) {
  const Icon = () => {
    return props.Icon;
  };
  return (
    <div className={`w-full p-2 ${props.classNames} flex justify-between items-center rounded-lg`}>
      <div className="flex gap-2 items-center">
        <Icon />
        <span className="text-white text-[20px]">{props.title}</span>
      </div>
      <div>
        <PiCaretDownFill className="text-white"/>
      </div>
    </div>
  );
}
