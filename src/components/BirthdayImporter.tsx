import React from 'react';

interface Props {
   onFileUpload: (e: any) => void;
   onFileSubmit: (e: any) => void;   
}

export default function BirthdayImporter(props: Props) {
   const { onFileUpload, onFileSubmit } = props;

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