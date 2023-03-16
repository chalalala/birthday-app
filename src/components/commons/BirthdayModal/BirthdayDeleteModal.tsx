import React from 'react';
import { DialogContentText } from '@mui/material';
import { IEntry } from 'types/IEntry';
import FormModal from 'components/commons/FormModal';

interface Props {
  open: boolean;
  handleClose: Function;
  handleSubmit: Function;
  entry?: IEntry;
}

export const BirthdayDeleteModal = (props: Props) => {
  const { open, handleClose, handleSubmit, entry } = props;

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
