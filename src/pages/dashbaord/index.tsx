import { useEffect, useState } from "react";
import { ExpenseForm, ExpenseList } from "../../components";
import type { Expense } from "../../constants";
import { EXPENSES_LS_KEY, storage } from "../../storage";

export function Dashboard() {
  const [expenses, setExpenses] = useState(storage.getExpenses());

  function addExpense(e: Expense) {
    const next = [...expenses, e];
    storage.saveExpenses(next);
    setExpenses(next);
  }

  const today = new Date().toDateString();
  const todayExpenses = expenses.filter(
    (e) => new Date(e.date).toDateString() === today,
  );

  const total = todayExpenses.reduce((s, e) => s + e.amount, 0);

  useEffect(() => {
    function handleStorageChange(e: StorageEvent) {
      console.log({ e });
      if (e.key === EXPENSES_LS_KEY) {
        const updated = storage.getExpenses();
        setExpenses(updated);
      }
    }

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <h2>امروز</h2>
      <ExpenseForm onAdd={addExpense} />
      <p>کل: {total}</p>
      <ExpenseList expenses={todayExpenses} />
    </>
  );
}
