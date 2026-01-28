import { useState } from "react";
import type { Expense } from "../../constants";
import { storage } from "../../storage";
import { uid } from "../../utils";
import "./style.css";

export function ExpenseForm({ onAdd }: { onAdd: (e: Expense) => void }) {
  const types = storage.getTypes();
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [typeId, setTypeId] = useState(types[0].id);

  function submit(e: React.FormEvent) {
    e.preventDefault();

    const expense: Expense = {
      id: uid(),
      amount: Number(amount),
      typeId,
      date: new Date().toISOString(),
      name,
    };

    onAdd(expense);
    setAmount("");
    setName("");
  }

  return (
    <form onSubmit={submit} className="expense-form">
      <input
        type="text"
        name="name"
        placeholder="نام"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="مقدار"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select
        value={typeId}
        onChange={(e) => setTypeId(e.target.value)}
        name="type"
      >
        {types.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      <button>افزودن</button>
    </form>
  );
}
