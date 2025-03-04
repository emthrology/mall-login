import React, { useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import Modal from '../Modal';

export default function Address({ field, placeholder, onChange, label }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleComplete = e => {
    if (onChange) onChange(e.address);
    closeModal();
  };
  return (
    <div className="space-y-1 mb-2">
      {label && (
        <label className=" text-gray-700 text-md font-medium">{label}</label>
      )}
      <div className="flex mb-2">
        <input
          type="text"
          value={field.value}
          placeholder={placeholder}
          readOnly
          className={`w-full py-2 text-gray-700 bg-white border-b border-gray-300 focus:outline-none text-lg `}
        />
        <button
          onClick={e => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
          className="min-w-[70px] bg-black text-white rounded-md"
        >
          검색
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <DaumPostcodeEmbed onComplete={handleComplete} />
      </Modal>
    </div>
  );
}
