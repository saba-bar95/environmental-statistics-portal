import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import georgianFont from "/src/assets/fonts/NotoSansGeorgian_ExtraCondensed-Bold.ttf";

const downloadPDF = (
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
    console.warn("No valid data provided for PDF download");
    return;
  }

  const doc = new jsPDF();

  if (isGeorgian) {
    doc.addFont(georgianFont, "NotoSansGeorgian", "normal");
    doc.addFont(georgianFont, "NotoSansGeorgian", "bold");
    doc.setFont("NotoSansGeorgian");
  } else {
    doc.setFont("helvetica");
  }

  const yearHeader = isGeorgian ? "წელი" : "Year";
  const nameHeader = isGeorgian ? "დასახელება" : "Name";
  const unitHeader = unit;

  if (bcwy) {
    const tableHead = [[yearHeader, nameHeader, unitHeader]];
    const tableBody = Object.keys(data[0])
      .filter((key) => key !== "name")
      .map((category) => [
        data[0].name,
        category,
        Number(data[0][category]).toFixed(2),
      ]);

    autoTable(doc, {
      head: tableHead,
      body: tableBody,
      styles: {
        font: isGeorgian ? "NotoSansGeorgian" : "helvetica",
        fontStyle: "normal",
        fontSize: 10,
        cellPadding: 2,
      },
      headStyles: {
        fontStyle: "bold",
        fillColor: [200, 200, 200],
        textColor: [0, 0, 0],
      },
      margin: { top: 20 },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 80 },
      },
    });

    doc.save(`${filename}.pdf`);
    return;
  }

  if (isPieChart) {
    const tableHead = [[yearHeader, nameHeader, unitHeader]];
    const tableBody = data.map((item) => [
      year,
      item.name,
      Number(item.value).toFixed(2),
    ]);

    autoTable(doc, {
      head: tableHead,
      body: tableBody,
      styles: {
        font: isGeorgian ? "NotoSansGeorgian" : "helvetica",
        fontStyle: "normal",
        fontSize: 10,
        cellPadding: 2,
      },
      headStyles: {
        fontStyle: "bold",
        fillColor: [200, 200, 200],
        textColor: [0, 0, 0],
      },
      margin: { top: 20 },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 80 },
      },
    });

    doc.save(`${filename}.pdf`);
    return;
  }

  const headers = Object.keys(data[0]).filter((key) => key !== "year");
  const tableHead = [[yearHeader, ...headers]];
  const tableBody = data.map((item) => {
    const row = [item.year];
    headers.forEach((header) => {
      const value = item[header];
      row.push(typeof value === "number" ? Number(value).toFixed(2) : value);
    });
    return row;
  });

  autoTable(doc, {
    head: tableHead,
    body: tableBody,
    styles: {
      font: isGeorgian ? "NotoSansGeorgian" : "helvetica",
      fontStyle: "normal",
      fontSize: 10,
      cellPadding: 2,
    },
    headStyles: {
      fontStyle: "bold",
      fillColor: [200, 200, 200],
      textColor: [0, 0, 0],
    },
    margin: { top: 20 },
    columnStyles: {
      0: { cellWidth: 30 },
    },
  });

  doc.save(`${filename}.pdf`);
};

export default downloadPDF;
