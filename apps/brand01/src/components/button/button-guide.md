# Button 元件

## props

- `size` (`'sm' | 'md' | 'lg' | 'xl' | 'default'`)  
  - **描述**: 指定按鈕在手機上的尺寸。
  - **默認值**: `'default'`

- `desktopSize` (`'sm' | 'md' | 'lg' | 'xl' | 'default'`)
  - **描述**: desktop  指定按鈕在桌機上的尺寸

- `h` (`'sm' | 'md' | 'lg'`)
  - **描述**: 決定按鈕的高度。
  - **默認值**: `'md'`

- `type` (`'primary' | 'secondary' | 'ghost' | 'cancel' | 'disabled'`)
  - **描述**: 設置按鈕的變體樣式。
  - **默認值**: `'primary'`

- `onClick`
  - **描述**: 當按鈕被點擊時調用的回調函數。

- `children`
  - **描述**: 顯示在按鈕內部的內容，通常是文本或圖標。

- `isDisabled` (`boolean`)
  - **描述**: 如果設置為 `true`，按鈕將被禁用。
  - **默認值**: `false`

- `htmlType` (`'button' | 'submit'`)
  - **描述**: 指定按鈕的 HTML 類型。
  - **默認值**: `'button'`

- `className` (`string`)
  - **描述**: 添加到按鈕的額外自定義 CSS 類別名稱。
  - **默認值**: `''` (空字符串)

- `loading` (`boolean`)
  - **描述**: 判斷是否有loading狀態。
  - **默認值**: `false` (空字符串)

## CSS 描述

### 寬度類別

- `default`: 沒有應用最小寬度。
- `sm`: 寬度為 94px。
- `md`: 寬度為 147px。
- `lg`: 寬度為 313px。
- `xl`: 全寬。

### 高度類別

- `sm`: 高度為 40px。
- `md`: 高度為 50px。
- `lg`: 高度為 60px。

### 變體類別

- `primary`: 主按鈕樣式，包括懸停和活動狀態。
- `secondary`: 次要按鈕樣式，包括懸停和活動狀態。
- `ghost`: 幽靈按鈕樣式，包括懸停和活動狀態。
- `cancel`: 取消按鈕樣式，包括懸停和活動狀態。
- `disabled`: 禁用的按鈕樣式，非互動性。

## 使用示例

```jsx
<Button type="primary" onClick={() => console.log('Clicked!')}>
  點擊我！
</Button>