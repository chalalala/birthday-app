import { ModalType } from 'types/Modal';
import { BirthdayDeleteModal } from './BirthdayDeleteModal';
import BirthdayEntryModal from './BirthdayEntryModal';
import { BirthdayImportModal } from './BirthdayImportModal';
import { usePageListContext } from 'contexts/PageListContext';

export const BirthdayModal = () => {
  const { modalState, onClose, onFileSubmit, onFileUpload, onDelete } =
    usePageListContext();
  if (!modalState.show) {
    return null;
  }

  switch (modalState.type) {
    case ModalType.IMPORT: {
      return (
        <BirthdayImportModal
          open={modalState.show}
          handleClose={onClose}
          onFileSubmit={onFileSubmit}
          onFileUpload={onFileUpload}
        />
      );
    }
    case ModalType.WARNING: {
      return (
        <BirthdayDeleteModal
          open={modalState.show}
          handleClose={onClose}
          handleSubmit={onDelete}
          entry={modalState.entry}
        />
      );
    }
    default: {
      return (
        <BirthdayEntryModal
          open={modalState.show}
          handleClose={onClose}
          type={modalState.type}
          entry={modalState.entry}
        />
      );
    }
  }
};
