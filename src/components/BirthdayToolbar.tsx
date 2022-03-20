import React from "react";

type Props = {
	title?: string;
	handleOpen: () => void;
	exportData: () => void;
};

export const BirthdayToolbar = (props: Props) => {
	const { title, handleOpen, exportData } = props;
	const justifyClass = title ? "justify-space-between" : "justify-flex-end";

	return (
		<div className={`flex ${justifyClass} birthday-toolbar`}>
			{title && <h1 className="birthday-toolbar__title">{title}</h1>}
			<div className="flex birthday-toolbar__actions">
				<button onClick={handleOpen} className="text-button">
					Import
				</button>
				<button onClick={exportData} className="text-button">
					Export
				</button>
				<button className="primary-button birthday-toolbar__button">Add Entry</button>
			</div>
		</div>
	);
};
