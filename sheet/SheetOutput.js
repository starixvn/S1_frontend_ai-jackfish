/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
const fs = require('fs')
const { outputData, sortData } = require('./sheet')

// * 輸出當前版本，平常不會使用
const outputSheet = async tab => {
	const location = 'public/locales'
	const fileList = fs.readdirSync(location) // ex: ['en','cs']

	let headerRow = ['key', ...fileList] // ex: ['key','en','cs']

	const contents = {}

	fileList.forEach(lang => {
		// * 讀取目前所有檔案
		try {
			const jsonFile = fs.readFileSync(`${location}/${lang}/${tab}.json`)
			const fileData = JSON.parse(jsonFile) || {}

			Object.keys(fileData).forEach(key => {
				const content = fileData[key] || ''

				contents[key] = { ...contents[key], ...{ key, [lang]: content } }
			})
		} catch (error) {
			headerRow = headerRow.filter(val => val !== lang)
		}
	})

	outputData({ tab, headerRow, contents: sortData(contents) })
}

// * 可吃參數 ex: node SheetSort.js nova88 common
const args = process.argv.slice(2)
const tabs = args.length !== 0 ? args : ['common', 'nova88']
tabs.forEach(tab => outputSheet(tab))
