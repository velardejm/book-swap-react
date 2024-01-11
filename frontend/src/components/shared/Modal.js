import { useState } from "react";

export default function Modal({ component: Component, isModalOpen, closeModal, setData }) {

  if (!isModalOpen) {
    return null;
  }

  return (
    <div
      id="parent-div"
      onClick={(e) => {
        if (e.target.id == 'parent-div') {
          closeModal();
        }
      }}
      className="bg-slate-900 bg-opacity-80 w-dvw h-dvh absolute top-0 left-0 flex items-center justify-center"
    >

      <Component isModalOpen={isModalOpen} closeModal={closeModal} setData={setData}/>

    </div>
  );
}
