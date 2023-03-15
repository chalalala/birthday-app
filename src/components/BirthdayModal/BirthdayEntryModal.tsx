import { useState } from 'react';
import { FormControl, TextField } from '@mui/material';
import FormModal from '../commons/FormModal';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import { ModalType } from 'types/Modal';
import { IEntry } from 'types/IEntry';
import { useBirthdayListContext } from 'contexts/BirthdayListContext';
import { generateId } from 'utils/uid';

type Props = {
  open: boolean;
  handleClose: () => void;
  type: ModalType | undefined;
  entry?: IEntry;
};

const BirthdayEntryModal = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { addEntry, updateEntry } = useBirthdayListContext();
  const { entry, type, open, handleClose } = props;
  const [fullname, setFullname] = useState(entry?.name ?? '');
  const [contact, setContact] = useState(entry?.contact ?? '');
  const [dob, setDOB] = useState<Date | null>(
    entry ? new Date(entry.dob) : null,
  );

  const birthdayObject: IEntry = {
    id: entry ? entry.id : generateId(),
    name: fullname,
    dob: moment(dob).format('MM/DD/YYYY') ?? '',
    contact: contact,
  };

  const handleSubmit = () => {
    switch (type) {
      case ModalType.ADD: {
        return onAddEntry(birthdayObject);
      }
      case ModalType.UPDATE: {
        return onUpdateEntry(birthdayObject);
      }
    }
  };

  const onAddEntry = (addedEntry: any) => {
    try {
      addEntry(addedEntry);
      enqueueSnackbar('Imported list successfully.', {
        variant: 'success',
      });
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: 'error' });
    }

    onCloseModal();
  };

  const onUpdateEntry = (addedEntry: any) => {
    if (!entry) {
      return;
    }

    try {
      updateEntry(entry, addedEntry);
      enqueueSnackbar('Updated entry successfully.', {
        variant: 'success',
      });
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: 'error' });
    }

    onCloseModal();
  };

  const onCloseModal = () => {
    setFullname('');
    setContact('');
    setDOB(null);
    handleClose();
  };

  return (
    <FormModal
      title={`${type} entry`}
      open={open}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    >
      {/* <DialogContentText>To subscribe to this website, please enter your email address here. We will send updates occasionally.</DialogContentText> */}
      <TextField
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        autoFocus
        name="fullname"
        label="Full name"
        type="text"
        margin="normal"
        fullWidth
        variant="outlined"
      />

      <FormControl
        fullWidth
        sx={{ mt: 2 }}
      >
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            label="DOB"
            value={dob}
            onChange={(newValue) => {
              setDOB(newValue);
            }}
            className="form__input"
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>

      <TextField
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        name="contact"
        label="Contact"
        type="text"
        margin="normal"
        fullWidth
        variant="outlined"
      />
    </FormModal>
  );
};

export default BirthdayEntryModal;
