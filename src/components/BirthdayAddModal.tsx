import React, { useRef, useState } from "react";
import { Box, TextField } from "@mui/material";
import FormModal from "./commons/FormModal";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DatePicker } from "@mui/lab";
import { IEntry } from "../types/IEntry";
import { uploadBirthdayList } from "../utils/maintainBirthdayList";
import { useAuthState } from "../contexts/AuthContext";
import { useSnackbar } from "notistack";
import moment from "moment";

type Props = {
	open: boolean;
	handleClose: () => void;
	birthdayList: Array<IEntry>;
	setBirthdayList: (list: Array<IEntry>) => void;
};

const BirthdayAddModal = (props: Props) => {
	const { enqueueSnackbar } = useSnackbar();

	const { open, handleClose, birthdayList, setBirthdayList } = props;

	const [fullname, setFullname] = useState("");
	const [nickname, setNickname] = useState("");
	const [dob, setDOB] = useState<Date | null>(null);

	const { user } = useAuthState();

	const handleSubmit = () => {
		const newBirthdayObject: IEntry = {
			name: fullname,
			nickname: nickname,
			dob: moment(dob).format("MM/DD/YYYY") ?? "",
		};

		addEntry(newBirthdayObject);
	};

	const addEntry = (addedEntry: any) => {
		let newList = [...birthdayList];
		newList.push(addedEntry);
		setBirthdayList(newList);

		try {
			uploadBirthdayList(newList, user);
			enqueueSnackbar("Imported list successfully.", { variant: "success" });
		} catch (e: any) {
			enqueueSnackbar(e.message, { variant: "error" });
		}

		setFullname("");
		setNickname("");
		setDOB(null);
		handleClose();
	};

	return (
		<FormModal title="Add entry" open={open} handleClose={handleClose} handleSubmit={handleSubmit}>
			{/* <DialogContentText>To subscribe to this website, please enter your email address here. We will send updates occasionally.</DialogContentText> */}
			<TextField value={fullname} onChange={(e) => setFullname(e.target.value)} autoFocus name="fullname" label="Full name" type="text" margin="normal" fullWidth variant="outlined" />
			<TextField value={nickname} onChange={(e) => setNickname(e.target.value)} name="nickname" label="Nick name" type="text" margin="normal" fullWidth variant="outlined" />
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
		</FormModal>
	);
};

export default BirthdayAddModal;
