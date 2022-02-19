import { useState, React } from 'react';
import { db } from '../utils/firebase';
import { useAuthState } from '../contexts/AuthContext';
import { setDoc, doc } from 'firebase/firestore';
import { useSnackbar } from 'notistack';

export default function CsvReader() {
   const { enqueueSnackbar } = useSnackbar();

   const [CSVFile, setCSVFile] = useState();
   const [birthdayList, setBirthdayList] = useState([]);

   const { user } = useAuthState();

   const onFileUpload = (e) => {
      setCSVFile(e.target.files[0]);
   }

   const onFileSubmit = (evt) => {
      evt.preventDefault();

      const reader = new FileReader();

      if (CSVFile) {
         reader.onload = (e) => {
            const text = e.target.result;
            processCSV(text);
            saveData();
         }
   
         reader.readAsText(CSVFile);
      }
   }

   const processCSV = (str, delim=',') => {
      const headers = str.slice(0, str.indexOf('\n')).split(delim);
      const rows = str.slice(str.indexOf('\n')+1).split('\n');

      const newArray = rows.map(row => {
         const val = row.split(delim);
         const eachObject = headers.reduce((obj, header, i) => {
            if (val[i]) {
               obj[header.trim()] = val[i].trim();
               return obj;
            }
         }, {});

         return eachObject;
      }).filter(item => item !== undefined);

      setBirthdayList(newArray);
   }

   const saveData = async () => {
      if (birthdayList) {
         await setDoc(doc(db, user.email, "birthday-list"), { birthdayList })
         .then(() => {
            enqueueSnackbar('Imported list successfully.', { variant: 'success' });
         })
         .catch((e) => {
            enqueueSnackbar(e.message, { variant: 'error' });
         })
      }
   }

   return (
      <form>
         <input
            type="file"
            accept=".csv"
            onChange={onFileUpload}/>
         <br/>
         <button onClick={onFileSubmit}>Submit</button>
      </form>
   )
}