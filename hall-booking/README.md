Hall Booking API

This project is a hall booking system API built using Node.js and Express. It allows you to create rooms, book rooms, and retrieve booking information.

Features

- Create a room with the number of seats, amenities, and price per hour.
- Book a room for a specific date and time period.
- List all rooms with their booking data.
- List all customers with their booking data.
- List all bookings for a specific customer.

Endpoints

1. Create a Room

Endpoint: '/rooms'  
Method: 'POST'  
Description: Creates a new room with the specified details.

Sample Request
json

{
"roomName": "Conference Room",
"numberOfSeats": 50,
"amenities": ["Wi-Fi", "Projector", "Whiteboard"],
"pricePerHour": 100
}

2. Book a Room

Endpoint: '/bookings'
Method: 'POST'
Description: Books a room for a specific time period.

Sample Request
json

{
"customerName": "John",
"date": "2023-07-17",
"startTime": "10:00",
"endTime": "12:00",
"roomId": 1
}

3. List All Rooms with Booked Data

Endpoint: '/rooms'
Method: 'GET'
Description: Retrieves all rooms along with their booking data.

4. List All Customers with Booked Data

Endpoint: '/customers'
Method: 'GET'
Description: Retrieves all customers along with their booking data.

5. List Bookings for a Specific Customer

Endpoint: '/customers/:customerName/bookings'
Method: 'GET'
Description: Retrieves all bookings for a specific customer.
