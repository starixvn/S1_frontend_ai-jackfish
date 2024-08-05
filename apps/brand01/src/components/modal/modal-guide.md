# Modal

`Modal` 元件說明

## 屬性

該組件接受以下屬性：

- `children`: `React.ReactNode` - 彈窗內容。
- `size`: `'sm' | 'md'` - 彈窗尺寸，可選 `sm` 或 `md`。
- `className`: `string?` - 自定義css。
- `isOpen`: `boolean` - 控制是否打開彈窗。
- `onClose`: `() => void` - 關閉彈窗時時觸發的函數。
- `blockScrollOnMount`: `boolean?` - 是否時在彈窗開啟時阻止滾動。默認為 `false`。

## 使用範例

下面是一個使用 `Modal` 組件的範例：

```jsx
<Modal size='md' isOpen={true} onClose={() => console.log('Modal closed')}>
	<p>contents</p>
</Modal>
```
