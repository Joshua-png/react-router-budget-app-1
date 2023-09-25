import { useLoaderData } from "react-router-dom";
import Table from "../components/Table";
import { expenseDeleteItem, fetchData } from "../helpers";
import { toast } from "react-toastify";

export function expensesLoader() {
  const expenses = fetchData("expenses");
  return expenses;
}

export async function expenseAction({ request }) {
  const response = await request.formData();
  const { _action, ...values } = Object.fromEntries(response);

  if (_action === "deleteExpense") {
    try {
      expenseDeleteItem({ key: "expenses", id: values.expenseId });
      return toast.success("Expense Deleted");
    } catch (error) {
      throw new Error("Unable to delete Expense");
    }
  }
}

const ExpensesPage = () => {
  const expenses = useLoaderData();
  return (
    <>
      <div className="grid-lg">
        <h2>All expenses</h2>
        {expenses && expenses.length > 0 ? (
          <div className="grid-md">
            <h4>
              Recent Expenses <small>({expenses.length} in total)</small>
            </h4>
            <Table expenses={expenses} />
          </div>
        ) : (
          <p>No expenses</p>
        )}
      </div>
    </>
  );
};
export default ExpensesPage;
