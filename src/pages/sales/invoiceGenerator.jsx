import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const InvoiceGenerator = ({ invoiceData }) => {
    console.log("Invoice Data in denerator :",invoiceData)
  const [printMode, setPrintMode] = useState(false); // State to track print mode

  const generatePDF = () => {
    const doc = new jsPDF();

    // Invoice header
    doc.text('Invoice', 105, 10, { align: 'center' });
    doc.text(`Customer Name: ${invoiceData.customerName}`, 10, 20);
    doc.text(`Invoice Number: ${invoiceData.invoiceNumber}`, 10, 30);
    doc.text(`Invoice Date: ${invoiceData.invoiceDate}`, 10, 40);

    // Table header
    doc.autoTable({
      startY: 50,
      head: [['Item', 'Price']],
    });

    // Table body
    const itemRows = invoiceData.sale.map((item) => [item.description, item.total]);
    doc.autoTable({
      body: itemRows,
    });

    // Total
    doc.text(`Total: $${invoiceData.total}`, 150, doc.lastAutoTable.finalY + 10, { align: 'right' });

    if (printMode) {
      // Print mode, trigger print dialog
      doc.autoPrint();
      window.open(doc.output('bloburl'), '_blank');
    } else {
      // Download mode, save as PDF
      doc.save('invoice.pdf');
    }
  };

  return (
    <div>
      <button onClick={generatePDF}>Download PDF</button>
      <button onClick={() => setPrintMode(true)}>Print</button>
    </div>
  );
};

export default InvoiceGenerator;
