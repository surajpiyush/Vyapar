import css from "./Print.module.css";
import RegularPrinter from "./RegularPrinter";
import ThermalPrinter from "./ThermalPrinter";
import { UPDATE_SALE_PRINT_SETTINGS } from "../../../Redux/sales/reducer";
import {
  REGULAR_PRINTER_DATA,
  THERMAL_PRINTER_DATA,
} from "../../../Redux/store";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Print = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [currPrinterType, setCurrPrinterType] = useState("regular");
  const [thermalPrinterData, setThermalPrinterData] = useState(
    JSON.parse(sessionStorage.getItem(THERMAL_PRINTER_DATA)) || {}
  );
  const [regularPrinterData, setRegularPrinterData] = useState(
    JSON.parse(sessionStorage.getItem(REGULAR_PRINTER_DATA)) || {}
  );

  // Storing regular printer data in Session Storage
  useEffect(() => {
    sessionStorage.setItem(
      REGULAR_PRINTER_DATA,
      JSON.stringify(regularPrinterData)
    );
    dispatch(UPDATE_SALE_PRINT_SETTINGS());
  }, [regularPrinterData]);

  // Storing thermal printer data in Session Storage
  useEffect(() => {
    sessionStorage.setItem(
      THERMAL_PRINTER_DATA,
      JSON.stringify(thermalPrinterData)
    );
    dispatch(UPDATE_SALE_PRINT_SETTINGS());
  }, [thermalPrinterData]);

  useEffect(() => {
    return () => {
      toast.closeAll();
      toast({
        title: "Print Preferences Saved!",
        status: "success",
        position: "top",
        duration: 900,
      });
    };
  }, []);

  return (
    <div className={css.Outer}>
      {/* Toggle Printer Type */}
      <div className={css.toggleContDiv}>
        <div
          onClick={() => setCurrPrinterType("regular")}
          className={
            currPrinterType == "regular"
              ? css.currPrinterDiv
              : css.nonCurrPrinterDiv
          }
        >
          REGULAR PRINTER
        </div>
        <div
          onClick={() => setCurrPrinterType("thermal")}
          className={
            currPrinterType == "thermal"
              ? css.currPrinterDiv
              : css.nonCurrPrinterDiv
          }
        >
          THERMAL PRINTER
        </div>
      </div>

      {currPrinterType == "regular" ? (
        <RegularPrinter
          regularPrinterData={regularPrinterData}
          setRegularPrinterData={setRegularPrinterData}
        />
      ) : (
        <ThermalPrinter
          thermalPrinterData={thermalPrinterData}
          setThermalPrinterData={setThermalPrinterData}
        />
      )}
    </div>
  );
};

export default Print;
