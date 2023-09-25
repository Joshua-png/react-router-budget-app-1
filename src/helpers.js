const generateColor = () => {
  const budgetLength = fetchData("budgets")?.length ?? 0;

  return `${budgetLength * 34} 65% 50%`;
};

export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};

export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    amount: +amount,
    createdAt: Date.now(),
    color: generateColor(),
  };

  const existingBudgets = fetchData("budgets") ?? [];

  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

export const createExpense = ({ name, amount, budgetId }) => {
  const newExpense = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    name,
    amount: +amount,
    budgetId: budgetId,
  };

  const existingExpenses = fetchData("expenses") ?? [];

  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newExpense])
  );
};

export const formatCurrency = (amount) => {
  return amount.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};

export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];

  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) {
      return acc;
    }
    return (acc += expense.amount);
  }, 0);

  return budgetSpent;
};

export const formatPercentage = (amount) => {
  return amount.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const getAllMachingItems = ({ category, key, value }) => {
  const items = fetchData(category) ?? [];
  return items.filter((item) => item[key] === value);
};

export const expenseDeleteItem = ({ key, id }) => {
  const existingItems = fetchData(key);
  // console.log(id);
  if (id) {
    const newData = existingItems.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

export const expenseDelete = ({ key, value }) => {
  const existingItems = fetchData(key);
  if (value) {
    const newData = existingItems.filter((item) => item.budgetId !== value);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};
