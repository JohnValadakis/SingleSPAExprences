const defaultFormat = {
    weekday: 'short',
    day: 'numeric',
    year: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};

const FormatDate = (date, format) => {
    try {
        date = new Date(date);
        return date.toLocaleString('en-US', (format !== undefined) ? format : defaultFormat);
    } catch (e) {
        return null;
    }
};

export { FormatDate };
