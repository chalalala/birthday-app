import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React from "react";

type Props = {
	open: boolean;
	handleClose: () => void;
};

const AddEntryModal = (props: Props) => {
	const { open, handleClose } = props;

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Subscribe</DialogTitle>
			<DialogContent>
				<DialogContentText>To subscribe to this website, please enter your email address here. We will send updates occasionally.</DialogContentText>
				<TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth variant="standard" />
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleClose}>Save</Button>
			</DialogActions>
		</Dialog>
	);
};
