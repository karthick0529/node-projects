    TASK: 

    - Write API to create Mentor
    - Write API to create Student
    - Write API to Assign a student to Mentor
        Select one mentor and Add multiple Student 
        A student who has a mentor should not be shown in List
    - Write API to Assign or Change Mentor for particular Student
        Select One Student and Assign one Mentor
    - Write API to show all students for a particular mentor
    - Write an API to show the previously assigned mentor for a particular student.

Deployment link:

https://node-projects-2.onrender.com

End-points:

/api/mentor - Creating a Mentor

/api/student - Creating a Student

/api/assign-student - Assigning Students to a Mentor

/api/change-mentor/studentObjectId - Changing Mentor for a Particular Student

    Note: Here studentObjectId should be mentioned in the end point to change the mentor for a particular student.

/api/students-by-mentor/mentorObjectId - Showing All Students for a Particular Mentor

    Note: Here mentorObjectId should be mentioned in the end point to show all students for a particular mentor.

/api/previous-mentor/studentObjectId - Showing the Previously Assigned Mentor for a Particular Student.

    Note: Here studentObjectId should be mentioned in the end point to show previously assigned mentor for a particular student.