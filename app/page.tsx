"use client";
import FinControl from "@/components/Sidebar/FinControl";
import TechSupport from "@/components/Sidebar/TechSupport";
import Header from "@/components/Header/Header";
import ContentTable from "@/components/Table/Table";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineEventNote } from "react-icons/md";
import { RiContactsBookUploadFill } from "react-icons/ri";
import { FaFileImport } from "react-icons/fa6";
import { GoFileDirectoryFill } from "react-icons/go";
import { Button, Input, Select } from "antd";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { DataType, TableFilter } from "@/components/Table/Table";
interface CategoryItem {
  value: string;
  label: string; 
}
export default function Home() {
  const fileInputRef = useRef(null);
  const tableRef = useRef(null)
  const [data, setData] = useState<DataType[]>([])
  const [downloadFlag, setDownloadFlag] = useState(0)
  const [barcodeFilter, setBarcodeFilter] = useState('')
  const [productFilter, setProductFilter] = useState('')
  const [countFilter, setCountFilter] = useState(0)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>([])
  const onFileChange = (event: ChangeEventHandler<HTMLInputElement>) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setData(JSON.parse(e.target?.result))
    }
    reader.readAsText(event.target.files[0])
  }
  const onOpenFile = () => {
    if ( fileInputRef && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  useEffect(() => {
    let categories: CategoryItem[] = []
    for ( let i =0; i< data.length; i++) {
      let flag = false;
      for ( let j =0; j<categories.length; j++) {
        if ( data[i].product_brand == categories[j].label ) flag = true
      }
      if ( flag == false) categories.push({
        label: data[i].product_brand,
        value: data[i].product_brand
      })
    }
    setCategoryItems(categories)
  }, [data])
  return (
    <div className="w-full grid grid-cols-5 p-[20px] gap-3">
      <div className="flex flex-col gap-1 col-span-1">
        <FinControl />
        <TechSupport />
        <Button className="bg-[#287EFF] text-white text-[18px] h-[40px] rounded-lg">
          <AiOutlineMessage />
          Связаться с нами
        </Button>
      </div>
      <div className="col-span-4 flex flex-col gap-3">
        <Header />
        <div className="text-[18px] text-[#171D2C] flex gap-4 items-center">
          Остатки сформированы на 01.04.2023г.
          <Button className="bg-[#171D2C] text-[15px] text-white" shape="round">
            <MdOutlineEventNote />
            Инструкцим
          </Button>
        </div>
        <div className="flex gap-2">
          <div className="bg-white rounded-lg p-2 flex gap-2 items-center">
            Баркод
            <Input className="bg-[#F7F8F8] rounded-lg" value={barcodeFilter} onChange={(e) => setBarcodeFilter(e.target.value)}/>
          </div>
          <div className="bg-white rounded-lg p-2 flex gap-2 items-center">
            Артикул
            <Input className="bg-[#F7F8F8] rounded-lg" value={productFilter} onChange={(e) => setProductFilter(e.target.value)}/>
          </div>
          <div className="bg-white rounded-lg p-2 flex gap-2 items-center">
            Размер
            <Input className="bg-[#F7F8F8] rounded-lg" value={countFilter} onChange={(e) => setCountFilter(parseInt(e.target.value))}/>
          </div>
          <div className="bg-white rounded-lg p-2 flex flex-col gap-2 items-center">
            Категория
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={(e: string) => { setCategoryFilter(e)}}
              options={categoryItems}
              className="border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            shape="round"
            className="text-white border-transparent bg-[#287EFF] h-[40px]"
            onClick={() => tableRef.current.setFilter({
              barcode: barcodeFilter,
              product_name: productFilter,
              product_count: countFilter,
              product_brand: categoryFilter
            })}
          >
            Сформировать
          </Button>
          <Button
            shape="round"
            className="text-white border-transparent bg-[#283047] h-[40px]"
          >
            <RiContactsBookUploadFill />
            экспорт
          </Button>
        </div>
        <div className="flex justify-between  border-b border-t border-gray py-2">
          <div className="flex gap-3 text-[15px] ">
            <Button type="text" onClick={() => onOpenFile()}>
              <FaFileImport />
              Загрузить данные из CSV
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={onFileChange}
            />
            <Button type="text" onClick={() => tableRef.current.downloadCSV()}>
              <GoFileDirectoryFill />
              Изменить данные
            </Button>
          </div>
          <div className="border-l pl-3">
            <Button type="text">
              очистить
              <span className="font-bold">X</span>
            </Button>
          </div>
        </div>
        <div>
          <ContentTable data={data} downloadFlag={downloadFlag} ref={tableRef}/>
        </div>
      </div>
    </div>
  );
}
