import "./style.css";

export function Text({ children }: { children: React.ReactNode }) {
    return <p className="text">{children}</p>;
}