import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const GlobalToast = () => (
  <ToastContainer
    position="bottom-center"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    pauseOnHover
    draggable
    theme="light"
  />
)
