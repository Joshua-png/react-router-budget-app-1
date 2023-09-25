// HELPERS
import { Link, useLoaderData } from "react-router-dom";
import {
  createBudget,
  createExpense,
  expenseDeleteItem,
  fetchData,
} from "../helpers";
import Intro from "../components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// LOADER
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

// ACTION
export async function dashboardAction({ request }) {
  const response = await request.formData();
  const { _action, ...values } = Object.fromEntries(response);

  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome ${localStorage.userName}`);
    } catch (error) {
      throw new Error("Unable to create the account");
    }
  }

  if (_action === "newBudget") {
    try {
      createBudget({ name: values.newBudget, amount: values.newBudgetAmount });
      return toast.success("New Budget Created");
    } catch (error) {
      throw new Error("Unable to create a new Budget");
    }
  }

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Added ${values?.newExpense} Expense`);
    } catch (error) {
      throw new Error("Unable to add new Expense");
    }
  }

  if (_action === "deleteExpense") {
    try {
      expenseDeleteItem({ key: "expenses", id: values.expenseId });
      return toast.success("Expense deleted");
    } catch (error) {
      throw new Error("Error in deleting expense");
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          {" "}
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                  <h2>Existing Budgets</h2>
                  <div className="budgets">
                    {budgets.map((budget) => {
                      return <BudgetItem key={budget.id} budget={budget} />;
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal Budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
          {expenses && expenses.length > 0 ? (
            <div className="grid-md">
              <h2>Existing Expenses</h2>
              <Table
                expenses={expenses
                  .sort((a, b) => b.createdAt - a.createdAt)
                  .slice(0, 8)}
              />
              {expenses.length > 8 && (
                <Link to="/expenses" className="btn btn--dark">
                  View all expenses
                </Link>
              )}
            </div>
          ) : (
            <span>No current expenses</span>
          )}
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};
export default Dashboard;
