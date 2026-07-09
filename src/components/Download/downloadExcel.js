import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

async function saveWorkbook(workbook, filename) {
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(
    new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    filename.endsWith(".xlsx") ? filename : `${filename}.xlsx`
  );
}

function addSheetFromRows(workbook, sheetName, rows, columnKeys) {
  const sheet = workbook.addWorksheet(sheetName);
  if (!rows.length) return sheet;
  const keys = columnKeys ?? Object.keys(rows[0]);
  sheet.columns = keys.map((key) => ({ header: key, key, width: 18 }));
  rows.forEach((row) => sheet.addRow(row));
  return sheet;
}

const downloadExcel = async (
  data,
  filename,
  unit,
  isPieChart,
  bcwy,
  language,
  year
) => {
  const isGeorgian = language === "ge";

  if (!data || !Array.isArray(data) || data.length === 0) {
    console.warn("No valid data provided for Excel download");
    return;
  }

  const yearHeader = isGeorgian ? "წელი" : "Year";
  const nameHeader = isGeorgian ? "დასახელება" : "Name";
  const unitHeader = unit || " ";
  const workbook = new ExcelJS.Workbook();

  if (bcwy) {
    const worksheetData = Object.keys(data[0])
      .filter((key) => key !== "name")
      .map((category) => ({
        [yearHeader]: data[0].name,
        [nameHeader]: category,
        [unitHeader]: data[0][category] ?? " ",
      }));
    addSheetFromRows(workbook, "BarChartData", worksheetData, [
      yearHeader,
      nameHeader,
      unitHeader,
    ]);
    await saveWorkbook(workbook, `${filename}.xlsx`);
    return;
  }

  if (isPieChart) {
    const worksheetData = data.map((item) => ({
      [yearHeader]: year,
      [nameHeader]: item.name,
      [unitHeader]: item.value,
    }));
    addSheetFromRows(workbook, "PieChartData", worksheetData, [
      yearHeader,
      nameHeader,
      unitHeader,
    ]);
    await saveWorkbook(workbook, `${filename}.xlsx`);
    return;
  }

  const headers = Object.keys(data[0]).filter((key) => key !== "year");
  const worksheetData = data.map((item) => {
    const row = { [yearHeader]: item.year };
    headers.forEach((header) => {
      row[header] = item[header];
    });
    return row;
  });
  addSheetFromRows(workbook, "Data", worksheetData, [yearHeader, ...headers]);
  await saveWorkbook(workbook, `${filename}.xlsx`);
};

export default downloadExcel;
