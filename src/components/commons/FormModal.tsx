import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  children: any;
  title: string;
  open: boolean;
  submitText?: string;
  customSubmitButtonStyle?: React.CSSProperties;
  handleClose: () => void;
  handleSubmit: (e: any) => void;
  handleDelete?: () => void;
};

const FormModal: React.FC<Props> = ({ submitText = 'Submit', ...props }) => {
  const {
    children,
    title,
    open,
    handleClose,
    handleSubmit,
    handleDelete,
    customSubmitButtonStyle,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {handleDelete ? (
          <button
            className="error-button"
            onClick={handleDelete}
          >
            Delete
          </button>
        ) : (
          <button
            className="secondary-button"
            onClick={handleClose}
          >
            Cancel
          </button>
        )}
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
