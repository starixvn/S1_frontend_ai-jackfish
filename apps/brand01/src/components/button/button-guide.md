# Button 元件

`Button` 元件使用 Tailwind CSS 進行樣式設計。

## Props

| 屬性名稱     | 類型                                                              | 預設值     | 說明                                                   |
| ------------ | ----------------------------------------------------------------- | ---------- | ------------------------------------------------------ |
| `size`       | `\| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl'` | `'sm'`     | 指定按鈕的尺寸。                                       |
| `type`    | `'primary' \| 'secondary' \|'cancel' \| 'ghost' \| 'disabled'`                    |   | 指定按鈕的樣式變體。                                   |
| `onClick`    | `() => void`                                                      |            | 點擊按鈕時執行的回調函數。                             |
| `children`   | `React.ReactNode`                                                 |            | 按鈕內顯示的內容。                                     |
| `isDisabled` | `boolean`                                                         | `false`    | 是否將按鈕設為禁用狀態。                               |
| `htmlType`   | `'button' \| 'submit'`                                            | `'button'` | 按鈕的 HTML 類型，影響表單行為。                       |
| `fullWidth`  | `boolean`                                                         | `false`    | 是否將按鈕寬度設置為全屏寬度，即 100%。                |
| `className`  | `string`                                                          | `''`       | 提供額外的 Tailwind CSS 類別名稱以自定義按鈕外觀樣式。 |

這個表格包含了所有可用的 props 和它們的預設值，以及每個 prop 的簡短描述，這有助於開發者快速理解和使用這個元件。

## 尺寸和樣式類

每個尺寸都有預設的最小高度和寬度：

- `sm`: `min-h-[40px] min-w-[94px]`
- `md`: `min-h-[40px] min-w-[147px]`
- `lg`: `min-h-[40px] min-w-[199px]`
- `xl`: `min-h-[50px] min-w-[313px]`
- `2xl`: `min-h-[50px] min-w-[348px]`
- `3xl`: `min-h-[50px] min-w-[374px]`
- `4xl`: `min-h-[60px] min-w-[500px]`


| Page                   | Device  | Buttons                          | Size |
|------------------------|---------|----------------------------------|------|
| **BankSlip**           | h5      | Submit, Cancel                   | md   |
|                        | desktop | Submit, Cancel                   | lg   |
| **Header**             | desktop | Deposit, Withdraw                | sm   |
| **Slot: Play Now**     | h5      | Play Now, Demo                   | sm   |
|                        | desktop | Play Now, Demo                   | 3xl  |
| **Financial-Transactions** | h5  | Submit, Cancel                   | 2xl  |
|                        | desktop | Submit, Cancel                   | 4xl  |
| **Login+Register**     | all     | Login, Confirm, Join Now         | 3xl  |
| **Universal-Popup**    | all     | Join Now                         | md   |
| **User-Info**          | h5      | Submit                           | 3xl  |
|                        | desktop | Submit                           | sm   |

顏色變體包括：

- `primary`: 基礎色填充，帶有活動狀態的邊框。
- `secondary`: 基礎色填充，帶有活動狀態的邊框。
- `cancel`: 用於取消。
- `demo`: 用於demo。
- `disabled`: 灰色背景，無交互效果。

## 用法示例

基本用法：

```jsx
<Button onClick={() => console.log('Clicked!')}>Click Me</Button>
```

使用自定義尺寸和顏色變體：

```jsx
<Button size='lg' type='primary'>
	Large Button
</Button>
```

禁用狀態：

```jsx
<Button isDisabled={true}>Disabled Button</Button>
```

全寬按鈕：

```jsx
<Button fullWidth={true}>Full Width Button</Button>
```

新增自定義tailwind css屬性：

```jsx
<Button fullWidth={true} className='mt-2 text-red-200'>
	Full Width Button
</Button>
```

> > demo可去看/btnDemo 頁面
