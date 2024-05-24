/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs')
const path = require('path')
const { compact, map, flattenDeep } = require('lodash')
const { extractSheets } = require('spreadsheet-to-json')
const { SHEET_URL_ID } = require('./sheet')
const auth = require('../ailab-resources-385807-220772b7ea81.json')

// * 使用遞迴尋找文件
const findFiles = (dir, filePattern, result = []) => {
	const files = fs.readdirSync(dir)

	for (const file of files) {
		const filePath = path.join(dir, file)
		const stat = fs.statSync(filePath)

		if (stat.isDirectory()) {
			// * 如果是資料夾，遞迴尋找
			findFiles(filePath, filePattern, result)
		} else if (file.match(filePattern)) {
			// 如果是以 .js 或 .ts 结尾的文件添加到結果中
			result.push(filePath)
		}
	}

	return result
}

// * 讀取文件內容
const readFileAndCheckForString = filePath => {
	try {
		const fileContent = fs.readFileSync(filePath, 'utf8')

		return fileContent
	} catch (err) {
		console.error(`${filePath}讀取錯誤：`, err)
		return ''
	}
}

// * 只支援單選
const args = process.argv.slice(2)
const site = args[0]
const sheetsToExtract = ['common', site] // * 默認 common + 選擇品牌
const filePattern = /\.(ts|tsx)$/i // * 匹配以 .ts 或 .tsx 结尾的文件

const findUnusedKey = async keys => {
	// * 所有 *.js、*.ts 檔案
	const foundFiles = []
	try {
		// * 讀取 libs 共用元件
		findFiles(`libs/features/src/lib`, filePattern, foundFiles)
		findFiles('libs/web/src', filePattern, foundFiles)
		// * 讀取品牌
		findFiles(`apps/${site}-desktop`, filePattern, foundFiles)
		findFiles(`apps/${site}-h5`, filePattern, foundFiles)
	} catch (error) {
		console.log(`${site} 讀取錯誤：`, error.message)
	}

	// * 將所有內容接在一起
	const contents = foundFiles
		.map(item => readFileAndCheckForString(item))
		.join('')

	// * 找到未用過的翻譯

	const unusedKeys = keys.filter(key => !contents.match(`'${key}'`))

	if (unusedKeys.length === 0) {
		console.log('無未用翻譯')
	} else {
		console.table(unusedKeys)
	}
}

extractSheets(
	{
		spreadsheetKey: SHEET_URL_ID,
		credentials: auth,
		sheetsToExtract,
	},
	(err, data) => {
		if (err) throw err
		const result = flattenDeep(Object.values(data))
		const keys = compact(map(result, item => item.key))
		findUnusedKey(keys)
	}
)
