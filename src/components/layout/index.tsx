import { Link, Outlet } from "react-router-dom";
import "./style.css";

export function Layout() {
  return (
    <div className="layout">
      <main>
        <Outlet />
      </main>

      <nav>
        <Link to="/daily-expense-manager/">امروز</Link>
        <Link to="/daily-expense-manager/monthly">ماه اخیر</Link>
        <Link to="/daily-expense-manager/settings">تنظیمات</Link>
      </nav>
    </div>
  );
}
