'use client'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TbBellRinging2Filled } from 'react-icons/tb'
import Button from '../button'

interface ModalProps {
  children?: React.ReactNode
  size: 'popup' | 'xs' | 'sm' | 'md' | 'lg'
  isOpen: boolean
  onClose: () => void
  className?: string
  blockScrollOnMount?: boolean
  closeOnEsc?: boolean
  closeOnOverlayClick?: boolean
  showCloseButton?: boolean
  type?: 'info' | 'error' | 'confirm' | 'default'
  title?: string
  icon?: React.ReactNode
  confirmText?: string
  onConfirm?: () => void
}

const Modal: React.FC<ModalProps> = ({
  size,
  isOpen,
  children,
  className,
  onClose,
  blockScrollOnMount = true,
  closeOnEsc = false,
  closeOnOverlayClick = false,
  showCloseButton = true,
  type = 'default',
  title,
  icon,
  confirmText,
  onConfirm,
}) => {
  const { t } = useTranslation()

  const baseClasses = `relative transform bg-blue-100 shadow-xl transition-transform duration-300 ease-in-out lg:rounded-xl overflow-hidden`
  const sizeClasses = {
    popup: 'lg:max-w-[500px] lg:min-h-[230px] mx-6',
    xs: 'w-full h-full lg:w-[500px] lg:h-[530px]',
    sm: 'w-full h-full lg:w-[600px] lg:h-[810px]',
    md: 'w-full h-full lg:w-[880px] lg:h-[560px]',
    lg: 'w-full h-full lg:w-[880px] lg:h-[810px]',
  }
  const modalSize = sizeClasses[size]

  useEffect(() => {
    if (blockScrollOnMount && isOpen) {
      document.body.style.overflow = 'hidden'
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEsc) onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, blockScrollOnMount, closeOnEsc, onClose])

  if (!isOpen) return null

  const renderHeader = () => {
    if (!title && !icon) return null
    const headerIcon = icon || (
      <TbBellRinging2Filled className="text-yellow-500" size={40} />
    )
    const headerTitle = title || t('Label_General_Information')
    return (
      <div className="relative flex flex-col items-center justify-center bg-blue-100 p-3">
        <div className="mt-4">{headerIcon}</div>
        <div
          id="modal-title"
          className="mt-3 text-center text-lg font-extrabold"
        >
          {headerTitle}
        </div>
      </div>
    )
  }

  const renderFooter = () => {
    switch (type) {
      case 'confirm':
        return (
          <div className="flex justify-center gap-4 p-4">
            <Button
              className="bg-primary-600 font-bold text-blue-100 hover:bg-red-600"
              onClick={onConfirm}
            >
              {confirmText || t('Label_General_Yes')}
            </Button>
            <Button
              onClick={onClose}
              className="text-black-100 bg-gray-500 font-bold text-gray-700 hover:bg-gray-800 hover:text-gray-100"
            >
              {t('Label_General_No')}
            </Button>
          </div>
        )
      case 'error':
      case 'info':
        return (
          <div className="flex justify-center gap-4 p-4">
            <Button
              className="bg-primary-600 font-bold text-blue-100 hover:bg-red-600"
              onClick={onClose}
            >
              {t('Label_General_Close')}
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div
      className="bg-primary-900/40 fixed inset-0 z-50 flex items-center justify-center"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={() => closeOnOverlayClick && onClose()}
    >
      <div
        className={`${baseClasses} ${modalSize} ${className} flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {renderHeader()}
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 inline-flex items-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        )}
        <div className="flex-grow overflow-y-auto bg-blue-100 px-4 py-3">
          <div className={!title && !icon ? 'mt-8 text-center' : ''}>
            {children}
          </div>
        </div>
        {renderFooter()}
      </div>
    </div>
  )
}

export default Modal
