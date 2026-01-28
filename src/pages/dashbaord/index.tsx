import { useState } from "react";
import { storage } from "../../storage";
import { ExpenseForm, ExpenseList } from "../../components";

export function Dashboard() {
    const [expenses, setExpenses] = useState(storage.getExpenses());

    function addExpense(e: any) {
        const next = [...expenses, e];
        storage.saveExpenses(next);
        setExpenses(next);
    }

    const today = new Date().toDateString();
    const todayExpenses = expenses.filter(
        e => new Date(e.date).toDateString() === today
    );

    const total = todayExpenses.reduce((s, e) => s + e.amount, 0);

    return (
        <>
            <h2>امروز</h2>
            <ExpenseForm onAdd={addExpense} />
            <p>کل: {total}</p>
            <ExpenseList expenses={todayExpenses} />
        </>
    );
}
