import { useEffect, useState } from "react";
import { PieChart } from "../../components";
import { EXPENSES_LS_KEY, storage } from "../../storage";
import { groupByType } from "../../utils";

export function Monthly() {
  const [expenses, setExpenses] = useState(storage.getExpenses());
  const types = storage.getTypes();
  const pieData = groupByType(expenses, types);

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
      <h2>ماه اخیر</h2>
      {pieData.length ? (
        <>
          <PieChart data={pieData} />

          <ul className="expense-list">
            {pieData.map(({ color, label, value }) => {
              return (
                <li key={label} className="expense-item">
                  <span className="dot" style={{ background: color }} />

                  <div className="info">
                    <span className="type">{label || "Unknown"}</span>
                  </div>

                  <span className="amount">{value.toLocaleString()}</span>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p>موردی برای نمایش وجود ندارد</p>
      )}
    </>
  );
}
