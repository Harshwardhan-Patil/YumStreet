export const formatDate = (date) => {
    const userLanguage = navigator.language || navigator.userLanguage || 'en-IN';
    const dateObject = new Date(date);
    const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return dateObject.toLocaleDateString(userLanguage, options);
}