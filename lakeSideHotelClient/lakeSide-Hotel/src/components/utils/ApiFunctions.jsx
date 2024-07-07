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
/* This function saves a new booking to the databse */
export async function bookRoom(roomId, booking) {
	try {
		const response = await api.post(
			`/bookings/room/${roomId}/booking`,
			booking
		);
		return response.data;
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data);
		} else {
			throw new Error(`Error booking room : ${error.message}`);
		}
	}
}

/* This function gets alll bokings from the database */
export async function getAllBookings() {
	try {
		const result = await api.get("/bookings/all-bookings");
		return result.data;
	} catch (error) {
		throw new Error(`Error fetching bookings : ${error.message}`);
	}
}

/* This function get booking by the cnfirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
	try {
		const result = await api.get(`/bookings/confirmation/${confirmationCode}`);
		return result.data;
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data);
		} else {
			throw new Error(`Error find booking : ${error.message}`);
		}
	}
}

/* This is the function to cancel user booking */
export async function cancelBooking(bookingId) {
	try {
		const result = await api.delete(`/bookings/booking/${bookingId}/delete`);
		return result.data;
	} catch (error) {
		throw new Error(`Error cancelling booking :${error.message}`);
	}
}

/* This function gets all availavle rooms from the database with a given date and a room type */
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
	const result = await api.get(
		`rooms/available-rooms?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
	);
	return result;
}
