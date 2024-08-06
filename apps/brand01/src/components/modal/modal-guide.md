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
- `closeOnEsc`: `boolean?` - 是否按下esc的時候關閉彈窗。默認為 `true`。
- `closeOnOverlayClick`- 是否能夠在彈窗外部點擊時，就能夠關閉彈窗 。默認為 `true`。

# `useDisclosure` Hook

## Overview

`useDisclosure` 是一個自定義的 React 鉤子，用於簡化開啟和關閉模態窗口或其他元件的邏輯。它提供了三個主要的接口：`isOpen`、`onOpen` 和 `onClose`。

## Interface `IUseDisclosure`

- `isOpen`: 布林值，當前是否開啟。
- `onClose`: 函數，用於設置 `isOpen` 為 `false`。
- `onOpen`: 函數，用於設置 `isOpen` 為 `true`。

下面是一個使用 `Modal` 組件的範例：

```jsx
const { isOpen, onOpen, onClose } = useDisclosure()
<Modal size='md' isOpen={isOpen} onClose={onclose} closeOnEsc={false} >
	<p>contents</p>
</Modal>
```
