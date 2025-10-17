import { create } from 'zustand'

interface ModalOpen {
  isModalOpen: boolean
  setModalOpen: (isOpen: boolean) => void
}
export const storeModalOpen = create<ModalOpen>((set) => ({
  isModalOpen: false,
  setModalOpen: (isOpen) => set(() => ({ isModalOpen: isOpen })),
}))
