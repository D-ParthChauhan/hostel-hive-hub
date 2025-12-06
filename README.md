Hostel Hive Hub | Hostel 5 (The Penthouse)

Web Brawl General Championship Submission


IMPORTANT 
MUST RUN THE SEED FILE BEFOREHAND IT LOADS THE COUNCIL.
Login:- Council (Admin)	h5hallmgr@iitb.ac.in	Mr. Shamit Karnekar (Hall Manager)
Student Council	techcoh5@iitb.ac.in	Adnan Shaikh (Tech Councilor)
Passwords:- admin123 (for all)

Project Overview

Hostel Hive Hub is the official centralized digital platform designed for Hostel 5, IIT Bombay. This application streamlines hostel administration, facilitates seamless communication, and enhances community engagement between residents and the student council.

Built as a robust Full-Stack Monorepo, the platform serves as a single point of truth for event scheduling, team directories, and facility management.

Key Features

1. Authentication & Role-Based Access Control (RBAC)

The system employs a secure authentication flow with specific permissions for different user tiers:

Students: Can view events, access the team directory, participate in community discussions, and file complaints.

Student Council: Inherits student permissions with added visibility in the team directory.

Core Council (Admin): Possesses full administrative privileges including user management and event moderation.

Security: Backend routes are protected via middleware to ensure unauthorized users cannot access sensitive API endpoints.

2. Administrative Dashboard

A dedicated interface for the Core Council to manage the hostel's digital infrastructure:

User Provisioning: Register new users and assign specific roles (Student, Student Council, or Core Council).

Profile Management: Database storage for name, email, room number, roll number, and contact details.

Directory Control: Ability to remove users or update permissions as required.

3. Automated Event Management

Dynamic Feed: The events page automatically fetches and displays upcoming activities, sorted chronologically.

Publication Tools: Council members can publish events with rich details including title, date, time, venue, description, and cover imagery.

Content Moderation: Administrators can delete outdated or incorrect event listings directly from the dashboard.

4. Dynamic Team Directory

Automated Listing: The team page is not hardcoded; it fetches member data dynamically from the user database.

Smart Categorization: The system automatically segregates members into:

Administration: Wardens and Core Council.

Student Council: Secretaries and Representatives.

Reachability: Displays essential contact information (Email, Phone, Room Number) for immediate access.

5. Advanced Complaints & Contact Portal

The platform upgrades the standard contact form into a dual-purpose routing system powered by Nodemailer.

General Inquiries

Designed for visitors or general questions.

Automatically dispatches emails to the Warden and General Secretary.

Facility Complaints

Designed for residents to report infrastructure issues.

Smart Routing: The system analyzes the complaint category and directs it to the specific secretary responsible:

Electrical/Plumbing/Carpentry -> Maintenance Secretary

Cleaning/Hygiene -> Health Secretary

Uncategorized -> General Secretary

Database Redundancy: All complaints are logged securely in MongoDB, ensuring a permanent record exists even if email delivery fails.

6. Community Forum

Channels: Administrators can create specific sub-channels (e.g., General, Sports, Tech).

Discussions: A read-only or interactive space for students to stay updated on hostel-wide announcements and discussions.

Technology Stack

The project utilizes the MERN Stack (MongoDB, Express, React, Node.js) to ensure scalability and performance.

Frontend (Client)

Framework: React (Vite) for rapid development and optimized builds.

Language: TypeScript for static typing and code reliability.

Styling: Tailwind CSS for utility-first, responsive design.

UI Components: Shadcn UI and Lucide React for accessible, consistent aesthetics.

Animation: Framer Motion for smooth UI transitions.

Backend (Server)

Runtime: Node.js & Express.js.

Database: MongoDB with Mongoose ODM for schema-based data modeling.

Authentication: JSON Web Tokens (JWT) for stateless session management and Bcryptjs for password hashing.

Communication: Nodemailer for transactional email services.

Installation & Setup

This project is structured as a Monorepo, requiring the backend and frontend to run simultaneously in separate terminal instances.

Prerequisites

Node.js (v16 or higher)

MongoDB (Installed locally or a MongoDB Atlas connection string)

Step 1: Backend Setup

Open a terminal and navigate to the server directory:
cd server

Install dependencies:
npm install

Environment Configuration: Create a .env file in the server directory and add the following credentials:

MONGO_URI=mongodb://localhost:27017/hostelHiveDB
JWT_SECRET=your_secure_secret_key_here
EMAIL_USER=your-service-email@gmail.com
EMAIL_PASS=your-app-specific-password


Database Seeding: Run the seed script to populate the database with the initial Admin account.
npm run seed

Start the server:
npm start
(The server will run on http://localhost:5001)

Step 2: Frontend Setup

Open a new terminal window (keep the server running).

Navigate to the client directory:
cd client

Install dependencies:
npm install

Start the development server:
npm run dev
(The client will typically run on http://localhost:8080 or http://localhost:5173)

Usage Guide

Initial Access

To access the administrative features immediately after installation, use the default credentials generated by the seed script.

Navigate to the login page on the frontend.

Enter the following credentials:

Email: gsec@hostel5.iitb.ac.in

Password: admin123

Upon successful login, the Dashboard button will appear in the navigation bar. From here, you can register new students, post events, and manage the portal.
