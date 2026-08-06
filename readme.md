# Products Filter (QUERY Method implementation)

**Live Demo:** [https://product-filter-two-kappa.vercel.app/](https://product-filter-two-kappa.vercel.app/)

This project demonstrates a full-stack product filtering application. It specifically highlights the usage of the modern HTTP `QUERY` method for fetching filtered data, showcasing an alternative to the traditional `GET` or `POST` methods for complex search operations.

## The Problem with Traditional Methods

When implementing complex filtering logic (e.g., deeply nested objects, arrays, or multiple parameters), developers traditionally rely on two methods: `GET` and `POST`. Both have significant drawbacks for complex read operations:

### The Problem with `GET` method:
- **URL Length Limitations**: Complex filtering logic often requires deeply nested objects or arrays. When these are converted into a flat URL query string, the URL can become excessively long. This can cause some CDN or proxy servers to reject the request.
- **Data Reconstruction Overhead**: On the server side, the data arrives as a flat string within the URL. Developers must manually reconstruct this into a structured format (e.g., converting strings to numbers, handling booleans, and parsing arrays), which leads to extra, unnecessary parsing code.

### What makes `QUERY` safer than `POST` requests?
While `POST` allows a request body (solving the URL length and data structure problems of `GET`), it is semantically incorrect for fetching data. `QUERY` is a safer and better alternative:
- **Safe Operation**: Unlike `POST`, which is generally used for state-changing operations (like creating or updating data), `QUERY` is explicitly defined as a safe method. It tells proxy servers, CDNs, and developers that the request is read-only and will not modify the server's database.
- **Idempotency**: The `QUERY` method is idempotent, meaning that sending the same request multiple times will not result in unintended side effects or duplicate data entries, making it more predictable for network operations and caching layers.
- **Semantic Clarity**: Using `POST` for search creates a "semantic gap"—it hides the true intent of the request. `QUERY` provides a clear, standardized way to fetch data with a request body, ensuring that intermediaries (like caching systems) can correctly handle the request as a read-only query rather than an action that might trigger a database change.

---

## Tech Stack

**Frontend:**
- [React](https://react.dev/) (v19)
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [DaisyUI](https://daisyui.com/) - Tailwind CSS component library

**Backend:**
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/) - Web framework for Node.js

**Database:**
- [MongoDB](https://www.mongodb.com/) (Atlas) - NoSQL database

---

## How to Run the Project Locally

Follow these steps to run the full-stack application on your local machine.

### Prerequisites
- Node.js installed on your machine
- A MongoDB URI (e.g., a free cluster on MongoDB Atlas)

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd Products-Filter
```

### 2. Setup the Backend (Server-side)
Navigate to the `server-side` directory, install dependencies, and setup your environment variables.

```bash
cd server-side
npm install
```

Create a `.env` file in the `server-side` folder and add your configuration:
```env
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

Start the backend server using nodemon:
```bash
npm run dev
# The server will run on http://localhost:3000
```

### 3. Setup the Frontend (Client-side)
Open a new terminal window/tab, navigate to the `client-side` directory, and install dependencies.

```bash
cd client-side
npm install
```

Start the frontend development server:
```bash
npm run dev
# The frontend will typically run on http://localhost:5173
```

Your application should now be fully running locally. You can access the client interface in your browser and it will communicate with your local backend using the `QUERY` method!
