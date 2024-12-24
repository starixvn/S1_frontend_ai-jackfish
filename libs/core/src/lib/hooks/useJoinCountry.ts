import { useGetCountryList } from 'JF-api/geoIp/client'
import { TCountryListData } from 'JF-api/geoIp/type'
import { useGetIpCountry } from 'JF-api/site/client'

const useJoinCountry = () => {
	const { countryList = [] } = useGetCountryList()
	const { ipCountryData: { code = '' } = {} } = useGetIpCountry()

	// 緊急移除中國市場，不給中國人註冊
	const countrySelectOptions = countryList
		.filter(item => item.code !== 'CN')
		.map((item: TCountryListData) => {
			return {
				value: item.country,
				label: `Label_CountryName_${item.code}`,
			}
		})

	// 根據使用者所在IP，一進畫面先預設該國籍
	const initCountry = countryList.find(
		(item: TCountryListData) => item.code === code,
	)
	const initNationality = initCountry?.country ?? ''

	return { initNationality, countrySelectOptions }
}

export { useJoinCountry }
