# Database Schema

The database schema is managed using PostgreSQL. The schema consists of four main tables: `App_User`, `Client`, `Car`,
and `Repair`.

### App_User

The `App_User` table represents the users of the application.

| Field      | Type    | Description                               |
|------------|---------|-------------------------------------------|
| user_Id    | BIGINT  | id of the user                            |
| WorkerCode | VARCHAR | 6 digit long generated code of the worker |
| name       | VARCHAR | Name of the user                          |
| surName    | VARCHAR | Surname of the user                       |
| password   | VARCHAR | Password of the user (Encrypted)          |
| authority  | VARCHAR | Authority of the user (Admin, User)       |

### Client

The `Client` table represents the clients of the application.

| Field       | Type    | Description                |
|-------------|---------|----------------------------|
| client_Id   | BIGINT  | id of the client           |
| Name        | VARCHAR | Name of the client         |
| Surname     | VARCHAR | Surname of the client      |
| Email       | VARCHAR | Email of the client        |
| PhoneNumber | VARCHAR | Phone number of the client |

### Car

The `Car` table represents the cars owned by the clients.

| Field              | Type    | Description                        |
|--------------------|---------|------------------------------------|
| car_Id             | BIGINT  | id of the car                      |
| brand              | VARCHAR | Brand of the car                   |
| model              | VARCHAR | Model of the car                   |
| yearOfProduction   | INT     | Year of production of the car      |
| registrationNumber | VARCHAR | Registration plate of the car      |
| vinNumber          | VARCHAR | VIN number of the car              |
| mileage            | INT     | Mileage of the car                 |
| engine             | VARCHAR | Engine of the car                  |
| status             | VARCHAR | Status of the car                  |
| client_Id          | BIGINT  | id of the client that owns the car |

### Repair

The `Repair` table represents the repair records of the cars.

| Field             | Type    | Description                                              |
|-------------------|---------|----------------------------------------------------------|
| repair_Id         | BIGINT  | id of the repair record                                  |
| dateOfAdmission   | DATE    | The date when the car was admitted for repair            |
| dateOfHandingOver | DATE    | The date when the repaired car was returned to the owner |
| infoFromClient    | TEXT    | Information about the repair from the client             |
| infoFromWorker    | TEXT    | Information about the repair from the worker             |
| status            | VARCHAR | Status of the repair (In progress, Finished)             |
| repairedBy        | VARCHAR | Worker who repaired the car                              |
| car_Id            | BIGINT  | id of the car that is being repaired                     |

### Foreign Keys

| Table    | Field      | References |
|----------|------------|------------|
| App_User | WorkerCode | Repair     |
| Client   | client_Id  | Car        |
| Car      | car_Id     | Repair     |
| Car      | client_Id  | Client     |
| Repair   | repairedBy | App_User   |
