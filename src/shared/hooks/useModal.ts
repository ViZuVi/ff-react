import { useCallback, useState } from 'react'

export const useModal = <T extends string>() => {
    const [activeModal, setActiveModal] = useState<T | null>(null)

    const openModal = useCallback((modal: T) => {
        setActiveModal(modal)
    }, [])

    const closeModal = useCallback(() => {
        setActiveModal(null)
    }, [])

    const isOpen = useCallback(
        (modal: T) => activeModal === modal,
        [activeModal]
    )

    return {
        activeModal,
        openModal,
        closeModal,
        isOpen,
    }
}