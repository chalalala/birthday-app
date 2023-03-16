import { ChangeEvent } from 'react';
import { IEntry } from 'types/IEntry';
import { IOpenState, ModalType } from 'types/Modal';
import { BirthdayDeleteModal } from './BirthdayDeleteModal';
import BirthdayEntryModal from './BirthdayEntryModal';
import { BirthdayImportModal } from './BirthdayImportModal';

export interface IBirthdayModal {
  open: IOpenState;
  onOpen: (type: ModalType, entry?: IEntry) => void;
  onClose: () => void;
  onFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onFileSubmit: (e: SubmitEvent) => void;
  onDelete: (entry: IEntry) => void;
  exportData: () => void;
}

export const BirthdayModal = ({
  open,
  onClose,
  onFileSubmit,
  onFileUpload,
  onDelete,
}: IBirthdayModal) => {
  if (!open.show) {
    return null;
  }

  switch (open.type) {
    case ModalType.IMPORT: {
      return (
        <BirthdayImportModal
          open={open.show}
          handleClose={onClose}
          onFileSubmit={onFileSubmit}
          onFileUpload={onFileUpload}
        />
      );
    }
    case ModalType.WARNING: {
      return (
        <BirthdayDeleteModal
          open={open.show}
          handleClose={onClose}
          handleSubmit={onDelete}
          entry={open.entry}
        />
      );
    }
    default: {
      return (
        <BirthdayEntryModal
          open={open.show}
          handleClose={onClose}
          type={open.type}
          entry={open.entry}
        />
      );
    }
  }
};
