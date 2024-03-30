import css from "../../Page/Items/edit.module.css";
import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import emailjs from "emailjs-com";
import InvoicePrint from "../../Component/PrintLayouts/InvoicePrint";
import { useReactToPrint } from "react-to-print";
import { CloseIcon } from "../../assets/Icons/ReactIcons";

const InvoiceGenerator = ({ invoiceData, setConfirmModel }) => {
   const [printMode, setPrintMode] = useState(true);
   let printComponentRef = useRef();
   console.log(invoiceData);

   // Function to generate PDF
   const generatePDF = () => {
      // Create a new jsPDF instance
      const doc = new jsPDF();

      // Get the HTML content of the InvoicePrint component
      const printComponentHTML = printComponentRef.current.innerHTML;

      // Add the HTML content to the PDF
      doc.html(printComponentHTML, {
         callback: () => {
            // Save the PDF
            doc.save("invoice.pdf");
         },
      });
      setConfirmModel(false);
   };

   // Function to handle printing
   const handlePrint = useReactToPrint({
      content: () => printComponentRef.current,
   });

   return (
      <div className={css.Overlay} style={{ zIndex: "5000" }}>
         <div
           
            className={css.OuterEditProfile}
         >
            <div className={css.topNavDiv}>
               <h2> DO YOU WANT YOU TO PRINT THE INVOICE</h2>
               <CloseIcon onClick={() => setConfirmModel(false)} />
            </div>
            <div style={{ display: "flex",margin:"25px", justifyContent:"space-evenly" }}>
               {/* Button to generate PDF */}
               {/* <button onClick={generatePDF}>Download PDF</button> */}

               {/* Button to trigger printing */}
               <button
                  style={{
                    backgroundColor: "var(--ElectricBlue)",
                     padding: "5px 22px",
                     // font-size: 16px;
                     border: "none",
                     color: "white",
                     bordeRadius: "16px",
                     cursor: "pointer",
                     transition: "all 0.15s ease",
                     letterSpacing: "0.5px",
                  }}
                  onClick={handlePrint}
               >
                  YES
               </button>
               <button
                  style={{
                    backgroundColor: "var(--ElectricBlue)",
                     padding: "5px 22px",
                     // font-size: 16px;
                     border: "none",
                     color: "white",
                     bordeRadius: "6px",
                     cursor: "pointer",
                     transition: "all 0.15s ease",
                     letterSpacing: "0.5px",
                  }}
                  onClick={()=>setConfirmModel(false)}
               >
                  NO
               </button>
            </div>
            {/* Hidden div to hold the printable component */}
            <div style={{ display: "none" }}>
               <div ref={printComponentRef}>
                  <InvoicePrint currPrintItem={invoiceData} />
               </div>
            </div>
         </div>
      </div>
   );
};

export default InvoiceGenerator;
