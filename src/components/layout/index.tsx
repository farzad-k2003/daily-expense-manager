import { Outlet, Link } from "react-router-dom";
import "./style.css";

export function Layout() {
    return (
        <div className="layout">
            <main>
                <Outlet />
            </main>

            <nav>
                <Link to="/">امروز</Link>
                <Link to="/monthly">ماه اخیر</Link>
                <Link to="/settings">تنظیمات</Link>
            </nav>
        </div>
    );
}
