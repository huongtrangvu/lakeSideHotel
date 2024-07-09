package org.example.controller;

import org.example.exception.InvalidBookingRequestException;
import org.example.exception.ResourceNotFoundException;
import org.example.model.BookedRoom;
import org.example.model.Room;
import org.example.response.BookingResponse;
import org.example.response.RoomResponse;
import org.example.service.BookingService;
import org.example.service.IBookingService;
import org.example.service.IRoomService;
import org.example.service.RoomServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/bookings")
public class BookingController {
    private final IBookingService bookingService;
    private final IRoomService roomService;

    @Autowired
    public BookingController(BookingService bookingService, RoomServiceImpl roomService) {
        this.bookingService = bookingService;
        this.roomService = roomService;
    }
    @GetMapping("/all-bookings")
    public ResponseEntity<List<BookingResponse>> getAllBooking(){
        List<BookedRoom> bookings = bookingService.getAllBookings();
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for(BookedRoom booking:bookings) {
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        System.out.println(bookingResponses.get(0).getBookingConfirmationCode());
        return ResponseEntity.ok(bookingResponses);
    }


    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode) {
        try {
            BookedRoom booking = bookingService.findByBookingConfirmationCode(confirmationCode);
            BookingResponse bookingResponse=getBookingResponse(booking);
            return ResponseEntity.ok(bookingResponse);
        }catch(ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());

        }
    }
    @PostMapping("/room/{roomId}/booking")
    public ResponseEntity<?> saveBooking(@PathVariable Long roomId, @RequestBody BookedRoom bookingRequest) {
    try {
        String confirmationCode = bookingService.saveBooking(roomId, bookingRequest);
        return ResponseEntity.ok("Room booked successfully ! Your booking confirmation code is:" + confirmationCode);
    }catch(InvalidBookingRequestException e) {
        return ResponseEntity.badRequest().body(e.getMessage());

    }
    }
    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelBooking(@PathVariable Long bookingId) {
        bookingService.cancelBooking(bookingId);
    }

    private BookingResponse getBookingResponse(BookedRoom booking) {
        Optional<Room> theRoom = roomService.getRoomById(booking.getRoom().getId());
        RoomResponse room = new RoomResponse(theRoom.get().getId(), theRoom.get().getRoomType(), theRoom.get().getRoomPrice());
        return new BookingResponse(booking.getBookingId(), booking.getCheckInDate(), booking.getCheckOutDate(),
                booking.getGuestFullName(), booking.getGuestEmail(), booking.getNumOfAdults(),
                booking.getNumOfChildren(), booking.getTotalNumOfGuest(),
                booking.getBookingConfirmationCode(), room
        );

    }

}
