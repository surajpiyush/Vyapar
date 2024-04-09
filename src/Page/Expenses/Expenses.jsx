import css from "./Expenses.module.css";
import party from "../../assets/Images/party.jpg";
import Item from "./Item";
import Category from "./Category";
import AddExpenses from "./AddExpenses";
import Setting from "../../Component/Setting/Setting";
import Loader3 from "../../Component/Loaders/Loader3";
import CategoryTable from "../../components/TableData/PartiesTable";
//import ExpensesTable from "../../components/TableData/ExpensesCategoryTable";
// import ExpensesItemTable from "../../components/TableData/ExpenseItemTable";

import FirstTimeFormToggle from "../../Component/FirmTimeForm/FirstTimeFormToggle";
import {
  GetAllExpenseCategories,
  GetAllExpenseItems,
} from "../../Redux/expenses/actions";
import {
  CalculatorIcon,
  CloseIcon2,
  CrossIcon,
  SettingsIconOutline2,
} from "../../assets/Icons/ReactIcons";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Expenses = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openForm, setOpenForm] = useState(false);
  const [currPage, setCurrPage] = useState(
    searchParams.get("true") || "CATEGORY"
  );
  const isLoading = useSelector((state) => state.ExpenseReducer.isLoading);
  const categoryData = useSelector(
    (state) => state.ExpenseReducer.categoryData
  );
  const itemsData = useSelector((state) => state.ExpenseReducer.itemsData);
  const toggleAddCategorySuccess = useSelector(
    (state) => state.ExpenseReducer.toggleAddCategorySuccess
  );
  const toggleAddItemSuccess = useSelector(
    (state) => state.ExpenseReducer.toggleAddItemSuccess
  );

  // Fetch All Expense Categories
  useEffect(() => {
    GetAllExpenseCategories(dispatch);
  }, [toggleAddCategorySuccess]);

  // Fetch All Expense Item
  useEffect(() => {
    GetAllExpenseItems(dispatch);
  }, [toggleAddItemSuccess]);

  useEffect(() => {
    setSearchParams({ true: currPage });
  }, [currPage]);

  return (
    <div>
      {/* Form */}
      {openForm && (
        <div className={css.formOuter}>
          <div className={css.upperNav}>
            <div>
              <p className={css.activeForm}>
                <span>Expense #1</span>
                <CrossIcon />
              </p>
            </div>
            <div>
              <CalculatorIcon
                onClick={() =>
                  toast({
                    title: "Feature currently in development",
                    status: "info",
                    position: "top",
                  })
                }
              />
              <SettingsIconOutline2
              // onClick={() => setToggleSetting(true)}
              />
              <CloseIcon2 onClick={() => setOpenForm(false)} />
            </div>
          </div>
          <AddExpenses
            setOpenForm={setOpenForm}
            // date={{ startDate, endDate }}
          />
        </div>
      )}

      {/* Toggle Current Expense Section */}
      <div className={css.navOuter}>
        <div
          className={css.navOptions}
          onClick={() => {
            setCurrPage("CATEGORY");
          }}
          style={{
            borderColor:
              currPage == "CATEGORY" ? "var(--blueB)" : "transparent",
            color:
              currPage == "CATEGORY" ? "var(--DeepBluishGrey)" : "var(--greyG)",
          }}
        >
          CATEGORY
        </div>
        <div
          className={css.navOptions}
          onClick={() => {
            setCurrPage("ITEM");
          }}
          style={{
            borderColor: currPage == "ITEM" ? "var(--blueB)" : "transparent",
            color:
              currPage == "ITEM" ? "var(--DeepBluishGrey)" : "var(--greyG)",
          }}
        >
          ITEM
        </div>
      </div>

      {currPage == "CATEGORY" ? (
        // Category
        <div className={css.Outer}>
          {isLoading ? (
            <Loader3 text="Loading Expense Categories" />
          ) : categoryData.length > 0 ? (
            // <ExpensesTable
            //   func={(val) => {
            //     setOpenForm(val);
            //   }}
            // />
            <Category showAddForm={setOpenForm} />
          ) : (
            <FirstTimeFormToggle
              height="100%"
              img={party}
              onClick={() => setOpenForm(true)}
              BtnText="Add Expense"
              MiddleText="Add your First Expense"
              BelowText="Record your business expenses & know your real profits"
            />
          )}
        </div>
      ) : (
        // CATEGORY
        <div className={css.Outer}>
          {isLoading ? (
            <Loader3 text="Loading Expense Items" />
          ) : itemsData.length > 0 ? (
            // <ExpensesItemTable
            //   func={(val) => {
            //     setOpenForm(val);
            //   }}
            // />
            <Item showAddForm={setOpenForm} />
          ) : (
            <FirstTimeFormToggle
              height="100%"
              img={party}
              onClick={() => setOpenForm(true)}
              BtnText="Add Expense for Item"
              MiddleText="Add your First Expense"
              BelowText="Record your business expenses & know your real profits"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Expenses;
