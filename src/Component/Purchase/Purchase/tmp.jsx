import React from "react";

const tmp = () => {
    const [data, setData] = useState({
        type: "Debit Note",
        status: "Pending",
        partyName: "",
        phoneNumber: 1234567890,
        returnNumber: "RN123",
        billNumber: "BILL123",
        billDate: "2024-02-16",
        date: "2024-02-16",
        time: "10:00 AM",
        stateOfSupply: "2024-02-16T00:00:00.000Z",
        priceUnitWithTax: true,
        purchaseOrder: [],
        paymentType: [
           {
              cash: 0,
              cheque: {
                 refreanceNo: "REF123",
                 checkAmount: 150,
              },
              bankDetail: {
                 accountName: "ABC Bank",
                 openingBalance: 5000,
                 asOfDate: "2024-02-16T00:00:00.000Z",
              },
              default: "cheque",
           },
        ],
        addDescription: "Additional description here",
        discount: {
           discountPersent: 2,
           discountAmount: 2,
        },
        tax: {
           tax: "GST",
           taxamount: 10,
        },
        roundOff: 0,
        total: 950,
        advanceAmount: 0,
        balance: 950,
     });
  
     const [formData, setFormData] = useState([
        {
           category: "65c5cfc509b34ca8a0187497",
           itemName: "65d346274b3a635d1031b700",
           itemCode: "001",
           hsnCode: "HSN001",
           serialNo: "SN001",
           description: "Description of item 1",
           batchNo: 1,
           modelNo: 123,
           expDate: "2025-02-16T00:00:00.000Z",
           mfgDate: "2023-02-16T00:00:00.000Z",
           customField: "Custom field 1",
           size: "Large",
           qty: 10,
           unit: "pcs",
           priceUnit: 100,
           discountpersant: 5,
           discountAmount: 5,
           taxPersant: "12%",
           taxAmount: 12,
           amount: 950,
        },
     ]);
  console.log(formData[0])
     // Submit Request Function
     const handleSubmit = (e) => {
        e.preventDefault();
        const purchaseReturnData = {
           ...data,
           priceUnitWithTax: data?.priceUnitWithTax == "true",
           purchaseOrder: [...data.purchaseOrder, formData],
        };
        console.log("data", purchaseReturnData);
  
        dispatch(addPurchaseReturn(purchaseReturnData));
        // addPurchaseBill(dispatch(purchaseBillData))
        setOpenForm(false);
        // PostSalesInvoice(dispatch, toast, data, setOpenForm);
     };
    
   return (
      <div>

      
      </div>
   );
};

export default tmp;
