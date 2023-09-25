import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher();
  const focusRef = useRef();
  const formRef = useRef();
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    formRef.current.reset();
    focusRef.current.focus();
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New{" "}
        <span className="accent">
          {budgets.length === 1 && `${budgets.map((budget) => budget.name)}`}
        </span>{" "}
        Expense
      </h2>
      <fetcher.Form method="post" ref={formRef} className="grid-sm">
        <>
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              id="newExpense"
              name="newExpense"
              placeholder="eg. Vegetables"
              ref={focusRef}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              id="newExpenseAmount"
              name="newExpenseAmount"
              placeholder="$65.00"
              required
            />
          </div>

          <div className="grid-xs" hidden={budgets.length === 1}>
            <label htmlFor="newExpenseBudget">Budget Category</label>
            <select name="newExpenseBudget" id="newExpenseBudget">
              {budgets
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((budget) => {
                  return (
                    <option key={budget.id} value={budget.id}>
                      {" "}
                      {budget.name}
                    </option>
                  );
                })}
            </select>
          </div>

          <input type="hidden" name="_action" value="createExpense" />
          <button
            type="submit"
            className="btn btn--dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : (
              <span>Add Expense</span>
            )}
          </button>
        </>
      </fetcher.Form>
    </div>
  );
};
export default AddExpenseForm;
