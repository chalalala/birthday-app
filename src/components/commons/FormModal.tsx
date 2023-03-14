import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React from 'react';

type Props = {
  children: any;
  title: string;
  open: boolean;
  handleClose: () => void;
  submitText?: string;
  customSubmitButtonStyle?: React.CSSProperties;
  handleSubmit: (e: any) => void;
};

const FormModal: React.FC<Props> = ({ submitText = 'Submit', ...props }) => {
  const {
    children,
    title,
    open,
    handleClose,
    handleSubmit,
    customSubmitButtonStyle,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <button
          className="secondary-button"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button
          className="primary-button"
          onClick={handleSubmit}
          style={customSubmitButtonStyle}
        >
          {submitText}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default FormModal;
