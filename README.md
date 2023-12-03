
# Introduction

Hi! I'm Resya the software engineer and tax collector. In this project i made full stack web-app using flask and react. Feel free to clone and give feedback!


# To-Do List Application with Flask and React

## Overview

This is a full-stack To-Do List application built using Flask for the backend, React for the frontend, and Firebase for deployment. The application includes user authentication, security headers configuration, and comprehensive API documentation using Postman.

## Features

- User and admin roles
- User registration: `/auth/registration`
- User login: `/auth/login`
- Create, retrieve, update, and delete To-Do items: `/todos/`, `/todos/:id`
- Secure user authentication
- Security headers configuration
- React frontend
- Comprehensive API documentation using Postman
- Deployment using Firebase

## Backend (Flask)

### User Authentication

- **Register User**: Endpoint `/auth/registration` allows users to register, providing necessary details.
  
- **User Login**: Endpoint `/auth/login` for user authentication, generating a secure token for subsequent requests.

### To-Do Management

- **Create To-Do Item**: Use `/todos/` to create a new To-Do item with details like title, description, and deadline.

- **Get To-Do Items**: Endpoint `/todos/` retrieves a list of all To-Do items.

- **Update and Delete To-Do Item**: Use `/todos/:id` for updating and deleting a specific To-Do item identified by its ID.

### Security Features

- **Secure Authentication**: Implement secure user authentication with token-based verification.

- **Security Headers**: Configure security headers to enhance application security.

## Frontend (React)

The frontend is built using React to provide a user-friendly interface for managing To-Do items.

### To-Do Management

- **Create To-Do**: Users can easily create new To-Do items.

- **View To-Do List**: Display a list of all To-Do items.

- **Update and Delete To-Do**: Allow users to edit and delete To-Do items directly from the UI.

## API Documentation (Postman)

Comprehensive API documentation is available using Postman. Refer to the Postman collection for detailed information on each API endpoint, request parameters, and expected responses.

https://documenter.getpostman.com/view/29042288/2s9YeK4qJY

## Deployment (Firebase)

The application is deployed on Firebase, providing a scalable and reliable platform for hosting both the backend and frontend components.

backend : https://resyanac22-s6tv3qk23q-uc.a.run.app
frontend : https://week22-revou-milestone4.web.app



## Roles

### User Role

- Can register and log in.
- Manage their own To-Do items.

### Admin Role

- Inherits all user privileges.
- Additional admin-specific functionalities.

## Getting Started

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the backend folder and install dependencies: `cd backend && pip install -r requirements.txt`
3. Set up environment variables.
4. Run the Flask backend: `python app.py`
5. Navigate to the frontend folder and install dependencies: `cd frontend && npm install`
6. Run the React frontend: `npm start`
