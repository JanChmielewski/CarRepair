# Api Documentation

## Table of Contents

1. [Overview](#overview)
2. [Base URL](#base-url)
3. [Endpoints](#endpoints)
    * [User](#user)
    * [Client](#client)
    * [Car](#car)

[//]: # (    4. [Repair]&#40;#Repair&#41;)

## Overview

This document provides a comprehensive guide to the APIs provided by the Car Repair Management System. The system is
built using Java and Spring Boot, and it exposes a RESTful API for interaction with the frontend.

## Base URL

All API requests should be made to the following base URL:

```HTTP
http://localhost:8080
```

## Endpoints

1. [User](#user)
    * [```GET /users```](#get-users)
    * [```POST /register```](#post-register)
    * [```POST api/login ```](#post-login)
* [Client](#client)
    * [```GET /clients```](#get-clients)
    * [```POST /addClient```](#post-addclient)
* [Car](#car)
    * [```GET /cars```](#get-cars)
    * [```POST /addCarForRepair/{clientId}```](#post-addcarforrepairclientid)
    * [```DELETE /deleteAllCars```](#delete-deleteallcars)
    * [```GET /carsForDashboard```](#get-carsfordashboard)
    * [```POST /editCarInfo/{carId}```](#post-editcarinfocarid)

[//]: # (* [Repair]&#40;&#41;)

### User

The `User` endpoint provides APIs for managing user accounts in the system.

#### GET /users

Returns a list of all users in the system.

##### Request: 

``` http request
GET /users
```

##### Response:

```json
[
  {
    "id": 1,
    "workerCode": "W001",
    "name": "Jane",
    "surname": "Doe",
    "password": "password",
    "authority": "ROLE_USER"
  }
]
```

#### POST /register

This task needs to be performed by an admin user, who must be manually inserted into the database. The admin user can then
register a new user in the system using this endpoint.

##### Request:

``` http request
POST /register
```

##### Request Body:

```json
{
  "name": "John",
  "surname": "Doe",
  "password": "password123",
  "authority": "USER"
}
```

##### Response:

```text
User registered!
Worker code: 832265
Name: John
Surname: Doe
Password: $2a$10$y3ZYCLQxIsLbKZJBMWMvD.pBRCt15NwIZ0TJxfSau8fhb/6S4B0kq
Authority: USER
```

#### POST /login

Logs in a user and returns an authentication token.

##### Request:

``` http request
POST api/login
```

##### Request Body:

```json
{
  "workerCode": "123456",
  "password": "password"
}
```

##### Response:

```json
{
  "message": "User logged in successfully",
  "workerCode": "123456",
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4MTE4NTAiLCJpYXQiOjE3MTY3NDM4NjUsImV4cCI6MTcxNjc3OTg2NX0.6-dL74kBUC-X5dwMByA34W2LVls0ShJpHWMlM_gsQtc"
}
```

### Client

The `Client` endpoint provides APIs for managing client information in the system.

#### GET /clients

Returns a list of all clients in the system.

##### Request:

``` http request
GET /clients
```

##### Response:

```json
{
  "message: ": "List of clients retrieved successfully",
  "clients": [
    {
      "clientId": 1,
      "name": "Jane",
      "surname": "Doe",
      "email": "123456789",
      "phoneNumber": "janeDoe@test.com"
    },
    "..."
  ]
}
```

#### POST /addClient

Adds a new client to the system.

##### Request: 

``` http request
POST /addClient
```

##### Request Body:

```json
{
  "name": "Jane",
  "surname": "Doe",
  "email": "janeDoe@test.com",
  "phoneNumber": "123456789"
}
```

##### Response:

```text
Client added to the database
```

### Car

The `Car` endpoint provides APIs for managing car information in the system.

#### GET /cars

Returns a list of all cars in the system.

##### Request:

``` http request
GET /cars
```

##### Response:

```json
{
  "message: ": "List of cars retrieved successfully",
  "cars": [
    {
      "carId": 1,
      "brand": "Toyota",
      "model": "Corolla",
      "yearOfProduction": 2019,
      "registrationNumber": "ABC123",
      "vinNumber": "123456789",
      "mileage": 50000,
      "engine": "1.8L",
      "status": "Active",
      "clientId": 1
    },
    "..."
  ]
}
```

#### POST /addCarForRepair/{clientId}

##### Request:

``` http request
POST /addCarForRepair/1
```

##### Request Body:

```json
{
  "message: ": "Car with id: 103 and which belongs to Client with id: 1 added to the database",
  "carID": {
    "id": 103,
    "brand": "Toyota",
    "model": "Corolla",
    "yearOfProduction": 2018,
    "registrationNumber": "ABC-123",
    "vin": "1HGCM82633A123456",
    "mileage": "60000",
    "engine": "1.8L",
    "status": "WAITING_FOR_DIAGNOSIS",
    "client": {
      "clientId": 1,
      "name": "Jane",
      "surname": "Doe",
      "email": "janeDoe@test.com",
      "phoneNumber": "123456789"
    }
  }
}
```

#### DELETE /deleteAllCars

Deletes all cars from the system.

##### Request: 

``` http request
DELETE /deleteAllCars
```

##### Response: 

```text
All cars deleted successfully
```

#### GET /carsForDashboard

Returns a list of all cars in the system.

##### Request:

``` http request
GET /carsForDashboard
```

#### Response:

````json
{
  "message: ": "List of cars for dashboard retrieved successfully",
  "cars": [
    {
      "id": 102,
      "brand": "Honda",
      "model": "Civic",
      "yearOfProduction": 2015,
      "registrationNumber": "XYZ-789",
      "vin": "2HGFG11816H300001",
      "mileage": "80000",
      "engine": "2.0L",
      "status": "WAITING_FOR_DIAGNOSIS",
      "client": {
        "clientId": 1,
        "name": "Jane",
        "surname": "Doe",
        "email": "janeDoe@test.com",
        "phoneNumber": "123456789"
      }
    },
    {
      "id": 103,
      "brand": "Toyota",
      "model": "Corolla",
      "yearOfProduction": 2018,
      "registrationNumber": "ABC-123",
      "vin": "1HGCM82633A123456",
      "mileage": "60000",
      "engine": "1.8L",
      "status": "WAITING_FOR_DIAGNOSIS",
      "client": {
        "clientId": 1,
        "name": "Jane",
        "surname": "Doe",
        "email": "janeDoe@test.com",
        "phoneNumber": "123456789"
      }
    }
  ]
}
````

#### POST /editCarInfo/{carId}

Endpoint for editing information about car like mileage or registration number. 

##### Request:

``` http request
POST /editCarInfo/1
```

##### Request Body:

```json
{
  "mileage": "245500"
}
```

##### Response:

```json
 {
  "message: ": "Car with id: 102 updated successfully",
  "updated fields ": {
    "mileage": "245500",
    "lastUpdated": "2024-06-10 23:50"
  }
}
```

### Repair

The `Repair` endpoint provides APIs for managing repair information in the system.

#### GET /repairs

Returns a list of all repairs in the system.

##### Request:

``` http request
GET /repairs
```

##### Response:

```json
{
  "message: ": "List of repairs retrieved successfully",
  "repairs": [
    {
      "repairId": 1,
      "carId": 1,
      "repairDescription": "Engine replacement",
      "repairCost": 2000,
      "repairStatus": "IN_REPAIR"
    },
    "..."
  ]
}
```

#### POST /addRepair/{carId}

Adds a new repair to the system.

##### Request:

``` http request
POST /addRepair/1
```

##### Request Body:

```json
{
  "repairDescription": "Engine replacement",
  "repairCost": 2000,
  "repairStatus": "IN_REPAIR"
}
```

##### Response:

```json
{
  "message: ": "Repair added to the database",
  "repair": {
    "repairId": 1,
    "carId": 1,
    "repairDescription": "Engine replacement",
    "repairCost": 2000,
    "repairStatus": "IN_REPAIR"
  }
}
```

#### POST /editRepair/{repairId}

Endpoint for editing information about repair (f.e. repair status, repair cost).

##### Request:

``` http request
POST /editRepair/1
```

##### Request Body:

```json
{
  "repairStatus": "REPAIRED",
  "repairCost": 2500
}
```

##### Response:

```json
{
  "message: ": "Repair with id: 1 updated successfully",
  "updated fields": {
    "repairStatus": "REPAIRED",
    "repairCost": 2500
  }
}
```



