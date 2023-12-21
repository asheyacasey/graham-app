export const addPercentageToPrice = (price: number, percentage: number) => {
    const percentageAmount = (percentage / 100) * price;
    return percentageAmount;
}