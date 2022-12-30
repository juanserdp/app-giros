export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
});

export const currencyFormatterWithDecimals = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});