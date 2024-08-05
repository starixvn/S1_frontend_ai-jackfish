/* eslint-disable prefer-destructuring */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
const { extractSheets } = require('spreadsheet-to-json')
const path = require('path')
const fs = require('fs-extra')
const auth = require('../ailab-resources-385807-220772b7ea81.json')
const { SHEET_URL_ID } = require('./sheet')

// * url：https://docs.google.com/spreadsheets/d/1yQNCCdV2UGOGE8-GhM0eOMEoTG23F0JpcR5pf5tTq5E

// * 可吃參數 ex: node sheetSort.js tuk555 common
const args = process.argv.slice(2)

const getContents = data => {
	const contents = {}

	for (const tab in data) {
		const files = [...data[tab]]
		const fileName = `${tab}.json`

		for (const file of files) {
			const content = { ...file }
			const { key: displayKey } = content

			for (const lang in content) {
				if (lang !== 'key') {
					const value = content[lang]
					if (typeof value === 'string' && value.trim() !== '') {
						if (!contents[lang]) {
							contents[lang] = {}
						}
						if (!contents[lang][fileName]) {
							contents[lang][fileName] = {}
						}
						contents[lang][fileName][displayKey] = value
					}
				}
			}
		}
	}

	return contents
}

// * 同步 google sheet 版本，可選指定 tab
extractSheets(
	{
		spreadsheetKey: SHEET_URL_ID,
		// eslint-disable-next-line global-require
		credentials: auth,
		sheetsToExtract: args.length !== 0 ? args : ['tuk555', 'common'],
	},
	(err, data) => {
		if (err) throw err

		const contents = getContents(data)

		for (const lang in contents) {
			const location = `../locales/${lang}`
			// * 建立目錄，確保目錄存在。如果目錄結構不存在，則建立該目錄
			fs.ensureDirSync(path.dirname(path.resolve(__dirname, location, 'test')))

			for (const fileName in contents[lang]) {
				const content = contents[lang][fileName]

				// * 寫入檔案至 './public/locales/${lang}'
				fs.writeJSONSync(path.resolve(__dirname, location, fileName), content, {
					spaces: 2,
				})
			}
		}
	}
)
