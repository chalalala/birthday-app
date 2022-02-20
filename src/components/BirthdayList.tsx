import { Paper, TableFooter, TablePagination } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { doc, getDoc } from 'firebase/firestore';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useAuthState } from "../contexts/AuthContext";
import { IEntry } from '../types/IEntry';
import { db } from '../utils/firebase';

export default function BirthdayList() {
  const { user } = useAuthState();
  const [birthdayList, setBirthdayList] = useState([]);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell size="small">Actions</TableCell>
            </TableRow>
        </TableHead>

        <TableBody>
          { birthdayList.length > 0 && 
            birthdayList.slice(rowsPerPage*page, rowsPerPage*page + rowsPerPage).map((entry: IEntry, index: number) => (
            <TableRow key={entry.name + String(Date.now())}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{entry.name}</TableCell>
              <TableCell>{moment(new Date(entry.dob)).format('DD/MM/YYYY')}</TableCell>
              <TableCell size="small"></TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={birthdayList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
