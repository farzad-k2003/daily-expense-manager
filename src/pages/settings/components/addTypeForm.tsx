import { useState } from "react";

export function AddTypeForm({ onAdd }: { onAdd: (n: string, c: string) => void }) {
    const [name, setName] = useState("");
    const [color, setColor] = useState("#4f8cff");

    function submit(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim()) return;

        onAdd(name.trim(), color);
        setName("");
    }

    return (
        <form className="add-type" onSubmit={submit}>
            <input
                placeholder="نام"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                type="color"
                value={color}
                onChange={e => setColor(e.target.value)}
            />
            <button>افزودن</button>
        </form>
    );
}
