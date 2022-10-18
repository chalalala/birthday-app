import { useState } from 'react';
import { FormControl, TextField } from '@mui/material';
import FormModal from './commons/FormModal';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import { IEntry } from '../types/IEntry';
import { uploadBirthdayList } from '../utils/maintainBirthdayList';
import { useAuthState } from '../utils/auth';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import { ModalType } from '../types/ModalType';

type Props = {
  open: boolean;
  handleClose: () => void;
  birthdayList: Array<IEntry>;
  setBirthdayList: (list: Array<IEntry>) => void;
  type: ModalType;
  entry?: IEntry;
};

const BirthdayEntryModal = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const { entry, type, open, handleClose, birthdayList, setBirthdayList } =
    props;

  const [fullname, setFullname] = useState(entry?.name ?? '');
  const [contact, setContact] = useState(entry?.contact ?? '');
  const [dob, setDOB] = useState<Date | null>(
    entry ? new Date(entry.dob) : null,
  );

  const { user } = useAuthState();

  const handleSubmit = () => {
    let birthdayObject: IEntry = {
      id: entry ? entry.id : birthdayList.length + 1,
      name: fullname,
      dob: moment(dob).format('MM/DD/YYYY') ?? '',
      contact: contact,
    };

    switch (type) {
      case ModalType.ADD: {
        addEntry(birthdayObject);
        break;
      }
      case ModalType.UPDATE: {
        updateEntry(birthdayObject);
        break;
      }
      default:
        break;
    }
  };

  const addEntry = (addedEntry: any) => {
    let newList = [...birthdayList];
    newList.push(addedEntry);
    setBirthdayList(newList);

    try {
      uploadBirthdayList(newList, user);
      enqueueSnackbar('Imported list successfully.', {
        variant: 'success',
      });
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: 'error' });
    }

    onCloseModal();
  };

  const updateEntry = (addedEntry: any) => {
    let newList = [...birthdayList];

    entry && newList.splice(birthdayList.indexOf(entry), 1, addedEntry);
    setBirthdayList(newList);

    try {
      uploadBirthdayList(newList, user);
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

      <FormControl fullWidth sx={{ mt: 2 }}>
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
