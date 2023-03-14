import React from 'react';
import { DialogContentText, FormControl } from '@mui/material';
import FormModal from './commons/FormModal';

interface Props {
  open: boolean;
  handleClose: () => void;
  onFileUpload: (e: any) => void;
  onFileSubmit: (e: any) => void;
}

export const BirthdayImportModal = (props: Props) => {
  const { open, handleClose, onFileUpload, onFileSubmit } = props;

  return (
    <FormModal
      title="Import list by XLSX"
      open={open}
      handleClose={handleClose}
      handleSubmit={onFileSubmit}
    >
      <DialogContentText>
        The file must include two columns <b>name</b> and <b>dob</b>, written as
        plain text.
        <br />
        The date must be in format <b>MM/DD/YYYY</b>.
      </DialogContentText>

      <FormControl
        fullWidth
        sx={{ mt: 2 }}
      >
        <input
          type="file"
          accept=".xlsx"
          onChange={(e) => onFileUpload(e)}
        />
      </FormControl>
    </FormModal>
  );
};
