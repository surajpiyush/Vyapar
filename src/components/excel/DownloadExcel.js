import React from 'react';
import * as XLSX from 'xlsx';
import { ExcelIconOutline, PrintIcon2 } from '../../assets/Icons/ReactIcons';

function ExcelDownloadButton({ data }) {
    const downloadExcel = () => {
        // Create a new workbook
        const wb = XLSX.utils.book_new();

        // Convert data into worksheet
        const ws = XLSX.utils.json_to_sheet(data);

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // Generate Excel file and create a download link
        XLSX.writeFile(wb, "data.xlsx");
    };

    return (
        <div>
            <button  onClick={downloadExcel}><ExcelIconOutline style={{fontSize:"30px",color:"green"}}/></button>
        </div>
    );
}

export default ExcelDownloadButton;
