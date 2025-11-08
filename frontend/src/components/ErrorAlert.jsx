import React, { useEffect, useState } from 'react';

export default function ErrorAlert({ message, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // wait for fade-out before removing
    }, 10000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      onClick={() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }}
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 cursor-pointer transition-all duration-300 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg font-medium">
        {message}
      </div>
    </div>
  );
}
