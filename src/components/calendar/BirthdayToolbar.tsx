import { usePageListContext } from 'contexts/PageListContext';
import React from 'react';
import { ModalType } from 'types/Modal';

type Props = {
  title?: string;
};

export const BirthdayToolbar = (props: Props) => {
  const { title } = props;
  const { onOpen, exportData } = usePageListContext();
  const justifyClass = title ? 'justify-space-between' : 'justify-flex-end';

  return (
    <div className={`flex ${justifyClass} birthday-toolbar`}>
      {title && <h1 className="birthday-toolbar__title">{title}</h1>}
      <div className="flex birthday-toolbar__actions">
        <button
          onClick={() => onOpen(ModalType.IMPORT)}
          className="text-button"
        >
          Import
        </button>
        <button
          onClick={exportData}
          className="text-button"
        >
          Export
        </button>
        <button
          onClick={() => onOpen(ModalType.ADD)}
          className="primary-button birthday-toolbar__button"
        >
          Add Entry
        </button>
      </div>
    </div>
  );
};
