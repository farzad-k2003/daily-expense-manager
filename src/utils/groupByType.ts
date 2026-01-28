import type { Expense, ExpenseType } from "../constants";

export function groupByType(
    expenses: Expense[],
    types: ExpenseType[],
) {
    const map = new Map<string, number>();

    expenses.forEach(e => {
        map.set(e.typeId, (map.get(e.typeId) || 0) + e.amount);
    });

    return types
        .filter(t => map.has(t.id))
        .map(t => ({
            label: t.name,
            value: map.get(t.id)!,
            color: t.color,
        }));
}
