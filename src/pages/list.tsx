import { doc, getDoc } from 'firebase/firestore'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import * as XLSX from "xlsx"
import { BirthdayImportModal } from '../components/BirthdayImportModal'
import BirthdayList from '../components/BirthdayList'
import { BirthdayToolbar } from '../components/BirthdayToolbar'
import Layout from '../components/Layout'
import ProtectedPage from '../components/ProtectedRoute'
import { useAuthState } from '../contexts/AuthContext'
import { IEntry } from '../types/IEntry'
import { db } from '../utils/firebase'
import { uploadBirthdayList } from '../utils/maintainBirthdayList'

export default function ListPage() {
  const { enqueueSnackbar } = useSnackbar();

  const [openModal, setOpenModal] = React.useState(false);

  const [birthdayList, setBirthdayList] = useState<Array<IEntry>>([]);
  const [uploadingList, setUploadingList] = useState<Array<IEntry>>([]);

  const { user } = useAuthState();

  const onFileUpload = (e: any) => {
     e.preventDefault();
     if (e.target.files) {
        const reader = new FileReader();
        let importedList = new Array<IEntry>();
        reader.onload = (e: any) => {
           const data = e.target.result;
           const workbook = XLSX.read(data, { type: "array" });
           const sheetName = workbook.SheetNames[0];
           const worksheet = workbook.Sheets[sheetName];
           importedList = XLSX.utils.sheet_to_json(worksheet);
           console.log(importedList);
           setUploadingList(importedList);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
     }
  }

  const onFileSubmit = (e: any) => {
    e.preventDefault();

    setBirthdayList(uploadingList);
    
    try {
      uploadBirthdayList(birthdayList, user);
      enqueueSnackbar('Imported list successfully.', { variant: 'success' });
    }
    catch (e: any) {
      enqueueSnackbar(e.message, { variant: 'error' });
    }
  }

  const getEventList = async () => {
		const docRef = doc(db, user.email, "birthday-list");
		const birthdayDoc = await getDoc(docRef);

		if (birthdayDoc.exists()) {
      let data = birthdayDoc.data();
      setBirthdayList(data.birthdayList);
		} else {
			console.log("No data");
		}
  };

  useEffect(() => {
    getEventList();
  }, []);

  return (
      <ProtectedPage>
        <Layout currentSite="list">
          <BirthdayImportModal open={openModal} setOpen={setOpenModal} onFileSubmit={onFileSubmit} onFileUpload={onFileUpload} />
          <BirthdayToolbar title="Birthday List" setOpenModal={setOpenModal} />
          <BirthdayList birthdayList={birthdayList} />
        </Layout>
      </ProtectedPage>
  )
}
