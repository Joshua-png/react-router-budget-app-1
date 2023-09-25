import { toast } from "react-toastify";
import { expenseDelete, expenseDeleteItem } from "../helpers";
import { redirect } from "react-router-dom";

export default function deleteAction({ params }) {
  try {
    expenseDeleteItem({ key: "budgets", id: params.id });
    expenseDelete({ key: "expenses", value: params.id });
    toast.success(`Budget Deleted`);
  } catch (error) {
    throw new Error("Unable to delete Budget");
  }

  return redirect("/");
}
