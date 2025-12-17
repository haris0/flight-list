import React, { PropsWithChildren } from 'react';

interface BottomSheetProps {
  title?: string;
  open: boolean;
  onClose?: () => void;
}

const BottomSheet = ({ title, open, onClose, children }: PropsWithChildren<BottomSheetProps>) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black opacity-30"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-md min-h-30 bg-white rounded-t-2xl shadow-lg animate-slideUp z-10"
        onClick={e => e.stopPropagation()}
      >
        <div className={`flex px-5 pt-5 items-center ${title ? 'justify-between' : 'justify-end'}`}>
          {title && <span className='font-semibold'>{title}</span>}
          <button
            className="text-2xl focus:outline-none"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="px-5 pb-5">{children}</div>
      </div>
    </div>
  );
};

export default BottomSheet;
