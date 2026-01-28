import type { Expense, ExpenseType } from "../constants";

const EXPENSES = "expenses";
const TYPES = "types";

export const storage = {
  getExpenses(): Expense[] {
    return JSON.parse(localStorage.getItem(EXPENSES) || "[]");
  },
  saveExpenses(data: Expense[]) {
    localStorage.setItem(EXPENSES, JSON.stringify(data));
  },

  getTypes(): ExpenseType[] {
    const stored = localStorage.getItem(TYPES);
    if (stored) return JSON.parse(stored);

    const defaults = [
      { id: "other", name: "سایر", color: "#888" },
      { id: "transport", name: "حمل و نقل", color: "#00da41" },
      { id: "food", name: "خورد و خوراک", color: "#ff00b3" },
      { id: "clothes", name: "پوشاک", color: "#00aeff" },
    ];
    localStorage.setItem(TYPES, JSON.stringify(defaults));
    return defaults;
  },

  saveTypes(data: ExpenseType[]) {
    localStorage.setItem(TYPES, JSON.stringify(data));
  },
};
