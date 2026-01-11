import React, { useEffect } from "react";

export default function ToastMessage(props) {
  const show = props.show;
  const message = props.message;
  const type = props.type;
  const onClose = props.onClose;

  useEffect(() => {
    if (!show) return;

    var timer = setTimeout(() => {
      if (onClose) onClose();
    }, 2200);

    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!show) return null;

  var cls = "toast align-items-center text-bg-success border-0 show";
  if (type === "danger") cls = "toast align-items-center text-bg-danger border-0 show";
  if (type === "warning") cls = "toast align-items-center text-bg-warning border-0 show";

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div className={cls} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
}
