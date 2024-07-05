import React, { useEffect } from "react";
import { useState } from "react";
import { getRoomById, updateRoom } from "../utils/ApiFunctions";
import { Link, useParams } from "react-router-dom";
import RoomTypeSelector from "../common/RoomTypeSelector";
const EditRoom = () => {
	const [room, setRoom] = useState({
		photo: null,
		roomType: "",
		roomPrice: "",
	});
	const [imagePreview, setImagePreview] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const { roomId } = useParams();
	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0];
		setRoom({ ...room, photo: selectedImage });
		setImagePreview(URL.createObjectURL(selectedImage));
		console.log(imagePreview);
	};
	const handleInputChange = (event) => {
		const { name, value } = event.target;

		setRoom({ ...room, [name]: value });
	};
	useEffect(() => {
		const fetchRoom = async () => {
			try {
				const roomData = await getRoomById(roomId);
				setRoom(roomData);
				setImagePreview(`data:image/jpeg;base64,${roomData.photo}`);
				console.log(imagePreview);
			} catch (error) {
				console.error(error);
			}
		};
		fetchRoom();
	}, [roomId]);
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await updateRoom(roomId, room);
			if (response.status === 200) {
				setSuccessMessage("Room update successfully");
				const updatedRoomData = await getRoomById(roomId);
				setRoom(updatedRoomData);
				setImagePreview(`data:image/jpeg;base64,${updatedRoomData.photo}`);
				setErrorMessage("");
			} else {
				setErrorMessage("Error editting room");
			}
		} catch (error) {
			setErrorMessage(error.message);
		}
	};
	return (
		<>
			<section className="container mt-5 mb-5">
				<div className="row justify-content-center">
					<div className="col-md-8 col-lg-6">
						<h2 className="mt-5 mb-2">Add a New Room</h2>
						{successMessage && (
							<div className="alert alert-success fade show">
								{successMessage}
							</div>
						)}
						{errorMessage && (
							<div className="alert alert-danger fade show">{errorMessage}</div>
						)}

						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="roomType" className="form-label">
									Room Type
								</label>
								<div>
									<RoomTypeSelector
										handleRoomInputChange={handleInputChange}
										newRoom={room}
									/>
								</div>
							</div>
							<div className="mb-3">
								<label htmlFor="roomPrice" className="form-label">
									Room Price
								</label>
								<input
									className="form-control"
									required
									id="roomPrice"
									type="number"
									name="roomPrice"
									value={room.roomPrice}
									onChange={handleInputChange}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="photo" className="form-label">
									Room Photo
								</label>
								<input
									id="photo"
									name="photo"
									type="file"
									className="form-control"
									onChange={handleImageChange}
								/>
								{imagePreview && (
									<img
										src={imagePreview}
										alt="Preview Room Photo"
										style={{ maxWidth: "400px", maxHeight: "400px" }}
										className="mb-3"
									/>
								)}
							</div>
							<div className="d-grid d-md-flex mt-2">
								<Link
									to={"/existing-rooms"}
									className="btn btn-outline-info ml-5"
								>
									Back
								</Link>
								<button className="btn btn-outline-warning">Edit Room</button>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	);
};
export default EditRoom;
