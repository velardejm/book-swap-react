import Button from '../Common/Button';

export default function ConfirmationModal({
  setIsModalOpen,
  message,
  confirm,
  cancel,
}) {
  return (
    <div className="bg-slate-900 bg-opacity-80 w-dvw h-dvh absolute top-0 left-0 flex items-center justify-center">
      <div className="bg-green-100 pb-10">
        <div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="block ml-auto mr-4 mt-2"
          >
            x
          </button>
        </div>

        <div className="px-10">
          <p>{message}</p>
          <Button
            label={'Ok'}
            className={'btn bg-blue-400 mx-2'}
            onClick={confirm}
          />

          <Button
            label={'Cancel'}
            className={'btn bg-orange-400 mx-2'}
            onClick={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

// import { useState } from "react";

// export default function Modal({ component: Component, isModalOpen, closeModal, data, setData }) {

//     if (!isModalOpen) {
//     return null;
//   }

//   return (
//     <div
//       id="parent-div"
//       onClick={(e) => {
//         if (e.target.id == 'parent-div') {
//           closeModal();
//         }
//       }}
//       className="bg-slate-900 bg-opacity-80 w-dvw h-dvh absolute top-0 left-0 flex items-center justify-center"
//     >

//       <Component closeModal={closeModal} data={data} setData={setData}/>

//     </div>
//   );
// }