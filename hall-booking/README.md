HALL BOOKING

This project is a hall booking system API built using Node.js and Express. It allows you to create rooms, book rooms, and retrieve booking information.

RENDER URL : https://node-projects-1-iu1m.onrender.com

TASK DETAILS

Create an Express Server
Create end-points and write logics
Can use local variable to store data
Write API documentation in POSTMAN Docs

TASK REQUIREMENTS

- Create a room with the number of seats, amenities, and price per hour.
- Book a room for a specific date and time period.
- List all rooms with their booking data.
- List all customers with their booking data.
- List all bookings for a specific customer.

END POINTS / DOCUMENTATION

GET METHOD :

/get-rooms --> To collect all rooms details

/all-booked-rooms --> To collect the all booked rooms details

/all-customers --> To collect all customers details

/booking-customer-data --> To get particular customer data (required customer_name from Query Params)

POST METHOD :

/add-room --> To add more rooms.
Data required in Query Params - room_name, seates_available, aminities, price. (all data required from user)
Conditions :
Should not add same room name again.

/book-room --> To book room. [CONDITIONS : Should not book the already booked room for that time period]
Data required in Query Params - room_name, customer_name, date, start_time, end_time. (all data required from user)
