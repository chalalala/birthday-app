import React, { useMemo } from 'react';
import { IconButton, Paper, TableFooter, TablePagination } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { entryFields, IEntry } from 'types/IEntry';
import { ModalType } from 'types/Modal';
import { usePageListContext } from 'contexts/PageListContext';
import { useBirthdayListContext } from 'contexts/BirthdayListContext';
import { useDebounce } from 'hooks/useDebounce';

export default function BirthdayList() {
  const { birthdayList, searchQuery } = useBirthdayListContext();
  const { onOpen } = usePageListContext();
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [page, setPage] = React.useState(0);
  const debouncedSearchTerm = useDebounce<string>(searchQuery);

  const searchResults = useMemo(() => {
    if (!debouncedSearchTerm) {
      return birthdayList;
    }

    return birthdayList.filter((entry) =>
      entry.name.includes(debouncedSearchTerm),
    );
  }, [debouncedSearchTerm, birthdayList]);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const printFieldValue = (entry: any, key: string) => {
    switch (key) {
      case entryFields.dob: {
        return (
          <TableCell key={key + Date.now()}>
            {moment(new Date(entry[key])).format('DD/MM/YYYY')}
          </TableCell>
        );
      }
      default:
        return <TableCell key={key + Date.now()}>{entry[key]}</TableCell>;
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            {Object.values(entryFields).map((field: string) => (
              <TableCell key={field}>{field}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {searchResults.length > 0 &&
            searchResults
              .slice(rowsPerPage * page, rowsPerPage * page + rowsPerPage)
              .map((entry: IEntry, index: number) => (
                <TableRow key={entry.id}>
                  <TableCell>{rowsPerPage * page + index + 1}</TableCell>
                  {Object.keys(entryFields).map((key) => {
                    return printFieldValue(entry, key);
                  })}
                  <TableCell size="small">
                    <IconButton
                      onClick={() => onOpen(ModalType.UPDATE, entry)}
                      aria-label="update"
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      onClick={() => onOpen(ModalType.WARNING, entry)}
                      aria-label="update"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                25,
                { label: '50', value: 50 },
                { label: 'All', value: searchResults.length },
              ]}
              colSpan={3}
              count={searchResults.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              showFirstButton={true}
              showLastButton={true}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
