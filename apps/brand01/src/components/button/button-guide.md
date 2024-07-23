# Button 元件

`Button` 元件使用 Tailwind CSS 進行樣式設計。

## Props

| 屬性名稱     | 類型                                                              | 預設值     | 說明                                                   |
| ------------ | ----------------------------------------------------------------- | ---------- | ------------------------------------------------------ |
| `size`       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl'` | `'sm'`     | 指定按鈕的尺寸。                                       |
| `variant`    | `'fill' \| 'gradient' \| 'demo' \| 'disabled'`                    | `'fill'`   | 指定按鈕的樣式變體。                                   |
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
- `4xl`: `min-h-[40px] min-w-[500px]`

| 尺寸  | 適用場景                           | 裝置           |
| ----- | ---------------------------------- | -------------- |
| `sm`  | `deposit`, `withdrawal`            | 適用於所有設備 |
| `md`  | `Submit`, `Cancel`                 | 適用於 h5      |
| `lg`  | `Submit`, `Cancel`                 | 適用於 desktop |
| `xl`  | `Submit`, `Cancel`                 | 適用於所有設備 |
| `2xl` | `Financial-Transactions 的 submit` | 適用於 h5      |
| `3xl` | `login`, `join now`, `confirm`     | 適用於所有設備 |
| `4xl` | `Financial Transaction Submit`     | 適用於 desktop |

顏色變體包括：

- `fill`: 基礎色填充，帶有活動狀態的邊框。
- `gradient`: 漸變背景色。
- `demo`: 帶有白色邊框的背景。
- `disabled`: 灰色背景，無交互效果。

## 用法示例

基本用法：

```jsx
<Button onClick={() => console.log('Clicked!')}>Click Me</Button>
```

使用自定義尺寸和顏色變體：

```jsx
<Button size='lg' variant='gradient'>
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
