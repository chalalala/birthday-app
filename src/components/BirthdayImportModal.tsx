import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

interface Props {
  open: boolean;
  setOpen: (state: boolean) => void;
  onFileUpload: (e: any) => void;
  onFileSubmit: (e: any) => void; 
}

export const BirthdayImportModal = (props: Props) => {
  const { open, setOpen, onFileUpload, onFileSubmit } = props;

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Import list</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <input
              type="file"
              accept=".xlsx"
              onChange={onFileUpload}/>
          <br/>
        </DialogContentText>
        
      </DialogContent>
      <DialogActions>
        <button className="secondary-button" onClick={() => setOpen(false)}>Cancel</button>
        <button className="primary-button" onClick={onFileSubmit}>Submit</button>
      </DialogActions>
    </Dialog>
  )
}