# Form Builder

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Setup Instructions](#setup-instructions)
5. [API Documentation](#api-documentation)
6. [Database Structure](#database-structure)
7. [Design Decisions](#design-decisions)

## Project Overview

Form Builder is a web application that allows users to create custom forms using a drag-and-drop interface. Users can generate shareable links for their forms, collect submissions, and view the submitted data. This project aims to provide a user-friendly platform for creating and managing forms for various purposes such as surveys, feedback collection, and data gathering.

## Features

1. **Form Builder:**
   - Drag-and-drop interface for form creation
   - Support for various field types:
     - Text Input
     - Number Input
     - Date Picker
     - Checkbox
     - Dropdown Select
     - Radio Buttons
   - Field customization (label, placeholder, required/optional, default value)
   - Ability to reorder and remove fields
   - Form title and description customization

2. **Form Sharing:**
   - Generate unique, shareable links for each form
   - Public access to forms via links

3. **Form Submission:**
   - User-friendly form filling interface
   - Submission storage in the database
   - View all submissions for a specific form
   - Export submissions as CSV

4. **User Dashboard:**
   - View all created forms
   - Edit existing forms
   - Delete forms
   - View form submission statistics

5. **Responsive Design:**
   - Mobile-friendly interface
   - Adapts to different screen sizes

## Tech Stack

- **Frontend:**
  - React
  - TypeScript
  - React Router for navigation
  - Axios for API requests
  - React Beautiful DND for drag-and-drop functionality
  - Tailwind CSS for styling

- **Backend:**
  - Node.js
  - Express.js
  - TypeScript
  - MySQL for database


## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- MySQL

### Project Setup
1. Navigate to the project/src directory:
  ```bash
    cd project-folder/src
  ```
2. Install dependencies
  ```bash
   npm install
  ```
3. Start the development server:
   ```bash
   npm run dev/start
   ```
   
4. Create a `.env` file in the server directory with the following content:

  ```bash
    PORT=5000
    DB_HOST=localhost
    DB_USER=your_mysql_username
    DB_PASSWORD=your_mysql_password
    DB_NAME=form_builder
  ```

Replace `your_mysql_username` and `your_mysql_password` with your actual MySQL credentials.

5. Set up the database:
- Create a new MySQL database named `form_builder`
- Run the SQL scripts in `server/src/utils/database.sql` to create the necessary tables

5. Start the development server:

The  API will be available at `http://localhost:5000`.

## API Documentation

### Forms API

- `POST /api/forms`: Create a new form
- `GET /api/forms`: Get all forms
- `GET /api/forms/:id`: Get a specific form
- `PUT /api/forms/:id`: Update a form
- `DELETE /api/forms/:id`: Delete a form

### Submissions API

- `POST /api/submissions`: Create a new submission
- `GET /api/submissions/:formId`: Get all submissions for a form
- `GET /api/submissions/:formId/export`: Export submissions as CSV

## Database Structure

The project uses two main tables:

1. `forms` table:
- `id` (VARCHAR(36), Primary Key)
- `title` (VARCHAR(255))
- `description` (TEXT)
- `fields` (JSON)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

2. `submissions` table:
- `id` (VARCHAR(36), Primary Key)
- `form_id` (VARCHAR(36), Foreign Key referencing forms.id)
- `data` (JSON)
- `created_at` (TIMESTAMP)


## Design Decisions

1. **React with TypeScript**: Chosen for its strong typing system, which helps catch errors early in the development process and improves code maintainability.

2. **Express.js Backend**: Used for its simplicity and flexibility in creating RESTful APIs.

3. **MySQL Database**: Selected for its reliability and ability to handle structured data efficiently.

4. **Drag-and-Drop Interface**: Implemented using react-beautiful-dnd for an intuitive form-building experience.

5. **Tailwind CSS**: Utilized for rapid UI development and easy customization.

6. **Modular Architecture**: The project is structured with separate frontend and backend for easier maintenance and potential scaling.

