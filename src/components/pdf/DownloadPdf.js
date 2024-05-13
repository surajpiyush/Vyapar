import React from 'react';
import jsPDF from 'jspdf';
import { PrintIcon2 } from '../../assets/Icons/ReactIcons';

function PDFDownloadButton({ data, fields,title,totalText }) {
    const downloadPDF = () => {
        // Create a new PDF document
        const doc = new jsPDF();

        // Set up PDF document properties
        const pdfWidth = doc.internal.pageSize.getWidth();
        const textWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const textX = (pdfWidth - textWidth) / 2;
        doc.text(title, textX, 10);

        // Filter data based on selected fields
        const filteredData = data.map(obj => {
            const newObj = {};
            fields.forEach(field => {
                newObj[field] = obj[field];
            });
            return newObj;
        });

        // Define table headers
        const headers = fields;
let total=0
        // Define table data


console.log("this sis ",filteredData)

        const tableData = filteredData.map(obj => fields.map(field => obj[field]));
        filteredData.map((sdata)=>{   if(sdata.total){
            total=total+sdata.total
        }else if(sdata.amount){
            total=total+sdata.amount
        }  console.log('qdvwedyed',sdata?.total)});



        // Add a table to the PDF document
        doc.autoTable({
            head: [headers],
            body: tableData,
            startY: 20
        });
console.log("thuis is ",total)
        const totalAmountText =totalText+' INR:'+ total.toFixed(2);
        const totalAmountTextWidth = doc.getStringUnitWidth(totalAmountText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const totalAmountTextX = pdfWidth - totalAmountTextWidth - 20;
        const totalAmountTextY = doc.autoTable.previous.finalY + 10;
        doc.text(totalAmountText, totalAmountTextX, totalAmountTextY);


        // Save the PDF document
        doc.save("data.pdf");
    };

    return (
        <div>
            <button onClick={downloadPDF}><PrintIcon2 style={{fontSize:"30px"}}/></button>
        </div>
    );
}

export default PDFDownloadButton;
