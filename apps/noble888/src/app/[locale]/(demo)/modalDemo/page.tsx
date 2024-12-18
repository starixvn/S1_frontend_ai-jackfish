'use client'
import Button from '@noble888/src/components/button'
import { useModalStore } from 'JF-operations'

const ModalPage = () => {
  const { openModal, closeModal } = useModalStore()

  const handleOpen = async () => {
    let joke = '載入中...'
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any')
      const data = await response.json()
      joke = data.type === 'single' ? data.joke : `${data.setup} - ${data.delivery}`
    } catch {
      joke = '無法載入笑話，請稍後再試！'
    }

    openModal({
      type: 'confirm',
      size: 'popup',
      content: '123123',
      confirmText: '自定義文字與功能',
      onConfirm: () => {
        alert('test')
        closeModal()
      }
    })
  }

  return (
    <>
      <Button onClick={handleOpen}>Open Global Modal</Button>
    </>
  )
}

export default ModalPage
