import { useState, React } from 'react';
import { firebaseApp, useAuthState } from '../utils/firebase';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';
import { useSnackbar } from 'notistack';

export default function CsvReader() {
   const { enqueueSnackbar } = useSnackbar();

   const [CSVFile, setCSVFile] = useState();
   const [CSVArray, setCSVArray] = useState([]);

   const { user } = useAuthState();
   const db = getFirestore(firebaseApp);

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
            CSVArray.forEach(entry => saveData(entry));
            enqueueSnackbar('Imported list successfully.', { variant: 'success' });
         }
   
         reader.readAsText(CSVFile);
      }
   }

   const saveData = async (data) => {      
      await setDoc(doc(db, user.email, "birthday-list"), data);
   }

   const processCSV = (str, delim=',') => {
      const headers = str.slice(0, str.indexOf('\n')).split(delim);
      const rows = str.slice(str.indexOf('\n')+1).split('\n');

      const newArray = rows.map(row => {
         const val = row.split(delim);
         const eachObject = headers.reduce((obj, header, i) => {
            if (val[i]) {
               obj[header] = val[i].trim();
               return obj;
            }
         }, {});

         return eachObject;
      }).filter(item => item !== undefined);

      setCSVArray(newArray);
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