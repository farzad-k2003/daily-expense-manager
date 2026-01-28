import "./style.css";

import type { Expense } from "../../constants";
import { storage } from "../../storage";

interface Props {
    expenses: (Expense)[];
}

export function ExpenseList({ expenses }: Props) {
    const types = storage.getTypes();
    const typeMap = new Map(types.map(t => [t.id, t]));

    if (expenses.length === 0) {
        return <p className="empty">موردی برای نمایش وجود ندارد</p>;
    }

    return (
        <ul className="expense-list">
            {expenses.map(expense => {
                const type = typeMap.get(expense.typeId);

                return (
                    <li key={expense.id} className="expense-item">
                        <span
                            className="dot"
                            style={{ background: type?.color }}
                        />

                        <div className="info">
                            <span className="type">{expense?.name || "--"} - {type?.name || "Unknown"}</span>
                            <span className="date">
                                {new Date(expense.date).toLocaleDateString("fa-IR")}
                            </span>
                        </div>

                        <span className="amount">
                            {expense.amount.toLocaleString()}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
}
