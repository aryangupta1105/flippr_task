# Quick Start Guide

Get the Flippr application running in 5 minutes!

## 1. Backend Setup (2 minutes)

```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/flippr
PORT=5000
NODE_ENV=development
JWT_SECRET=dev-secret-key-change-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

Start server:
```bash
npm start
```

✅ Backend running on `http://localhost:5000`

## 2. Frontend Setup (2 minutes)

In a new terminal:
```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running on `http://localhost:3000`

## 3. Test Your Setup (1 minute)

### Test Landing Page
1. Open `http://localhost:3000` in browser
2. See "Welcome to Flippr" header
3. Projects and clients sections load

### Test Admin Panel
1. Go to `http://localhost:3000/admin`
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. Access dashboard with 4 tabs

## 4. Add Your First Project

1. In Admin Dashboard → Projects tab
2. Click "+ Add Project"
3. Fill form:
   - Name: "My First Project"
   - Description: "A test project"
   - Click "Upload & Crop Image"
   - Select any image and crop it
4. Click "Create Project"
5. Go to homepage to see it!

## Useful Commands

```bash
# Backend
npm start          # Start server
npm run dev        # Start with auto-reload (need nodemon)

# Frontend
npm run dev        # Development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## Default Credentials

```
Admin Username: admin
Admin Password: admin123
```

⚠️ Change these before deploying!

## Need MongoDB Locally?

Install MongoDB Community:
- [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
- [Mac](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-macos/)
- [Linux](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

Or use MongoDB Atlas (Cloud):
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Update `MONGODB_URI` in `.env`

## Troubleshooting

**Port already in use?**
```bash
# Change PORT in backend .env to 5001, 5002, etc.
```

**Cannot connect to MongoDB?**
```bash
# Make sure MongoDB is running
# Or update MONGODB_URI to MongoDB Atlas connection string
```

**Images not uploading?**
```bash
# Check uploads directory exists: backend/uploads/
# Make sure backend has write permissions
```

**Frontend can't reach backend?**
```bash
# Check vite.config.js proxy points to http://localhost:5000
# Or set VITE_API_URL environment variable
```

---

**You're all set! Happy coding! 🚀**
