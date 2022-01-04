import { useState, React } from 'react';

export default function CsvReader() {
   const [CSVFile, setCSVFile] = useState();
   const [CSVArray, setCSVArray] = useState([])

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
               obj[header] = val[i].trim();
               return obj;
            }
         }, {});

         return eachObject;
      }).filter(item => item !== undefined);

      setCSVArray(newArray);
      console.log(CSVArray);
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