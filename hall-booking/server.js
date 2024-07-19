import express from "express";

const app = express();
const PORT = 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Day-38 Nodejs Hall Booking API Task");
});

let rooms = [];
let bookings = [];

// Creating a room
app.post("/rooms", (req, res) => {
  const { roomName, noOfSeatsAvailable, amenities, pricePerHour } = req.body;
  const room = {
    id: rooms.length + 1,
    roomName,
    noOfSeatsAvailable,
    amenities,
    pricePerHour,
  };
  rooms.push(room);
  res.json({ message: "Room Created Successfully" });
});

// Booking a room
app.post("/booking", (req, res) => {
  const { customerName, date, startTime, endTime, roomID } = req.body;

  // Check if the room is already booked in the given date and time
  const booked = bookings.find(
    (book) =>
      date == book.date &&
      roomID == book.roomID &&
      startTime >= book.startTime &&
      endTime <= book.endTime
  );
  if (booked) {
    res.json({ error: "Room is not available for the given date and time." });
  } else {
    // if not booked and then only the room is book
    const currentDate = new Date().toDateString();

    const check = rooms.find((room) => room.id == roomID);

    if (check) {
      const booking = {
        customerName,
        date,
        startTime,
        endTime,
        roomID,
        bookedStatus: "Booked",
        bookingID: bookings.length + 1,
        bookingDate: currentDate,
      };
      bookings.push(booking);
      res.json({ message: "Room Booked Successfully" });
    } else {
      res.json({ error: "Room ID is not found." });
    }
  }
});

// list all rooms with booked data
app.get("/rooms", (req, res) => {
  // roomName, bookedStatus, customerName, date, startTime, endTime
  const roomsBooked = rooms.map((room) => {
    const bookedRooms = bookings.filter((book) => book.roomID == room.id);

    const bookedData = bookedRooms.map((booking) => {
      return {
        customerName: booking.customerName,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        bookedStatus: booking.bookedStatus,
      };
    });

    return {
      roomName: room.roomName,
      bookings: bookedData,
    };
  });
  res.json(roomsBooked);
});

// list all the customers with booked data
app.get("/customer", (req, res) => {
  // customerName, roomName, date, startTime, endTime
  const customersBookingData = [];

  for (const booking of bookings) {
    const room = rooms.find((room) => room.id == booking.roomID);

    if (room) {
      const customerData = {
        customerName: booking.customerName,
        roomName: room.roomName,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
      };
      customersBookingData.push(customerData);
    }
  }
  res.json(customersBookingData);
});

// list how many times a customer has booked the room with below details
app.get("customers/:customerName/bookings", (req, res) => {
  const { name } = req.params;
  const history = bookings.filter((book) => book.customerName == name);
  res.json(history);
});

app.listen(PORT, () => console.log("Server running on PORT => ", PORT));