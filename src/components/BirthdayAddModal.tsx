import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import FormModal from "./commons/FormModal";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DatePicker } from "@mui/lab";

type Props = {
	open: boolean;
	handleClose: () => void;
};

const BirthdayAddModal = (props: Props) => {
	const { open, handleClose } = props;
	const [dob, setDOB] = useState<Date | null>(null);

	return (
		<FormModal title="Add entry" open={open} handleClose={handleClose} handleSubmit={handleClose}>
			{/* <DialogContentText>To subscribe to this website, please enter your email address here. We will send updates occasionally.</DialogContentText> */}
			<form>
				<TextField autoFocus name="fullname" label="Full name" type="text" margin="normal" fullWidth variant="outlined" />
				<TextField name="nickname" label="Nick name" type="text" margin="normal" fullWidth variant="outlined" />
				<Box sx={{ mt: 2 }}>
					<LocalizationProvider dateAdapter={DateAdapter}>
						<DatePicker
							label="DOB"
							value={dob}
							onChange={(newValue) => {
								setDOB(newValue);
							}}
							className="form__input"
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
				</Box>
			</form>
		</FormModal>
	);
};

export default BirthdayAddModal;
