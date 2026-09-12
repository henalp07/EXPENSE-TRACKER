# 💰 Expense Tracker

A simple and user-friendly **Expense Tracker web application** developed to manage income and expenses digitally. The project provides user registration and login, transaction management, and a dashboard for viewing total income, total expenses, and balance.

The application uses **Node.js and Express.js for the backend** and **MongoDB for database storage**.

---

## 📌 Project Overview

The Expense Tracker helps users keep track of their financial transactions in one place.

Users can:

- Create an account
- Log in securely
- Add income and expense transactions
- Select transaction categories
- Add transaction dates and descriptions
- View total income
- View total expenses
- View current balance
- View all saved transactions
- Delete transactions
- Store user and transaction data in MongoDB

---

## 🛠️ Technologies Used

### Frontend
- **HTML5** – Structure of web pages
- **CSS3** – Styling and responsive user interface
- **JavaScript** – Client-side functionality and API communication

### Backend
- **Node.js** – JavaScript runtime used to build the server-side application
- **Express.js** – Backend web framework used to create REST APIs
- **Mongoose** – MongoDB object modeling library

### Database
- **MongoDB** – NoSQL database used to store users and expense/income transactions

### Development Tools
- **Visual Studio Code**
- **Git**
- **GitHub**
- **MongoDB**

---

## 🏗️ Project Structure

```text
FSD Project/
│
├── backend/
│   ├── models/
│   │   ├── Transaction.js
│   │   └── User.js
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── users.html
│   ├── script.js
│   └── style.css
│
├── package.json
├── package-lock.json
└── .gitignore
```

> `node_modules` and `.env` are excluded from the GitHub repository using `.gitignore`.

---

## ⭐ Main Features

### 1. User Registration
New users can create an account by providing their name, email, and password.

### 2. User Login
Registered users can log in using their email and password.

### 3. Expense and Income Management
Users can add transactions by selecting:

- Transaction type
- Amount
- Category
- Date
- Description

### 4. Financial Summary
The dashboard displays:

- **Total Income**
- **Total Expense**
- **Balance**

The balance is calculated from the user's income and expenses.

### 5. Transaction List
All transactions are displayed in the dashboard with their amount, category/description, date, and delete option.

### 6. Delete Transactions
Users can delete transactions that are no longer required.

### 7. MongoDB Database
User and transaction information is stored in **MongoDB**, allowing data to persist instead of being stored only in the browser.

---

## 🔗 Backend API

The backend is built using **Node.js + Express.js**.

Some of the implemented API endpoints include:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/transactions` | Get all transactions |
| POST | `/add-transaction` | Add a new transaction |
| DELETE | `/transaction/:id` | Delete a transaction |
| GET | `/Users` | Get users |
| POST | `/Users` | Register a new user |
| POST | `/Users/login` | Login a user |

---

## 🗄️ MongoDB Integration

MongoDB is used as the database for this project.

The backend connects to MongoDB using **Mongoose** and an environment variable:

```javascript
mongoose.connect(process.env.MONGO_URI)
```

The project uses separate Mongoose models for:

- **User**
- **Transaction**

This allows the application to store and retrieve data from MongoDB through the Node.js backend.

---

## 🔐 Environment Variables

The MongoDB connection string is kept inside a `.env` file.

Example:

```env
MONGO_URI=your_mongodb_connection_string
```

**Do not upload your `.env` file to GitHub.**

The `.env` file is already excluded using `.gitignore`.

---

## ▶️ How to Run the Project

### Step 1: Clone the repository

```bash
git clone https://github.com/henalp07/EXPENSE-TRACKER.git
```

Then open the project in VS Code.

### Step 2: Install backend dependencies

Open the terminal and run:

```bash
cd backend
npm install
```

### Step 3: Configure MongoDB

Create a `.env` file inside the `backend` folder:

```text
backend/.env
```

Add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
```

### Step 4: Start the Node.js server

From the `backend` folder:

```bash
node server.js
```

The backend server should start successfully.

### Step 5: Run the frontend

Open the `frontend` folder in VS Code and run `index.html` using **Live Server**, or open the HTML file using a suitable local web server.

Make sure the frontend API URL points to the running Node.js backend.

---

## 🔄 How the Application Works

```text
             ┌─────────────────────┐
             │       Frontend       │
             │ HTML + CSS + JS      │
             └──────────┬──────────┘
                        │
                        │ HTTP Requests
                        ▼
             ┌─────────────────────┐
             │      Node.js        │
             │     Express.js      │
             │      REST API       │
             └──────────┬──────────┘
                        │
                        │ Mongoose
                        ▼
             ┌─────────────────────┐
             │      MongoDB        │
             │                     │
             │ Users + Transactions│
             └─────────────────────┘
```

---

## 📊 Project Highlights

- Full-stack web application
- **Node.js-based backend**
- **MongoDB database integration**
- REST API implementation
- User signup and login
- Income and expense tracking
- Transaction management
- Clean and simple dashboard interface
- Separation of frontend and backend
- Git and GitHub version control

---

## 🎯 Purpose of the Project

This project was developed as a **Full Stack Development (FSD) project** to demonstrate practical implementation of:

- Frontend web development
- Backend development using Node.js
- REST API development using Express.js
- Database management using MongoDB
- Client-server communication
- User authentication
- CRUD operations
- Git and GitHub

---

## 👩‍💻 Author

**Henal Patel**

### GitHub Repository

`https://github.com/henalp07/EXPENSE-TRACKER`

---

## 📄 License

This project is created for educational and academic purposes.
