import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

type Props = {
	children: any;
	title: string;
	open: boolean;
	handleClose: () => void;
	submitText?: string;
	handleSubmit: (e: any) => void;
};

const FormModal: React.FC<Props> = ({ submitText = "Save", ...props }) => {
	const { children, open, handleClose, handleSubmit } = props;

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Import list by XLSX</DialogTitle>
			<DialogContent>{children}</DialogContent>
			<DialogActions>
				<button className="secondary-button" onClick={handleClose}>
					Cancel
				</button>
				<button className="primary-button" onClick={handleSubmit}>
					Submit
				</button>
			</DialogActions>
		</Dialog>
	);
};

export default FormModal;
