

const onDownloadCSV = (tableData: string) => {
  const blob = new Blob([JSON.stringify(tableData)],{type: "text/csv;charset=utf-8"})
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.href = url;
  link.setAttribute("download", "data.csv")
  document.body.appendChild(link);
  link.click()
  document.body.removeChild(link);
}