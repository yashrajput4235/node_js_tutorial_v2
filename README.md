# Restaurant Management API 🍽️

A robust RESTful API built with Node.js, Express, and MongoDB for managing restaurant operations, including staff (Persons) and menu items.

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)
[![Express Version](https://img.shields.io/badge/express-^4.0.0-blue.svg)](https://expressjs.com/)
[![Mongoose](https://img.shields.io/badge/mongoose-^8.0.0-red.svg)](https://mongoosejs.com/)

---

## 🚀 Features

- **Staff Management**: Create, Read, Update, and Delete (CRUD) operations for restaurant staff.
- **Menu Management**: Manage your restaurant's offerings with categories like breakfast, lunch, and dinner.
- **Database Integration**: Reliable data persistence using MongoDB and Mongoose.
- **Structured Routes**: Clean and organized codebase with dedicated route handlers.
- **Validation**: Strict schema validation for data integrity.

---

## 🛠️ Tech Stack

- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Middleware**: [Body-parser](https://www.npmjs.com/package/body-parser)
- **Development**: [Nodemon](https://nodemon.io/)

---

## 📂 Project Structure

```text
├── models/
│   ├── Person.js        # Mongoose schema for staff
│   └── Menu.js          # Mongoose schema for menu items
├── routes/
│   ├── personRoutes.js  # Routes for staff management
│   └── menuRoutes.js    # Routes for menu items
├── db.js                # MongoDB connection setup
├── server.js            # Main application entry point
└── package.json         # Project dependencies and scripts
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd node_tutorial
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Database Setup**:
   Ensure MongoDB is running locally at `mongodb://localhost:27017/motel`.

4. **Start the server**:
   ```bash
   npm start
   # or for development
   npm run dev
   ```
   The server will start at `http://localhost:3001`.

---

## 🛣️ API Endpoints

### 🧑 Staff (Persons)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/person` | Create a new staff member |
| `GET` | `/person` | Get all staff members |
| `GET` | `/person/:workType` | Get staff by role (chef, waiter, etc.) |
| `PUT` | `/person/:id` | Update staff details by ID |
| `DELETE` | `/person/:id` | Remove staff member by ID |

### 🍕 Menu Items
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/menu` | Add a new menu item |
| `GET` | `/menu` | List all menu items |
| `GET` | `/menu/:categoryType` | Filter menu by category (breakfast, lunch, dinner, snack) |

---

## 🧪 Example API Usage

### Create a Person
```bash
curl -X POST http://localhost:3001/person \
-H "Content-Type: application/json" \
-d '{
  "name": "Yash Rajput",
  "age": 25,
  "work": "chef",
  "email": "yash@example.com",
  "mobile": "1234567890",
  "address": "123 Main St",
  "salary": 50000
}'
```

### Get Menu Items
```bash
curl http://localhost:3001/menu
```

---

## 📄 License
This project is licensed under the MIT License.
