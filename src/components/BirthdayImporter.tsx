import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import * as XLSX from "xlsx";
import { useAuthState } from '../contexts/AuthContext';
import { IEntry } from '../types/IEntry';
import { uploadBirthdayList } from '../utils/maintainBirthdayList';

export default function BirthdayImporter() {
   const { enqueueSnackbar } = useSnackbar();

   const [birthdayList, setBirthdayList] = useState<Array<IEntry>>([]);

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
            setBirthdayList(importedList);
         };
         reader.readAsArrayBuffer(e.target.files[0]);
      }
   }

   const onFileSubmit = (e: any) => {
      e.preventDefault();

      try {
         uploadBirthdayList(birthdayList, user);
         enqueueSnackbar('Imported list successfully.', { variant: 'success' });
      }
      catch (e: any) {
         enqueueSnackbar(e.message, { variant: 'error' });
      }
   }

   return (
      <form>
         <input
            type="file"
            accept=".xlsx"
            onChange={onFileUpload}/>
         <br/>
         <button onClick={onFileSubmit}>Submit</button>
      </form>
   )
}