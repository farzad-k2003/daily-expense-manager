export function jalaliMonthKey(date: Date) {
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        year: "numeric",
        month: "numeric",
    }).format(date);
}
