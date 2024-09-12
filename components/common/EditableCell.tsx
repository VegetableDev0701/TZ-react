import { Input } from "antd";
import { useEffect, useState } from "react"
import { FaCheck } from "react-icons/fa6";
interface EditableCellProps {
  title: string;
  onUpdate: (val: string) => void
}
export default function EditableCell(props: EditableCellProps) {
  const [val, setVal] = useState(props.title)
  const [editState, setEditState] = useState(false)
  useEffect(() => {
    setEditState(false)
    setVal(props.title)
  }, [props.title])
  const onConfirmChanges = () => {
    setEditState(false)
    props.onUpdate(val)
  }
  const onChangeTextVal = (e: string) => {
    if ( parseInt(val) == parseInt(e) ) {
      return;
    }
    setVal(e)
  }
  return (
    <>
    {
      editState ? (
        <div className="flex">
          <Input variant="borderless" value={val} onChange={(e) => onChangeTextVal(e.target.value)}/>
          <FaCheck onClick={() => onConfirmChanges()}/>
        </div>
      ) : (<div onDoubleClick={() => setEditState(true)}>{val}</div>)
    }
    </>
  )
}