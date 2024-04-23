import moment from 'moment';
import { useSnackbar } from 'notistack';
import {
  ChangeEvent,
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { IEntry } from 'types/IEntry';
import { IModalState, ModalType } from 'types/Modal';
import { useAuthState } from 'utils/auth';
import { uploadBirthdayList } from 'utils/birthdayList';
import { useBirthdayListContext } from './BirthdayListContext';
import * as XLSX from 'xlsx';
import { generateId } from 'utils/uid';

type PageListContextValue = {
  modalState: IModalState;
  onOpen: (type: ModalType, entry?: IEntry) => void;
  onClose: () => void;
  onFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onFileSubmit: (e: SubmitEvent) => void;
  onDelete: (entry: IEntry | undefined) => void;
  exportData: () => void;
};

const PageListContext = createContext<PageListContextValue>({} as never);

export const usePageListContext = () => useContext(PageListContext);

export const PageListContextProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthState();
  const { birthdayList, setBirthdayList } = useBirthdayListContext();
  const [modalState, setModalState] = useState<IModalState>({
    show: false,
    type: undefined,
    entry: undefined,
  });
  const [uploadingList, setUploadingList] = useState<Array<IEntry>>([]);

  const onClose = () => {
    setModalState({ show: false, type: undefined, entry: undefined });
  };

  const onOpen = (type: ModalType, entry?: IEntry) => {
    setModalState({ show: true, type: type, entry: entry });
  };

  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!e.target.files) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const importedList: IEntry[] = XLSX.utils.sheet_to_json(worksheet);
      const entries = importedList.map((item) => {
        if (!item.id) {
          item.id = generateId();
        }

        return item;
      });

      setUploadingList(entries);
    };

    reader.readAsArrayBuffer(e.target.files[0]);
  };

  const onFileSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    setBirthdayList(uploadingList);

    try {
      uploadBirthdayList(uploadingList, user);
      enqueueSnackbar('Imported list successfully.', {
        variant: 'success',
      });
      onClose();
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: 'error' });
    }
  };

  const onDelete = (entry: IEntry | undefined) => {
    if (!entry) {
      return;
    }

    const newList = birthdayList.filter((item) => item.id !== entry.id);
    setBirthdayList(newList);

    try {
      uploadBirthdayList(newList, user);
      enqueueSnackbar('Deleted entry successfully.', {
        variant: 'success',
      });
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: 'error' });
    } finally {
      onClose();
    }
  };

  const exportData = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(birthdayList);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      XLSX.writeFile(
        workbook,
        `BirthdayList-${moment(new Date()).format('MMDDYY')}.xlsx`,
      );

      enqueueSnackbar('Exported list successfully.', {
        variant: 'success',
      });
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: 'error' });
    }
  };

  const contextValue: PageListContextValue = {
    modalState,
    onOpen,
    onClose,
    onFileSubmit,
    onFileUpload,
    onDelete,
    exportData,
  };

  return (
    <PageListContext.Provider value={contextValue}>
      {children}
    </PageListContext.Provider>
  );
};
