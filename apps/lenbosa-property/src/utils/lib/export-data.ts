/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from "xlsx";

type ObjProp = {
  [key: string]: string | number | null | undefined;
};
function flattenObject(obj: ObjProp): string[] {
  const values: string[] = [];

  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      const childValues = flattenObject(obj[key]);
      if (childValues.length > 0) {
        values.push(childValues.join(" "));
      }
    } else {
      values.push(String(obj[key]));
    }
  }

  return values;
}

export function exportToCSV(data: any[], header: string, fileName: string) {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    `${header}\n` +
    data
      .map((row) => {
        if (typeof row === "object" && row !== null) {
          return flattenObject(row).join(",");
        }
        return ""; // Return an empty string if row is not an object
      })
      .join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", fileName + ".csv");
  document.body.appendChild(link);
  link.click();
}

export function exportToExcel(data: any[], header: string, fileName: string) {
  const headersArray = header.split(",");

  // Prepare the worksheet data by combining headers with flattened data
  const worksheetData = [
    headersArray,
    ...data.map((row) => flattenObject(row)),
  ];

  // Create a worksheet and a workbook
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write the workbook to binary string and create a blob for download
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute("download", fileName + ".xlsx");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
