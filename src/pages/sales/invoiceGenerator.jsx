import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const InvoiceGenerator = ({ invoiceData }) => {
  const [printMode, setPrintMode] = useState(false); // State to track print mode

  const generatePDF = () => {
    const doc = new jsPDF();

    // Set up initial y-coordinate
    let y = 10;

    // Invoice header
    doc.setFontSize(18);
    doc.text('Invoice', 105, y, { align: 'center' });
    y += 10; // Increment y-coordinate
    doc.setFontSize(12);
    doc.text(`Customer Name: ${invoiceData.billingName}`, 10, y);
    y += 10;
    doc.text(`Invoice Number: ${invoiceData.invoiceNumber}`, 10, y);
    y += 10;
    doc.text(`Invoice Date: ${invoiceData.invoiceDate}`, 10, y);
    y += 20;

    // Item list
    doc.setFontSize(14);
    doc.text('Item List', 10, y);
    y += 10;
    doc.autoTable({
      startY: y,
      head: [['Item', 'Quantity', 'Price', 'Total']],
      body: invoiceData.sale.map(item => [item.mainName, item.qty, item.priceUnit, (item.qty * item.priceUnit).toFixed(2)])
    });
    y = doc.lastAutoTable.finalY + 20; // Update y-coordinate

    // Total
    doc.setFontSize(12);
    doc.text(`Total: ₹ ${invoiceData.total}`, 150, y, { align: 'right' });

    // Download mode, save as PDF
    doc.save('invoice.pdf');
  };

  return (
    <div style={{ position: "relative", top: "10%", cursor: "pointer", border: "1px solid red", display: "flex", gap: "50px" }}>
      <button onClick={generatePDF}>Download PDF</button>
      <button onClick={() => setPrintMode(true)}>Print</button>
    </div>
  );
};

export default InvoiceGenerator;
