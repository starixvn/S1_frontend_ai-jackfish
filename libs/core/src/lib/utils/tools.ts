import dayjs from 'dayjs'
import { TpMaintainData } from 'JF-api/site/type'
import { find } from 'lodash-es'

export const onWindowOpenProduct = ({
	pathname,
	windowKey,
}: {
	pathname: string
	windowKey: string
}) => {
	if (typeof window !== `undefined`) {
		window
			.open(
				pathname,
				windowKey,
				'toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0',
			)
			?.focus()
	}
}
export const scrollToTop = () => {
	window !== undefined && window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 取得該遊戲是否正在維護
export const getIsTpMaintain = ({
	tpMaintainList,
	tpId,
	tpGameType,
}: {
	tpMaintainList: TpMaintainData[]
	tpId: number | undefined
	tpGameType: number | null | undefined
}): boolean => {
	const tpMaintain = find(tpMaintainList, { tpId })

	const isTpMaintain =
		tpMaintain &&
		(tpMaintain?.tpGameType === 0 || // * 0:代表全部
			tpMaintain?.tpGameType === tpGameType)

	return Boolean(isTpMaintain)
}

/**
 * 判斷f是否處於活動時間
 */
export const isEventPeriod = (period: {
	start: null | string
	end: null | string
}) => {
	const { start, end } = period

	// * 如果只有 start，只判斷是否結束
	if (start && !end) {
		return dayjs().isAfter(dayjs(start))
	}

	// * 如果只有 end，只回傳是否結束
	if (!start && end) {
		return dayjs().isBefore(dayjs(end))
	}

	// * 如果兩者都有，兩個比較值都回傳
	if (start && end) {
		return dayjs().isAfter(dayjs(start)) && dayjs().isBefore(dayjs(end))
	}

	return true
}
