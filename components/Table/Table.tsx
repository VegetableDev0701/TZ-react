import { Table, TableColumnType } from "antd";
import EditableCell from "../common/EditableCell";
import { forwardRef, useImperativeHandle, useEffect, useState } from "react";
export interface DataType {
  id: number;
  barcode: string;
  product_brand: string;
  product_name: string;
  product_quantity: number;
  price: number;
}

export interface TableFilter {
  barcode: string;
  product_brand: string;
  product_count: string;
  product_name: string;
}
interface TableProps {
  data: DataType[];
  downloadFlag: number;
}

interface SorterResult {
  field?: string;
  order?: "ascend" | "descend" | null;
}
export interface TableComponentRefType {
  downloadCSV: () => void;
  setFilter: (filter: TableFilter) => void;
}
export default forwardRef<TableComponentRefType, TableProps>((props, ref) => {
  const columns: TableColumnType<DataType>[] = [
    {
      title: "id",
      dataIndex: "id",
      sorter: (a: DataType, b: DataType) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
      width: 20
    },
    {
      title: "Баркод",
      dataIndex: "barcode",
      sorter: (a: DataType, b: DataType) =>
        a.barcode.toString().localeCompare(b.barcode.toString()),
      sortDirections: ["descend", "ascend"],
      width: 20
    },
    {
      title: "Артикул",
      dataIndex: "product_name",
      sorter: (a: DataType, b: DataType) =>
        a.product_name.localeCompare(b.product_name),
      sortDirections: ["descend", "ascend"],
      width: 20
    },
    {
      title: "Категория",
      dataIndex: "product_brand",
      sorter: (a: DataType, b: DataType) =>
        a.product_brand.localeCompare(b.product_brand),
      sortDirections: ["descend", "ascend"],
      width: 20
    },
    {
      title: "Размер",
      dataIndex: "price",
      sorter: (a: DataType, b: DataType) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
      render: (text: string, record: DataType, index: number) => {
        return (
          <EditableCell
            title={text}
            onUpdate={(val) => onChangeTableData(record.id, "price", val)}
          />
        );
      },
      width: 20
    },
    {
      title: "Считать",
      dataIndex: "product_quantity",
      sorter: (a: DataType, b: DataType) =>
        a.product_quantity - b.product_quantity,
      sortDirections: ["descend", "ascend"],
      render: (text: string, record: DataType, index: number) => {
        return (
          <EditableCell
            title={text}
            onUpdate={(val) => onChangeTableData(record.id, "product_quantity", val)}
          />
        );
      },
      width: 20
    },
  ];
  const [tableData, setTableData] = useState<DataType[]>(props.data);
  const [originalData, setOriginalData] = useState<DataType[]>(props.data);
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  useEffect(() => {
    setTableData(props.data);
    setOriginalData(props.data)
  }, [props.data]);
  useEffect(() => {
    let count = 0, price=0
    for (let i =0; i<tableData.length; i++) {
      count = count + tableData[i].product_quantity
      price = price + tableData[i].price
    }
    setTotalCount(count)
    setTotalPrice(price)
  }, [tableData]);
  const onChangeTableData = (index: number, field: string, val: string) => {
    const tempData: DataType[] = [
      ...tableData.map((e: DataType, i: number) => {
        if (e.id != index) return e;
        else {
          return {
            ...e,
            price: field == "price" ? parseInt(val) : e.price,
            product_quantity:
              field == "product_quantity" ? parseInt(val) : e.product_quantity,
          };
        }
      }),
    ];
    setTableData([...tempData]);
    setOriginalData([...originalData])
  };
  useEffect(() => {
    if ( props.downloadFlag == 0 ) return;
    onDownloadCSV()
  }, [props.downloadFlag])
  useImperativeHandle(ref, () => ({
    downloadCSV: () => {
      onDownloadCSV()
    },
    setFilter: (filter: TableFilter) => {
      onSetTableFilter(filter)
    }
  }))
  const onSetTableFilter = (filter: TableFilter) => {
    const tempData = originalData.filter((e: DataType) => {
      if (filter.product_name !='' && !e.product_name.includes(filter.product_name)) return false
      if (parseInt(filter.product_count) !=0 && e.product_quantity != parseInt(filter.product_count) ) return false
      if ( filter.product_brand != '' && e.product_brand != filter.product_brand) return false
      if ( filter.barcode != '' && e.barcode != filter.barcode) return false
      return true
    })
    setTableData(tempData)
  }
  const onDownloadCSV = () => {
    const blob = new Blob([JSON.stringify(tableData)],{type: "text/csv;charset=utf-8"})
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.href = url;
    link.setAttribute("download", "data.csv")
    document.body.appendChild(link);
    link.click()
    document.body.removeChild(link);
  }
  const tableFooterRender = () => {
    return (
      <div className="grid grid-cols-6">
        <div className="col-span-4 text-[18px]">итого</div>
        <div className="col-span-1 text-[18px] text-[#287EFF]">{totalPrice}</div>
        <div className="col-span-1 text-[18px] text-[#287EFF]">{totalCount}</div>
      </div>
    )
  }
  return <Table<DataType> columns={columns} dataSource={tableData} pagination={false} scroll={
    {
      scrollToFirstRowOnChange: true,
      y: 400
    }
  } footer={tableFooterRender}/>;
})
