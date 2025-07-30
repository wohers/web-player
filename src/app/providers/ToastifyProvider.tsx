import { ToastContainer } from "react-toastify"

export const ToastifyProvider = () => {
  return <ToastContainer position="top-right" pauseOnFocusLoss pauseOnHover autoClose={5000}/>
}

