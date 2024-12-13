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
- `closeOnEsc`: `boolean` - 是否允許按下 `ESC` 鍵來關閉彈窗，預設為 `true`。
- `closeOnOverlayClick`: `boolean` - 是否允許點擊彈窗外的遮罩來關閉，預設為 `false`。
- `showCloseButton`: `boolean` - 是否顯示右上角的關閉按鈕，預設為 `true`。

### 類型相關屬性

- `type`: `'info' | 'error' | 'confirm' | 'default'` - 定義彈窗的類型，例如顯示資訊（`info`）、錯誤（`error`）、確認操作（`confirm`）或預設類型。
- `title`: `string` - 彈窗的標題文字。
- `icon`: `React.ReactNode` - 自定義的圖示，會顯示於標題區塊。

### 確認操作屬性

- `confirmText`: `string` - 確認按鈕的文字，預設為「確認」。
- `onConfirm`: `() => void` - 確認按鈕點擊時的回調函數。
  - 當 `type` 為 `confirm` 時，您可以自定義確認按鈕的行為以及文字內容。例如，顯示「執行」或其他自定義操作。

---

## 使用範例

### 開啟基本彈窗

```tsx
import Modal from '路徑/modal';

const App = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>開啟 Modal</button>
      <Modal
        size="md"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        type="info"
        title="範例標題"
      >
        這是一個基本範例。
      </Modal>
    </div>
  );
};
```

### 自定義按鈕和圖示

```tsx
<Modal
  size="lg"
  isOpen={true}
  onClose={() => console.log('Modal 關閉')}
  icon={<TbBellRinging2Filled size={50} className="text-red-500" />}
  confirmText="確定"
  onConfirm={() => alert('操作成功')}
>
  這是自定義的 Modal！
</Modal>
```

### 彈窗確認類型

```tsx
<Modal
  size="sm"
  isOpen={true}
  onClose={() => console.log('Modal 關閉')}
  type="confirm"
  title="確認操作"
  confirmText="執行"
  onConfirm={() => console.log('已確認')}
>
  確定要執行此操作嗎？
</Modal>
```

在上述範例中，當 `type` 設為 `confirm` 時，可以自定義 `confirmText` 和 `onConfirm`。例如，您可以修改 `confirmText` 為「刪除」或其他操作，並在 `onConfirm` 中實現具體的業務邏輯。

---

## 注意事項

1. 當 `isOpen` 設為 `false` 時，彈窗會隱藏。
2. 請務必提供 `onClose` 回調函數，確保可以正確處理彈窗關閉。
3. 當使用 `blockScrollOnMount` 時，注意背景滾動行為可能受到影響。

---

## 補充

此 `Modal` 元件已支持大部分常見場景，並提供了靈活的屬性配置，方便您快速實現需求。
