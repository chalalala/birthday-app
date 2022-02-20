import React from 'react'

type Props = {
   title?: string;
   setOpenModal: (state: boolean) => void;
}

export const BirthdayToolbar = (props: Props) => {
   const { title, setOpenModal } = props;
   const justifyClass = title ? "justify-space-between" : "justify-flex-end";

   return (
      <div className={`flex ${justifyClass} birthday-toolbar`}>
         { title && <h1 className="birthday-toolbar__title">{ title }</h1> }
         <div className="flex birthday-toolbar__actions">
            <button onClick={() => setOpenModal(true)} className="text-button">Import</button>
            <button className="primary-button birthday-toolbar__button">Add Entry</button>
         </div>
      </div>
   )
}