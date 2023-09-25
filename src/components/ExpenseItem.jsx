import { formatCurrency, formatDate, getAllMachingItems } from "../helpers";
import { Link, useFetcher } from "react-router-dom";

const ExpenseItem = ({ expense, showBudget }) => {
  const fetcher = useFetcher();
  const budget = getAllMachingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];
  // console.log(budget);
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDate(expense.createdAt)}</td>
      <td>
        {showBudget && (
          <Link
            to={`/budget/${budget.id}`}
            style={{ "--accent": budget.color }}
          >
            {budget.name}
          </Link>
        )}
      </td>
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn-warning"
            aria-label="Delete Expense"
          >
            Del
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};
export default ExpenseItem;
