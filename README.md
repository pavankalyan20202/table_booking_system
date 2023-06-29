# table_booking_system
 
## Assumptions:
1. Designed form the Hotel management perspective.
2. No security added as of now. ANyone can access and do the registration. Table can be booked under reservation only if table is available.

## APIs:
1. GET /api/tables: list of tables along with their status
2. GET /api/tables/{id}: get a table with id
3. GET /api/reservations : list of reservations
4. GET /api/reservations/{id} : list of reservations with id

The application has been deployed in aws. 
URL for backend(demo): http://rms-app.us-east-2.elasticbeanstalk.com


## Frontend:
There are two main components in front end. 
1. Table
2. Reservations

Tables can be created and its availability can be set from table component. Reservations can be made only if table is available. 

Third party components used:
1. AG-grid
2. Bootstrap
3. Ngb-bootstrap
4. Ng-Prime
5. SweetAlert

URL for demo: http://rms-ui.s3-website.us-east-2.amazonaws.com

This is just a prototype which follows the concept of OOPS. It can be enhanced with funtionalities like updating table,reservations, dates check, auto selection of tables if no any table is selected based on tables and its capacity availability.
