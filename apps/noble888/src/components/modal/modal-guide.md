# Modal

## Modal 元件說明

### 簡介

此 `Modal` 可自定義的彈窗組件，適用於多種場景，例如顯示資訊、提示錯誤或進行確認操作。

---

## 屬性說明

### 基本屬性

- `children`: `React.ReactNode` - 彈窗的內容，您可以在這裡傳入自定義的組件或文字。
- `size`: `'popup' | 'xs' | 'sm' | 'md' | 'lg'` - 設定彈窗的大小，例如小尺寸（`xs`）、中尺寸（`md`）等。`popup`是專門給操作或錯誤用的彈窗所用的，會有預設的按鈕。
- `className`: `string` - 用於傳入自定義的 CSS 樣式類別。
- `isOpen`: `boolean` - 控制彈窗是否開啟，必填。
- `onClose`: `() => void` - 彈窗關閉時觸發的回調函數，必填。

### 行為相關屬性

- `blockScrollOnMount`: `boolean` - 是否在彈窗開啟時阻止背景滾動，預設為 `true`。
- `closeOnEsc`: `boolean` - 是否允許按下 `ESC` 鍵來關閉彈窗，預設為 `false`。
- `closeOnOverlayClick`: `boolean` - 是否允許點擊彈窗外的遮罩來關閉，預設為 `false`。
- `showCloseButton`: `boolean` - 是否顯示右上角的關閉按鈕，預設為 `true`。

### 類型相關屬性

- `type`: `'info' | 'error' | 'confirm' | 'default'` - 定義彈窗的類型，例如顯示資訊（`info`）、錯誤（`error`）、確認操作（`confirm`）、預設為`confirm`類型。
- `title`: `string` - 彈窗的標題文字。
- `icon`: `React.ReactNode` - 自定義的圖示，會顯示於標題區塊。

### 確認操作屬性

- `confirmText`: `string` - 確認按鈕的文字，預設為「確認」。
- `onConfirm`: `() => void` - 確認按鈕點擊時的回調函數。
  - 當 `type` 為 `confirm` 時，您可以自定義確認按鈕的行為以及文字內容。例如，顯示「執行」或其他自定義操作。

---

## 使用範例

### Confirm Modal

用於操作確認，帶有 `confirm` 類型的圖示和標題，提供確認與取消按鈕。

```tsx
const { isOpen, onOpen, onClose } = useDisclosure();

<Button onClick={onOpen}>Open Confirm Modal</Button>
      <Modal
				size='popup' // 自訂義尺寸
				type='confirm'
				isOpen={isOpen} // 彈窗是否開啟
				onClose={onClose} // 關閉彈窗行為
				showCloseButton={true} // 是否顯示右上角的關閉按鈕
				confirmText='自定義文字與功能' // 確認按鈕文字
				onConfirm={handleConfirm} // 確認按鈕行為
			>
				{joke}
			</Modal>

在上述範例中，當 `type` 設為 `confirm` 時，可以自定義 `confirmText` 和 `onConfirm`。
例如，可以修改 `confirmText` 為「刪除」或其他操作，並在 `onConfirm` 中實現具體的業務邏輯。

```

### Default Modal

預設樣式的 Modal，無特殊圖示或標題。

```tsx
const { isOpen, onOpen, onClose } = useDisclosure();

<Button onClick={onOpen}>Open Default Modal</Button>
  <Modal size="md" isOpen={isOpen} onClose={onClose}>
    Default Modal Content
  </Modal>
```

### Info Modal

顯示一般訊息，帶有 `info` 類型的圖示和標題。

```tsx
const { isOpen, onOpen, onClose } = useDisclosure();

<Button onClick={onOpen}>Open Info Modal</Button>
  <Modal size="sm" type="info" isOpen={isOpen} onClose={onClose} title="Information">
    This is an info modal.
  </Modal>
```

### Error Modal

顯示錯誤訊息，帶有 `error` 類型的圖示和標題。

```tsx
const { isOpen, onOpen, onClose } = useDisclosure();

<Button onClick={onOpen}>Open Error Modal</Button>
  <Modal size="lg" type="error" isOpen={isOpen} onClose={onClose} title="Error Occurred">
    An unexpected error has occurred.
  </Modal>
```

### Custom Icon and Title Modal

提供自訂圖示和標題，類型可以是 `default` 或其他類型。

```tsx
const { isOpen, onOpen, onClose } = useDisclosure();

<Button onClick={onOpen}>Open Custom Modal</Button>
  <Modal
    size="md"
    isOpen={isOpen}
    onClose={onClose}
    icon={<TbBellRinging2Filled size={50} className="text-green-500" />}
    title="Custom Title"
  >
    內容
  </Modal>
```


