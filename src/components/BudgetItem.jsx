import { useFetcher, Link } from "react-router-dom";
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../helpers";

const BudgetItem = ({ budget, showDelete = false }) => {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);
  const fetcher = useFetcher();
  // console.log(formatPercentage(spent / amount));
  return (
    <div className="budget" style={{ "--accent": color }}>
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(amount / spent)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)}</small>
        <small>{formatCurrency(amount - spent)}</small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          {/* action="delete" */}
          <fetcher.Form method="post">
            <input type="hidden" name="_action" value="deleteBudget" />
            <input type="hidden" name="budgetId" value={id} />
            <button type="submit" className="btn">
              Delete Budget
            </button>
          </fetcher.Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`budget/${id}`} className="btn">
            View Details
          </Link>
        </div>
      )}
    </div>
  );
};
export default BudgetItem;
