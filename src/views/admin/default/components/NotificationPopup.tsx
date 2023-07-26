import React, { ReactElement } from "react";

interface NotificationPopupProps {
  message: string;
  subMessage: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function NotificationPopup({
  message,
  subMessage,
  onConfirm,
  onCancel,
}: NotificationPopupProps): ReactElement {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="border-4 font-bold border-red-500 bg-white p-4 rounded-lg">
        <p className="text-lg">❌ {message}</p>
        <p className="text-l text-red-500">({subMessage})</p>
        <div className="mt-4 flex justify-end">
          <button onClick={onConfirm}>Yes</button>
          <button className="ml-2" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationPopup;
