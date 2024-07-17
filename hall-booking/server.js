const express = require('express');
const app = express();
const port = 4000;

app.use(express.json()); 

const rooms = [];
const bookings = [];

// Create a Room
app.post('/rooms', (req, res) => {
    const { roomName, numberOfSeats, amenities, pricePerHour } = req.body;

    const room = {
        roomId: rooms.length + 1,
        roomName,
        numberOfSeats,
        amenities,
        pricePerHour,
        bookings: []
    };

    rooms.push(room);
    res.status(201).json(room);
});

// Book a Room
app.post('/bookings', (req, res) => {
    const { customerName, date, startTime, endTime, roomId } = req.body;

    const room = rooms.find(r => r.roomId === roomId);

    if (!room) {
        return res.status(404).json({ message: 'Room not found' });
    }

    const conflictingBooking = room.bookings.find(
        booking => booking.date === date &&
        ((booking.startTime <= startTime && booking.endTime > startTime) ||
        (booking.startTime < endTime && booking.endTime >= endTime))
    );

    if (conflictingBooking) {
        return res.status(400).json({ message: 'Room already booked for the specified time' });
    }

    const booking = {
        bookingId: bookings.length + 1,
        customerName,
        date,
        startTime,
        endTime,
        roomId
    };

    room.bookings.push(booking);
    bookings.push(booking);

    res.status(201).json(booking);
});

// List All Rooms with Booked Data
app.get('/rooms', (req, res) => {
    const roomsWithBookings = rooms.map(room => ({
        roomName: room.roomName,
        numberOfSeats: room.numberOfSeats,
        amenities: room.amenities,
        pricePerHour: room.pricePerHour,
        bookings: room.bookings.map(booking => ({
            customerName: booking.customerName,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime
        }))
    }));

    res.status(200).json(roomsWithBookings);
});

// List All Customers with Booked Data
app.get('/customers', (req, res) => {
    const customersWithBookings = bookings.map(booking => ({
        customerName: booking.customerName,
        roomName: rooms.find(room => room.roomId === booking.roomId).roomName,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime
    }));

    res.status(200).json(customersWithBookings);
});

// List Bookings for a Specific Customer
app.get('/customers/:customerName/bookings', (req, res) => {
    const customerName = req.params.customerName;

    const customerBookings = bookings.filter(booking => booking.customerName === customerName)
        .map(booking => ({
            roomName: rooms.find(room => room.roomId === booking.roomId).roomName,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            bookingId: booking.bookingId,
            bookingDate: booking.date,
            bookingStatus: 'confirmed'
        }));

    res.status(200).json(customerBookings);
});

app.listen(port, () => {
    console.log(`Server running on PORT => ${port}`);
});
