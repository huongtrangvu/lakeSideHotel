import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost:9192",
});
// this func add a new room to the dtb
export async function addRoom(photo, roomType, roomPrice) {
	const formData = new FormData();
	formData.append("photo", photo);
	formData.append("roomType", roomType);
	formData.append("roomPrice", roomPrice);
	const response = await api.post("/rooms/add/new-room", formData);
	if (response.status === 200) {
		return true;
	} else return false;
}
// this func get all room types from dtb
export async function getRoomType() {
	try {
		const response = await api.get("/rooms/room/types");
		return response.data;
	} catch (error) {
		console.error(
			"Error fetching room types:",
			error.response || error.message
		);
		throw new Error("Error fetching room types");
	}
}
// this func gets all rooms from dtb
export async function getAllRooms() {
	try {
		const result = await api.get("rooms/all-rooms");
		return result.data;
	} catch (error) {
		throw new Error("Error fetching rooms");
	}
}
// this func deletes a room by id
export async function deleteRoom(roomId) {
	try {
		const result = await api.delete(`/rooms/delete/room/${roomId}`);
		return result.data;
	} catch (error) {
		throw new Error(`Error deleting room ${error.message}`);
	}
}
// this func uppdate a room
export async function updateRoom(roomId, roomData) {
	const formData = new FormData();
	formData.append("roomType", roomData.roomType);
	formData.append("roomPrice", roomData.roomPrice);
	formData.append("photo", roomData.photo);
	const response = await api.put(`/rooms/update/${roomId}`, formData);
	return response;
}
// This func gets a room by the id
export async function getRoomById(roomId) {
	try {
		const result = await api.get(`/rooms/room/${roomId}`);
		return result.data;
	} catch (error) {
		throw new Error(`Error fetching room ${error.message}`);
	}
}
