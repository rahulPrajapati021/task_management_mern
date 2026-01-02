const priorityMap = {
    1: "HIGH",
    2: "MEDIUM",
    3: "LOW"
}
export function priorityString(priority) {
    return priorityMap[priority].toString();
}