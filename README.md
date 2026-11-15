# MongoDB & Mongoose Practice

A hands-on practice repository for mastering **MongoDB** with **Mongoose** and **Express.js** in a modern Node.js (ES Modules) environment. This project demonstrates database connection handling, schema definition, nested documents, relational references, and REST API development following the MVC (Model-View-Controller) pattern.

---

## 🚀 Tech Stack

- **Runtime:** Node.js (ES Modules, `type: "module"`)
- **Framework:** Express.js (v5)
- **ODM (Object Data Modeling):** Mongoose (v8) / MongoDB Driver (v6)
- **Environment Management:** Dotenv
- **Dev Tooling:** Nodemon

---

## 📁 Project Structure

```text
mongoDB_Practice/
├── controllers/
│   ├── post.controller.js     # Post business logic (bulk insertion, etc.)
│   └── user.controller.js     # User business logic (creation, etc.)
├── models/
│   ├── post.model.js          # Post Mongoose schema & model with references
│   └── user.model.js          # User Mongoose schema & model with nested documents
├── routes/
│   ├── post.route.js          # Post REST endpoints
│   └── user.route.js          # User REST endpoints
├── .env                       # Environment variables (kept private via .gitignore)
├── .gitignore                 # Files and directories ignored by Git
├── example.env                # Template for environment variables
├── index.js                   # Express server entry point & MongoDB connection
├── package.json               # Project dependencies and npm scripts
└── README.md                  # Project documentation & run guide
```

---

## 🧠 Key Learnings & Concepts

### 1. Database Connection & Lifecycle
- Connecting an Express application to MongoDB using `mongoose.connect()`.
- Managing connection states and handling connection errors asynchronously via Promises (`.then()` / `.catch()`).
- Securing sensitive credentials with `dotenv` via environment variables (`mongoDB_CONNECTION_STRING`).

### 2. Schema Design & Data Validation
- Defining structured schemas with `mongoose.Schema` using native JavaScript types (`String`, `Number`, `Boolean`, `Date`, `Array`, `ObjectId`).
- Enforcing field requirements (`required: true`) and unique indexes (`unique: true`).
- Enabling automatic audit timestamps (`createdAt`, `updatedAt`) using `{ timestamps: true }`.

### 3. Embedded Documents vs. Referencing
- **Embedded / Nested Objects:** Storing sub-documents directly (e.g., `profile: { age, city, skills: [String] }` inside `User`) for tightly coupled data.
- **Relational Referencing (`ObjectId` & `ref`):** Linking documents across collections (e.g., `author: { type: mongoose.Types.ObjectId, ref: 'User' }` in `Post`) to establish one-to-many relationships without data duplication.

### 4. Basic CRUD & Data Manipulation
- Single document creation (`User.insertOne` / `User.create`).
- Bulk document creation using `Post.insertMany()` for high-throughput batch operations.
- Parsing incoming JSON request bodies using `express.json()` middleware.

### 5. Architectural Cleanliness (MVC)
- Separation of concerns:
  - **Models:** Defining data structure, validation rules, and collection mapping.
  - **Controllers:** Handling request validation, business logic, and response formatting.
  - **Routes:** Defining HTTP verbs and mapping URL paths to controllers.
- Using modern ES Module syntax (`import` / `export`) throughout the application.

---

## 🗄️ Data Models

### User Schema (`models/user.model.js`)
```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: String,
  profile: {
    age: Number,
    city: String,
    skills: [String]
  },
  timestamps: true // adds createdAt, updatedAt automatically
}
```

### Post Schema (`models/post.model.js`)
```javascript
{
  title: String,
  content: String,
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User' // Foreign reference to the User model
  },
  tags: [String],
  published: Boolean,
  publishedAt: Date,
  views: Number,
  likes: Number,
  comments: [Number]
}
```

---

## 💻 How to Run the Project

### Prerequisites
Before running the project, ensure you have:
- **Node.js** (v18 or higher recommended) installed: `node -v`
- **MongoDB** running either:
  - Locally via MongoDB Community Server (`mongodb://127.0.0.1:27017/practice`)
  - Or a cloud cluster via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/snoopdeep/mongodb-practice.git
cd mongodb-practice
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory (you can copy `example.env`):
```bash
cp example.env .env
```

Open `.env` and fill in your connection details:
```env
PORT=5000
mongoDB_CONNECTION_STRING=mongodb://127.0.0.1:27017/mongodb_practice
```
*(Replace with your MongoDB Atlas URI if using cloud database)*

### Step 4: Start the Server
Run the project with auto-reloading using `nodemon`:
```bash
npm start
```

Expected terminal output:
```text
server is starting at port 5000
Connected to database!
```

---

## 🧪 Testing the API Endpoints

You can test the endpoints using **Postman**, **Thunder Client**, or **cURL**:

### 1. Create a User (`POST /api/v1/user`)
**Request:**
```bash
curl -X POST http://localhost:5000/api/v1/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Deepak Singh",
    "email": "deepak@example.com",
    "role": "developer",
    "profile": {
      "age": 24,
      "city": "Bengaluru",
      "skills": ["JavaScript", "Node.js", "MongoDB"]
    }
  }'
```

**Expected Response (201 Created):**
```json
{
  "acknowledged": true,
  "insertedId": "65f0123456789abcdef01234"
}
```

---

### 2. Insert Multiple Posts (`POST /api/v1/post`)
**Request:**
```bash
curl -X POST http://localhost:5000/api/v1/post \
  -H "Content-Type: application/json" \
  -d '[
    {
      "title": "Getting Started with Mongoose",
      "content": "Mongoose makes schema validation simple and elegant in Node.js.",
      "author": "65f0123456789abcdef01234",
      "tags": ["mongodb", "nodejs", "mongoose"],
      "published": true,
      "publishedAt": "2026-11-15T00:00:00.000Z",
      "views": 150,
      "likes": 25,
      "comments": []
    }
  ]'
```

---

## 🔮 Next Practice Steps
- [ ] Add query population (`.populate('author')`) to join author details when fetching posts.
- [ ] Complete full CRUD endpoints:
  - `GET /api/v1/user/:id` - Fetch user by ID
  - `PUT /api/v1/user/:id` - Update user details
  - `DELETE /api/v1/user/:id` - Remove user
- [ ] Implement error-handling middleware.
- [ ] Practice MongoDB aggregation pipelines (`$match`, `$group`, `$sort`).
