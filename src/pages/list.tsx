import React, { useEffect, useState } from 'react';
import Layout from '../components/commons/Layout';
import ProtectedPage from '../components/commons/ProtectedRoute';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import * as XLSX from 'xlsx';
import BirthdayEntryModal from '../components/BirthdayEntryModal';
import { BirthdayImportModal } from '../components/BirthdayImportModal';
import BirthdayList from '../components/BirthdayList';
import { BirthdayToolbar } from '../components/BirthdayToolbar';
import { useAuthState } from '../contexts/AuthContext';
import { IEntry } from '../types/IEntry';
import { ModalType } from '../types/ModalType';
import { uploadBirthdayList } from '../utils/maintainBirthdayList';
import { WarningModal } from '../components/WarningModal';

export default function ListPage() {
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState<{
    show: boolean;
    type: ModalType | undefined;
    entry: IEntry | undefined;
  }>({
    show: true,
    type: undefined,
    entry: undefined,
  });

  const [birthdayList, setBirthdayList] = useState<Array<IEntry>>([]);
  const [uploadingList, setUploadingList] = useState<Array<IEntry>>([]);

  const { user } = useAuthState();

  const handleClose = () => {
    setOpen({ show: false, type: undefined, entry: undefined });
  };

  const handleOpen = (type: ModalType, entry?: IEntry) => {
    setOpen({ show: true, type: type, entry: entry });
  };

  const RenderModal = () => {
    switch (open.type) {
      case ModalType.ADD: {
        return (
          <BirthdayEntryModal
            open={open.show}
            handleClose={handleClose}
            birthdayList={birthdayList}
            setBirthdayList={setBirthdayList}
            type={ModalType.ADD}
          />
        );
      }
      case ModalType.UPDATE: {
        return (
          <BirthdayEntryModal
            open={open.show}
            handleClose={handleClose}
            birthdayList={birthdayList}
            setBirthdayList={setBirthdayList}
            type={ModalType.UPDATE}
            entry={open.entry}
          />
        );
      }
      case ModalType.IMPORT: {
        return (
          <BirthdayImportModal
            open={open.show}
            handleClose={handleClose}
            onFileSubmit={onFileSubmit}
            onFileUpload={onFileUpload}
          />
        );
      }
      case ModalType.WARNING: {
        <BirthdayEntryModal
          open={open.show}
          handleClose={handleClose}
          birthdayList={birthdayList}
          setBirthdayList={setBirthdayList}
          type={ModalType.UPDATE}
          entry={open.entry}
        />;
        return (
          <WarningModal
            open={open.show}
            handleClose={handleClose}
            handleSubmit={handleDelete}
            entry={open.entry}
          />
        );
      }
      default:
        return <></>;
    }
  };

  const onFileUpload = (e: any) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      let importedList = new Array<IEntry>();
      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        importedList = XLSX.utils.sheet_to_json(worksheet);
        console.log(
          '🚀 ~ file: list.tsx ~ line 93 ~ onFileUpload ~ importedList',
          importedList,
        );
        setUploadingList(importedList);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const onFileSubmit = (e: any) => {
    e.preventDefault();

    setBirthdayList(uploadingList);

    try {
      uploadBirthdayList(uploadingList, user);
      enqueueSnackbar('Imported list successfully.', {
        variant: 'success',
      });
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: 'error' });
    }
  };

  const getEventList = async () => {
    const docRef = doc(db, user.email, 'birthday-list');
    const birthdayDoc = await getDoc(docRef);

    if (birthdayDoc.exists()) {
      let data = birthdayDoc.data();
      setBirthdayList(data.birthdayList);
    } else {
      console.log('No data');
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

  const handleDelete = (entry: IEntry) => {
    let newList = birthdayList.filter((item) => item !== entry);
    setBirthdayList(newList);

    try {
      uploadBirthdayList(newList, user);
      enqueueSnackbar('Deleted entry successfully.', {
        variant: 'success',
      });
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: 'error' });
    } finally {
      handleClose();
    }
  };

  useEffect(() => {
    getEventList();
  }, []);

  return (
    <ProtectedPage>
      <Layout currentSite="list">
        <BirthdayToolbar
          title="Birthday List"
          handleOpenAdd={() => handleOpen(ModalType.ADD)}
          handleOpenImport={() => handleOpen(ModalType.IMPORT)}
          exportData={exportData}
        />
        <BirthdayList
          handleOpenUpdate={handleOpen}
          birthdayList={birthdayList}
        />
        {open.show && <RenderModal />}
      </Layout>
    </ProtectedPage>
  );
}
