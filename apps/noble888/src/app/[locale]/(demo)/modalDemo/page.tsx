'use client'
import Button from '@noble888/src/components/button'
import useModalStore from 'libs/operations/src/lib/modal/store'

const TestContent = () => {
  return <div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo sapiente nisi nobis. Consequatur.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo sapiente nisi nobis. Consequatur.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo sapiente nisi nobis. Consequatur.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo sapiente nisi nobis. Consequatur.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo sapiente nisi nobis. Consequatur.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo sapiente nisi nobis. Consequatur.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo sapiente nisi nobis. Consequatur.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo sapiente nisi nobis. Consequatur.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo sapiente nisi nobis. Consequatur.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo sapiente nisi nobis. Consequatur.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo sapiente nisi nobis. Consequatur.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo sapiente nisi nobis. Consequatur.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo sapiente nisi nobis. Consequatur.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo sapiente nisi nobis. Consequatur.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo sapiente nisi nobis. Consequatur.
  </div>
}

const ModalPage = () => {
  const { openModal, closeModal } = useModalStore()

  const handleOpen = async () => {
    openModal({
      size:'xs',
      content: <TestContent />,
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
