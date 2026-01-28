import "./style.css";

import { useState } from "react";
import type { ExpenseType } from "../../constants";
import { storage } from "../../storage";
import { uid } from "../../utils";
import { AddTypeForm } from "./components/addTypeForm";

export function Settings() {
    const [types, setTypes] = useState<ExpenseType[]>(storage.getTypes());
    const expenses = storage.getExpenses();

    function addType(name: string, color: string) {
        const next = [...types, { id: uid(), name, color }];
        storage.saveTypes(next);
        setTypes(next);
    }

    function removeType(id: string) {
        const used = expenses.some(e => e.typeId === id);
        if (used) {
            alert("This type is used by existing expenses.");
            return;
        }

        const next = types.filter(t => t.id !== id);
        storage.saveTypes(next);
        setTypes(next);
    }

    return (
        <section className="settings">
            <h2>نوع هزینه</h2>

            <AddTypeForm onAdd={addType} />

            <ul className="type-list">
                {types.map(type => (
                    <li key={type.id}>
                        <span
                            className="color"
                            style={{ background: type.color }}
                        />
                        <span className="name">{type.name}</span>
                        {type.id !== "other" && (
                            <button onClick={() => removeType(type.id)}>✕</button>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}
