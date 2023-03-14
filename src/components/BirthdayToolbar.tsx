import React from 'react';

type Props = {
  title?: string;
  handleOpenAdd: () => void;
  handleOpenImport: () => void;
  exportData: () => void;
};

export const BirthdayToolbar = (props: Props) => {
  const { title, handleOpenAdd, handleOpenImport, exportData } = props;
  const justifyClass = title ? 'justify-space-between' : 'justify-flex-end';

  return (
    <div className={`flex ${justifyClass} birthday-toolbar`}>
      {title && <h1 className="birthday-toolbar__title">{title}</h1>}
      <div className="flex birthday-toolbar__actions">
        <button
          onClick={handleOpenImport}
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
          onClick={handleOpenAdd}
          className="primary-button birthday-toolbar__button"
        >
          Add Entry
        </button>
      </div>
    </div>
  );
};
