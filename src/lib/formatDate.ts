export function FormatDate(isoString: string) {
    const date = new Date(isoString);

    return date.toLocaleString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }).replace(',', '');
}