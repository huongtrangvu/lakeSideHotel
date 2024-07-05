import React, { useEffect, useState } from "react";
import { getRoomType } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
	const [roomTypes, setRoomTypes] = useState([""]);
	const [showNewRoomTypeInput, setShowNewRoomTypesInput] = useState(false);
	const [newRoomTypes, setNewRoomTypes] = useState("");
	useEffect(() => {
		getRoomType().then((data) => {
			setRoomTypes(data);
		});
	}, []);
	const handleNewRoomTypeInputChange = (e) => {
		setNewRoomTypes(e.target.value);
	};
	const handleAddNewRoomType = () => {
		if (newRoomTypes !== "") {
			setRoomTypes([...roomTypes, newRoomTypes]);
			setNewRoomTypes("");
			setShowNewRoomTypesInput(false);
		}
	};
	return (
		<>
			{roomTypes.length > 0 && (
				<div>
					<select
						name="roomType"
						id="roomType"
						value={newRoom.roomType}
						onChange={(e) => {
							if (e.target.value === "Add New") {
								setShowNewRoomTypesInput(true);
							} else {
								handleRoomInputChange(e);
							}
						}}
					>
						<option value={""}>select a room type</option>
						<option value={"Add New"}>Add New</option>
						{roomTypes.map((type, index) => (
							<option key={index} value={type}>
								{type}
							</option>
						))}
					</select>
					{showNewRoomTypeInput && (
						<div className="input-group">
							<input
								className="form-control"
								type="text"
								placeholder="Enter a new room type"
								onChange={handleNewRoomTypeInputChange}
							/>
							<button
								className="btn btn-hotel"
								type="button"
								onClick={handleAddNewRoomType}
							>
								Add
							</button>
						</div>
					)}
				</div>
			)}
		</>
	);
};
export default RoomTypeSelector;