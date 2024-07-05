import React, { useEffect, useState } from "react";
import BookingForm from "../booking/BookingForm";
import {
	FaUtensils,
	FaWifi,
	FaTv,
	FaWineGlassAlt,
	FaParking,
	FaCar,
	FaTshirt,
} from "react-icons/fa";

import { useParams } from "react-router-dom";
import { getRoomById } from "../utils/ApiFunctions";
import RoomCarousel from "../common/RoomCarousel";

const Checkout = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [roomInfo, setRoomInfo] = useState({
		photo: "",
		roomType: "",
		roomPrice: "",
	});

	const { roomId } = useParams();

	useEffect(() => {
		setTimeout(() => {
			getRoomById(roomId)
				.then((response) => {
					setRoomInfo(response);
					setIsLoading(false);
				})
				.catch((error) => {
					setError(error);
					setIsLoading(false);
				});
		}, 1000);
	}, [roomId]);

	return (
		<div>
			<BookingForm />
		</div>
	);
};
export default Checkout;
