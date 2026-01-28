export type Expense = {
  id: string;
  name: string;
  amount: number;
  typeId: string;
  date: string; // ISO
};

export type ExpenseType = {
  id: string;
  name: string;
  color: string;
};
