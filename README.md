# Flippr - Complete Full-Stack Web Application

A modern full-stack web application built with React, Node.js, Express, and MongoDB. Features a beautiful landing page with project showcase, client testimonials, contact form, and a secure admin dashboard for managing content.

## 🚀 Features

### Landing Page
- **Our Projects Section**: Display all projects with images, names, and descriptions
- **Happy Clients Section**: Showcase client testimonials and designations
- **Contact Form**: Beautiful contact form to collect inquiries
- **Newsletter Subscription**: Email subscription functionality
- **Responsive Design**: Works seamlessly on all devices

### Admin Dashboard
- **Secure Authentication**: Admin login with JWT tokens
- **Project Management**: Add, edit, delete projects with image cropping
- **Client Management**: Manage client testimonials with images
- **Contact Submissions**: View and manage form submissions
- **Subscriber Management**: Monitor newsletter subscribers
- **Image Cropping**: Automatic image cropping to 450x350 dimensions

## 📋 System Requirements

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (for cloud database)
- Git

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd flippr
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flippr?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here_change_in_production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

Replace the MongoDB URI with your MongoDB Atlas connection string.

Start the backend server:

```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📚 API Documentation

### Authentication

**POST** `/api/auth/login`
- Authenticate admin user
- Body: `{ username: string, password: string }`
- Response: `{ token: string, message: string }`

### Projects

- **GET** `/api/projects` - Get all projects
- **GET** `/api/projects/:id` - Get single project
- **POST** `/api/projects` - Create project (admin only)
- **PUT** `/api/projects/:id` - Update project (admin only)
- **DELETE** `/api/projects/:id` - Delete project (admin only)

### Clients

- **GET** `/api/clients` - Get all clients
- **GET** `/api/clients/:id` - Get single client
- **POST** `/api/clients` - Create client (admin only)
- **PUT** `/api/clients/:id` - Update client (admin only)
- **DELETE** `/api/clients/:id` - Delete client (admin only)

### Contact

- **POST** `/api/contact` - Submit contact form
- **GET** `/api/contact` - Get all contacts (admin only)
- **DELETE** `/api/contact/:id` - Delete contact (admin only)

### Subscribers

- **POST** `/api/subscribe` - Subscribe to newsletter
- **GET** `/api/subscribe` - Get all subscribers (admin only)
- **DELETE** `/api/subscribe/:id` - Delete subscriber (admin only)

## 🔐 Default Admin Credentials

```
Username: admin
Password: admin123
```

**⚠️ Important**: Change these credentials in production!

## 🎨 Technology Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- React Image Crop

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (File uploads)
- Sharp (Image processing)

## 📦 Project Structure

```
flippr/
├── backend/
│   ├── models/
│   │   ├── Project.js
│   │   ├── Client.js
│   │   ├── Contact.js
│   │   └── Subscriber.js
│   ├── routes/
│   │   ├── projects.js
│   │   ├── clients.js
│   │   ├── contact.js
│   │   └── subscribers.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── uploads/ (for storing images)
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ClientCard.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   ├── NewsletterSection.jsx
│   │   │   ├── ImageCropper.jsx
│   │   │   ├── ProjectManagement.jsx
│   │   │   ├── ClientManagement.jsx
│   │   │   ├── ContactManagement.jsx
│   │   │   ├── SubscriberManagement.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── AdminLoginPage.jsx
│   │   │   └── AdminDashboardPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── auth.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── README.md
```

## 🚀 Deployment Guide

### Database Setup (MongoDB Atlas)

1. Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Whitelist your IP address
6. Use the connection string in your `.env` file

### Backend Deployment (Render)

1. **Create a Render account** at [render.com](https://render.com)

2. **Push your code to GitHub**

3. **Create a new Web Service:**
   - Connect your GitHub repository
   - Select the `backend` directory as the root directory
   - Set environment variables:
     ```
     MONGODB_URI=<your-mongodb-uri>
     PORT=5000
     NODE_ENV=production
     JWT_SECRET=<strong-secret-key>
     ADMIN_USERNAME=<new-admin-username>
     ADMIN_PASSWORD=<strong-admin-password>
     ```
   - Build command: `npm install`
   - Start command: `npm start`

4. **Deploy** and note your backend URL (e.g., `https://flippr-backend.render.com`)

### Frontend Deployment (Vercel)

1. **Create a Vercel account** at [vercel.com](https://vercel.com)

2. **Import your GitHub repository**

3. **Configure the project:**
   - Select `frontend` as the root directory
   - Set environment variable:
     ```
     VITE_API_URL=<your-render-backend-url>
     ```
   - Build command: `npm run build`
   - Output directory: `dist`

4. **Deploy** and get your frontend URL

### Alternative Deployment Options

**Frontend:**
- Netlify (drag & drop or GitHub integration)
- GitHub Pages
- AWS S3 + CloudFront

**Backend:**
- Railway.app
- Heroku (Note: Free tier has ended)
- AWS EC2
- DigitalOcean

## 🔧 Environment Variables

### Backend (.env)

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flippr?retryWrites=true&w=majority

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_key_here

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Frontend (.env.local) - Optional

```env
VITE_API_URL=http://localhost:5000/api
```

## 📝 Usage Guide

### For Users

1. Visit the landing page to view projects and clients
2. Fill out the contact form to send an inquiry
3. Subscribe to the newsletter with your email

### For Admins

1. Navigate to `/admin`
2. Login with your credentials
3. Use the dashboard tabs to manage:
   - **Projects**: Add, edit, delete projects
   - **Clients**: Manage client testimonials
   - **Contacts**: View form submissions
   - **Subscribers**: Manage newsletter subscribers

## 🖼️ Image Management

Images are automatically:
- Validated (JPEG, PNG, WebP only)
- Cropped to 450x350 pixels
- Compressed to WebP format
- Stored in the backend's `/uploads` directory

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- CORS enabled for safe cross-origin requests
- Input validation on both frontend and backend
- MongoDB schema validation
- Protected admin routes

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Ensure port 5000 is not in use
- Check all environment variables are set

### Images not uploading
- Verify file size is under 10MB
- Check image format (JPEG, PNG, WebP)
- Ensure `/uploads` directory exists and is writable

### Frontend can't connect to backend
- Check backend is running on port 5000
- Verify CORS is enabled
- Check the API URL in vite.config.js

### Login not working
- Verify admin credentials in .env
- Check JWT_SECRET is set
- Clear browser localStorage and try again

## 📄 License

This project is licensed under the MIT License.

## 👤 Support

For issues and questions, please create an issue in the repository or contact the development team.

---

**Happy coding! 🚀**
