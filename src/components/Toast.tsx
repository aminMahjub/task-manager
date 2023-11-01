interface ToastState {
  message: string;
  status: "warning" | "success" | "error";
}

const Toast = ({ state }: { state: ToastState }) => {
  return (
    <section
      className={`border-${state.status} border text-${state.status} h-16 px-4 flex items-center rounded-md`}
    >
      <p className="text-base font-roboto-medium">{state.message}</p>
    </section>
  );
};

export default Toast;
