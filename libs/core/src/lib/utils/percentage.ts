/**
 *
 * @param proportion : 佔比多少（number）
 * @param total : 總共多少（number）
 * @returns : xx.xx %
 */
export const getProgressPercentage = (proportion: number, total: number) =>
	proportion >= total ? '100' : ((proportion / total) * 100).toFixed(2)
