import { doc, getDoc } from "firebase/firestore";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { BirthdayImportModal } from "../components/BirthdayImportModal";
import BirthdayList from "../components/BirthdayList";
import { BirthdayToolbar } from "../components/BirthdayToolbar";
import Layout from "../components/Layout";
import ProtectedPage from "../components/ProtectedRoute";
import { useAuthState } from "../contexts/AuthContext";
import { IEntry } from "../types/IEntry";
import { db } from "../utils/firebase";
import { uploadBirthdayList } from "../utils/maintainBirthdayList";

export default function ListPage() {
	const { enqueueSnackbar } = useSnackbar();

	const [openModal, setOpenModal] = React.useState(false);

	const [birthdayList, setBirthdayList] = useState<Array<IEntry>>([]);
	const [uploadingList, setUploadingList] = useState<Array<IEntry>>([]);

	const { user } = useAuthState();

	const handleOpen = () => {
		setOpenModal(true);
	};

	const handleClose = () => {
		setOpenModal(false);
	};

	const onFileUpload = (e: any) => {
		e.preventDefault();
		if (e.target.files) {
			const reader = new FileReader();
			let importedList = new Array<IEntry>();
			reader.onload = (e: any) => {
				const data = e.target.result;
				const workbook = XLSX.read(data, { type: "array" });
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];
				importedList = XLSX.utils.sheet_to_json(worksheet);
				console.log(importedList);
				setUploadingList(importedList);
			};
			reader.readAsArrayBuffer(e.target.files[0]);
		}
	};

	const onFileSubmit = (e: any) => {
		e.preventDefault();

		setBirthdayList(uploadingList);

		try {
			uploadBirthdayList(birthdayList, user);
			enqueueSnackbar("Imported list successfully.", { variant: "success" });
		} catch (e: any) {
			enqueueSnackbar(e.message, { variant: "error" });
		}
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

	const exportData = () => {
		try {
			const worksheet = XLSX.utils.json_to_sheet(birthdayList);
			const workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
			XLSX.writeFile(workbook, `BirthdayList-${moment(new Date()).format("MMDDYY")}.xlsx`);
			enqueueSnackbar("Exported list successfully.", { variant: "success" });
		} catch (e: any) {
			enqueueSnackbar(e.message, { variant: "error" });
		}
	};

	useEffect(() => {
		getEventList();
	}, []);

	return (
		<ProtectedPage>
			<Layout currentSite="list">
				<BirthdayImportModal open={openModal} handleClose={handleClose} onFileSubmit={onFileSubmit} onFileUpload={onFileUpload} />
				<BirthdayToolbar title="Birthday List" handleOpen={handleOpen} exportData={exportData} />
				<BirthdayList birthdayList={birthdayList} />
			</Layout>
		</ProtectedPage>
	);
}
