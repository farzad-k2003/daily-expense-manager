import { PieChart } from "../../components";
import { storage } from "../../storage";
import { groupByType } from "../../utils";

export function Monthly() {
  const expenses = storage.getExpenses();
  const types = storage.getTypes();
  const pieData = groupByType(expenses, types);

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
