import React, { FC } from 'react';
import { DialogContentText } from '@mui/material';
import { IEntry } from 'types/IEntry';
import FormModal from 'components/commons/FormModal';

interface Props {
  open: boolean;
  entry?: IEntry;
  handleClose: () => void;
  handleSubmit: (entry: IEntry | undefined) => void;
}

export const BirthdayDeleteModal: FC<Props> = ({
  open,
  handleClose,
  handleSubmit,
  entry,
}) => {
  return (
    <FormModal
      title="Delete entry?"
      open={open}
      handleClose={() => handleClose()}
      handleSubmit={() => handleSubmit(entry)}
      submitText="Delete"
      customSubmitButtonStyle={{ backgroundColor: '#EE0B0B' }}
    >
      <DialogContentText>
        Are you sure to delete this entry? This action can't be undo.
      </DialogContentText>
    </FormModal>
  );
};
