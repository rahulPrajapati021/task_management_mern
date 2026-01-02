export function toISODate(dateString) {
    const date = new Date(dateString).toISOString();
    return date;
}
export function toInputDate(dateString) {
    return dateString.substr(0,10);
}