// Icons
import { GoHomeFill } from "react-icons/go";
import { HiMiniUsers } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import { BiSitemap } from "react-icons/bi";
import { IoCart } from "react-icons/io5";
import { CiMoneyBill } from "react-icons/ci";
import { FaWallet } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoStorefrontSharp } from "react-icons/io5";
import { FaPlus as PlusIcon } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { AiFillTool } from "react-icons/ai";
import {
   MdCelebration,
   MdOutlineWhatsapp,
   MdSettingsBackupRestore,
} from "react-icons/md";

export const SidebarItems = [
   { Icon: <GoHomeFill />, name: "Home" },
   { Icon: <HiMiniUsers />, name: "Parties", extraIcon: <FaPlus /> },
   { Icon: <BiSitemap />, name: "Items", extraIcon: <FaPlus /> },
   {
      Icon: <BiSitemap />,
      name: "Sale",
      extraIcon: <IoIosArrowDown />,
      to: "/invoices",
      purchaseToggle: [
         {
            name: "Sale Invoices",
            Icon: <PlusIcon />,
            navigateurl: "/invoices",
         },
         {
            name: "Estimate/ Quatation",
            Icon: <PlusIcon />,
            navigateurl: "/estimates",
         },
         {
            name: "Payment In",
            Icon: <PlusIcon />,
            navigateurl: "/paymentin",
         },
         { name: "Sale Order", Icon: <PlusIcon />, navigateurl: "/saleorder" },
         {
            name: "Delivery Challan",
            Icon: <PlusIcon />,
            navigateurl: "/deliverychallan",
         },
         {
            name: "Sale Return/ Cr. Note",
            Icon: <PlusIcon />,
            navigateurl: "/salereturn",
         },
      ],
   },
   {
      Icon: <IoCart />,
      name: "Purchase",
      extraIcon: <IoIosArrowDown />,
      to: "/purchasebill",
      purchaseToggle: [
         {
            name: "Purchase Bills",
            Icon: <PlusIcon />,
            navigateurl: "/purchasebill",
         },
         {
            name: "Payment Out",
            Icon: <PlusIcon />,
            navigateurl: "/paymentout",
         },
         {
            name: "Purchase Order",
            Icon: <PlusIcon />,
            navigateurl: "/paymentorder",
         },
         {
            name: "Purchase Return/ Dr. Note",
            Icon: <PlusIcon />,
            navigateurl: "/purchasereturn",
         },
      ],
   },
   { Icon: <CiMoneyBill />, name: "Quick Billing" },
   { Icon: <CiMoneyBill />, name: "Expenses" },
   { Icon: <FaWallet />, name: "Cash & Bank", extraIcon: <IoIosArrowDown /> },
   { Icon: <IoStorefrontSharp />, name: "My Online Store" },
   {
      Icon: <IoStatsChart />,
      name: "Reports",
      extraIcon: <IoIosArrowDown />,
      purchaseToggle: [
         { name: "Sale", Icon: <PlusIcon />, navigateurl: "/salereport" },
         {
            name: "Purchase",
            Icon: <PlusIcon />,
            navigateurl: "/purchasereport",
         },
         {
            name: "Day Book",
            Icon: <PlusIcon />,
            navigateurl: "/daybookreport",
         },
         {
            name: "All Transaction",
            Icon: <PlusIcon />,
            navigateurl: "/alltransactionreport",
         },
         {
            name: "Cash Flow",
            Icon: <PlusIcon />,
            navigateurl: "/cashflowreport",
         },
         { name: "GSTR 1", Icon: <PlusIcon />, navigateurl: "/gstr1report" },
         { name: "GSTR 2", Icon: <PlusIcon />, navigateurl: "/gstr2report" },
         { name: "GSTR 3B", Icon: <PlusIcon />, navigateurl: "/gstr3breport" },
         { name: "GSTR 9", Icon: <PlusIcon />, navigateurl: "/gstr9report" },
         {
            name: "Sale HSN",
            Icon: <PlusIcon />,
            navigateurl: "/salehsnreport",
         },
      ],
   },

   {
      Icon: <MdOutlineWhatsapp />,
      name: "WhatsApp Marketing",
      to: "/marketing",
      extraIcon: <MdCelebration />,
   },

   {
      Icon: <MdSettingsBackupRestore />,
      name: "Backup/Restore",
      extraIcon: <IoIosArrowDown />,
      to: "/setting",
      purchaseToggle: [
         {
            name: "Auto Backup",
            navigateurl: "/",
         },
         {
            name: "Backup To Computer",
            navigateurl: "/",
         },
         {
            name: "Backup To Drive",
            navigateurl: "/",
         },
         {
            name: "Restore Backup",
            navigateurl: "/",
         },
      ],
   },

   {
      Icon: <AiFillTool />,
      name: "Utilities",
      extraIcon: <IoIosArrowDown />,
      to: "/utilities",
      purchaseToggle: [
         {
            name: "Generate Barcode",
            // Icon: <PlusIcon />,
            navigateurl: "/barcode",
         },
         {
            name: "Import Items",
            navigateurl: "/importItems",
         },
         {
            name: "Bulk Update Items",
            navigateurl: "/bulkUpdate",
         },
         { name: "Import From Tally", navigateurl: "/saleorder" },
         {
            name: "Import Parties",
            navigateurl: "/",
         },
         {
            name: "Export To Tally",
            navigateurl: "/",
         },
         {
            name: "Export Items",
            navigateurl: "/",
         },
         {
            name: "Verify My Data",
            navigateurl: "/",
         },
         {
            name: "Recycle Bin",
            navigateurl: "/",
         },
         {
            name: "Close Financial",
            navigateurl: "/",
         },
      ],
   },

   { Icon: <IoMdSettings />, name: "Setting", to: "/setting" },
];
