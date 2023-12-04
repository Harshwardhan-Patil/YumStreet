export const getTime = (time) => {
    const [hour, minute] = time.split(':', 2).map(num => parseInt(num));
    const period = hour >= 12 ? 'PM' : 'AM';
    const twelveHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;

    const formattedHour = twelveHour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');

    return `${formattedHour}:${formattedMinute} ${period}`;
}