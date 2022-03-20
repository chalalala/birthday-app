import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import FormModal from "./commons/FormModal";

interface Props {
	open: boolean;
	handleClose: () => void;
	onFileUpload: (e: any) => void;
	onFileSubmit: (e: any) => void;
}

export const BirthdayImportModal = (props: Props) => {
	const { open, handleClose, onFileUpload, onFileSubmit } = props;

	return (
		<FormModal title="Import list by XLSX" open={open} handleClose={handleClose} handleSubmit={onFileSubmit}>
			<DialogContentText>
				<p>
					The file must include two columns <b>name</b> and <b>dob</b>, written as plain text.
					<br />
					The date must be in format <b>MM/DD/YYYY</b>.
				</p>
				<input type="file" accept=".xlsx" onChange={onFileUpload} />
				<br />
			</DialogContentText>
		</FormModal>
	);
};
