import { useState } from "react";
import { ReactComponent as CloseIcon } from "../../public/svg/close-icon.svg";

interface ToastState {
  message: string;
  status: "warning" | "success" | "error";
}

const Toast = ({ state }: { state: ToastState }) => {
  const [showToast, setShowToast] = useState(true);

  const handleCloseToast = () => setShowToast(false);

  return (
    <section
      className={`${!showToast && "animate-toast"} border-${
        state.status
      } border text-${
        state.status
      } h-16 px-4 flex w-1/5 items-center justify-between rounded-md fixed bottom-3 left-2`}
    >
      <p className="text-base font-roboto-medium">{state.message}</p>

      <button type="button" title="close toast" onClick={handleCloseToast}>
        <CloseIcon />
      </button>
    </section>
  );
};

export default Toast;
