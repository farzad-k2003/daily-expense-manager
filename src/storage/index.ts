import type { Expense, ExpenseType } from "../constants";

export const EXPENSES_LS_KEY = "expenses";
export const TYPES_LS_KEY = "types";

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    console.warn("Invalid JSON in localStorage");
    return fallback;
  }
}

function isExpense(obj: unknown): obj is Expense {
  if (typeof obj !== "object" || obj === null) return false;

  const e = obj as Expense;

  return (
    typeof e.id === "string" &&
    typeof e.amount === "number" &&
    typeof e.typeId === "string" &&
    typeof e.date === "string"
  );
}

function isExpenseType(obj: unknown): obj is ExpenseType {
  if (typeof obj !== "object" || obj === null) return false;

  const t = obj as ExpenseType;

  return (
    typeof t.id === "string" &&
    typeof t.name === "string" &&
    typeof t.color === "string"
  );
}

export const storage = {
  getExpenses(): Expense[] {
    const raw = localStorage.getItem(EXPENSES_LS_KEY);

    const parsed = safeParse<unknown>(raw, []);

    if (!Array.isArray(parsed)) return [];

    const valid = parsed.filter(isExpense);

    return valid;
  },

  saveExpenses(data: Expense[]) {
    localStorage.setItem(EXPENSES_LS_KEY, JSON.stringify(data));
  },

  getTypes(): ExpenseType[] {
    const defaults: ExpenseType[] = [
      { id: "other", name: "سایر", color: "#888" },
      { id: "transport", name: "حمل و نقل", color: "#00da41" },
      { id: "food", name: "خورد و خوراک", color: "#ff00b3" },
      { id: "clothes", name: "پوشاک", color: "#00aeff" },
    ];

    const raw = localStorage.getItem(TYPES_LS_KEY);

    const parsed = safeParse<unknown>(raw, defaults);

    if (!Array.isArray(parsed)) {
      localStorage.setItem(TYPES_LS_KEY, JSON.stringify(defaults));
      return defaults;
    }

    const valid = parsed.filter(isExpenseType);

    if (valid.length === 0) {
      localStorage.setItem(TYPES_LS_KEY, JSON.stringify(defaults));
      return defaults;
    }

    return valid;
  },

  saveTypes(data: ExpenseType[]) {
    localStorage.setItem(TYPES_LS_KEY, JSON.stringify(data));
  },
};
