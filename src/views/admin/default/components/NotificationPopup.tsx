import React, { type ReactElement } from 'react';

interface NotificationPopupProps {
   message: string;
   subMessage: string;
   onConfirm: () => Promise<void>;
   onCancel: () => void;
}

function NotificationPopup({ message, subMessage, onConfirm, onCancel }: NotificationPopupProps): ReactElement {
   return (
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
         <div className="border-4 font-bold border-red-500 bg-white p-4 rounded-lg">
            <p className="flex text-lg"><p className='text-red-500 text-xl mr-2'>‼️</p> {message}</p>
            <p className="text-l text-red-500">({subMessage})</p>
            <div className="mt-4 flex justify-end">
               <button
                  onClick={() => {
                     onConfirm().catch(error => {
                        console.error('Error fetching data:', error);
                     });
                  }}>
                  Yes
               </button>
               <button className="ml-2" onClick={onCancel}>
                  No
               </button>
            </div>
         </div>
      </div>
   );
}

export default NotificationPopup;
