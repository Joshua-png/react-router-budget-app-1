import { redirect, useLoaderData } from "react-router-dom";
import {
  createExpense,
  expenseDelete,
  expenseDeleteItem,
  getAllMachingItems,
} from "../helpers";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import AddExpenseForm from "../components/AddExpenseForm";
import { toast } from "react-toastify";

export const budgetLoader = ({ params }) => {
  const budget = getAllMachingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = getAllMachingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error(`Budget doesnot exist`);
  }

  return { budget, expenses };
};

export const budgetAction = async ({ request }) => {
  const response = await request.formData();
  const { _action, ...values } = Object.fromEntries(response);
  console.log(_action);
  console.log(values);

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });

      return toast.success("Expense Created");
    } catch (error) {
      throw new Error("Unable to create an expense");
    }
  }

  if (_action === "deleteExpense") {
    try {
      expenseDeleteItem({ key: "expenses", id: values.expenseId });
      return toast.success("Expense Deleted");
    } catch (error) {
      throw new Error("Unable to delete Expense");
    }
  }

  if (_action === "deleteBudget") {
    try {
      expenseDeleteItem({ key: "budgets", id: values.budgetId });
      expenseDelete({ key: "expenses", value: values.budgetId });
      toast.success(`Budget Deleted`);
    } catch (error) {
      throw new Error("Unable to delete Budget");
    }
  }

  return redirect("/");
};

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  //   console.log([budget]);
  return (
    <div className="grid-lg" style={{ "--accent": budget.color }}>
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Page
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
        <div className="grid-md">
          {expenses && expenses.length > 0 && (
            <Table expenses={expenses} showBudget={false} />
          )}
        </div>
      </div>
    </div>
  );
};
export default BudgetPage;
