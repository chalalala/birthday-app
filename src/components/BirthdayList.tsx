import React from "react";
import { IconButton, Paper, TableFooter, TablePagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import { entryFields, IEntry } from "../types/IEntry";
import { ModalType } from "../types/ModalType";

interface Props {
	birthdayList: Array<IEntry>;
	hanldeOpenUpdate: Function;
}

export default function BirthdayList(props: Props) {
	const { birthdayList, hanldeOpenUpdate } = props;

	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [page, setPage] = React.useState(0);

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
				return <TableCell key={entry.id}>{moment(new Date(entry[key])).format("DD/MM/YYYY")}</TableCell>;
			}
			default:
				return <TableCell key={entry.id}>{entry[key]}</TableCell>;
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
					{birthdayList.length > 0 &&
						birthdayList
							.slice(rowsPerPage * page, rowsPerPage * page + rowsPerPage)
							.map((entry: IEntry, index: number) => (
								<TableRow key={entry.id}>
									<TableCell>{rowsPerPage * page + index + 1}</TableCell>
									{Object.keys(entryFields).map((key) => {
										return printFieldValue(entry, key);
									})}
									<TableCell size="small">
										<IconButton onClick={() => hanldeOpenUpdate(ModalType.UPDATE, entry)} aria-label="update">
											<EditIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
				</TableBody>

				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
							colSpan={3}
							count={birthdayList.length}
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
