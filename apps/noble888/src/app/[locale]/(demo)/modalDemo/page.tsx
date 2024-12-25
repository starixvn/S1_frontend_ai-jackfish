'use client'

import { LoginModal } from '@noble888/src/components'
import { Button } from '@noble888/src/components/common'
import { useModalStore } from 'JF-operations'

const TestContent = () => {
	return (
		<div>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis, earum
			nemo ex corrupti minus aliquid cum quo odio, dolorum perspiciatis!
			Voluptatibus, iusto. Labore debitis explicabo sapiente nisi nobis.
			Consequatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
			quis, earum nemo ex corrupti minus aliquid cum quo odio, dolorum
			perspiciatis! Voluptatibus, iusto. Labore debitis explicabo sapiente nisi
			nobis. Consequatur. Lorem ipsum dolor sit amet consectetur adipisicing
			elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo odio,
			dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo
			sapiente nisi nobis. Consequatur. Lorem ipsum dolor sit amet consectetur
			adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo
			odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo
			sapiente nisi nobis. Consequatur. Lorem ipsum dolor sit amet consectetur
			adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo
			odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo
			sapiente nisi nobis. Consequatur. Lorem ipsum dolor sit amet consectetur
			adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo
			odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo
			sapiente nisi nobis. Consequatur. Lorem ipsum dolor sit amet consectetur
			adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo
			odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo
			sapiente nisi nobis. Consequatur. Lorem ipsum dolor sit amet consectetur
			adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo
			odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo
			sapiente nisi nobis. Consequatur. Lorem ipsum dolor sit amet consectetur
			adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo
			odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo
			sapiente nisi nobis. Consequatur. Lorem ipsum dolor sit amet consectetur
			adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo
			odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo
			sapiente nisi nobis. Consequatur. Lorem ipsum dolor sit amet consectetur
			adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo
			odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo
			sapiente nisi nobis. Consequatur. Lorem ipsum dolor sit amet consectetur
			adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo
			odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo
			sapiente nisi nobis. Consequatur. Lorem ipsum dolor sit amet consectetur
			adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo
			odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo
			sapiente nisi nobis. Consequatur. Lorem ipsum dolor sit amet consectetur
			adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo
			odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo
			sapiente nisi nobis. Consequatur. Lorem ipsum dolor sit amet consectetur
			adipisicing elit. Quia quis, earum nemo ex corrupti minus aliquid cum quo
			odio, dolorum perspiciatis! Voluptatibus, iusto. Labore debitis explicabo
			sapiente nisi nobis. Consequatur.
		</div>
	)
}

const ModalPage = () => {
	const { openModal, closeModal } = useModalStore()

	const handleOpen = async () => {
		openModal({
			size: 'xs',
			content: <TestContent />,
			confirmText: '自定義文字與功能',
			onConfirm: () => {
				alert('test')
				closeModal()
			},
		})
	}
	const handleOpenLoginModal = async () => {
		openModal({
			content: <LoginModal />,
		})
	}
	const handleOpenInfoModal = async () => {
		openModal({
			type: 'info',
			content: 'test info',
		})
	}
	const handleOpenErrorModal = async () => {
		openModal({
			type: 'error',
			content: 'test error',
		})
	}
	const handleOpenConfirmModal = async () => {
		openModal({
			type: 'confirm',
			content: 'test confirm',
			onConfirm: () => {
				alert('test')
				closeModal()
			},
		})
	}

	return (
		<>
			<Button onClick={handleOpen}>Open Global Modal</Button>
			<Button onClick={handleOpenLoginModal}>Open Login Modal</Button>
			<Button onClick={handleOpenInfoModal}>Open Info Modal</Button>
			<Button onClick={handleOpenErrorModal}>Open Error Modal</Button>
			<Button onClick={handleOpenConfirmModal}>Open Confirm Modal</Button>
		</>
	)
}

export default ModalPage
