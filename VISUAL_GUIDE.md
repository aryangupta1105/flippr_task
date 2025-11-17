# 🗺️ FLIPPR - Visual Guide & Diagrams

## 📊 Application Flow Diagram

```
USER VISITS LANDING PAGE
        ↓
┌─────────────────────────────────┐
│   LANDING PAGE (Public)         │
│  http://localhost:3000          │
├─────────────────────────────────┤
│ Hero Section                    │
│ ↓ Calls GET /api/projects      │
│ Projects Section (3+ Projects) │
│ ↓ Calls GET /api/clients       │
│ Happy Clients Section           │
│ ↓ Contact Form                 │
│ Contact Form (POST /api/contact) │
│ ↓ Newsletter                    │
│ Newsletter (POST /api/subscribe) │
│ ↓ Footer                        │
└─────────────────────────────────┘
        ↓
    USER CLICKS "ADMIN"
        ↓
┌─────────────────────────────────┐
│   ADMIN LOGIN PAGE              │
│  http://localhost:3000/admin    │
├─────────────────────────────────┤
│ Enter username & password       │
│ POST /api/auth/login            │
│ ↓                               │
│ ✓ Valid → Get JWT token        │
│ ✗ Invalid → Show error         │
└─────────────────────────────────┘
        ↓ (if valid)
┌─────────────────────────────────┐
│   ADMIN DASHBOARD               │
│  http://localhost:3000/admin/   │
│  dashboard                      │
├─────────────────────────────────┤
│ Tab Navigation:                 │
│  ✓ Projects   (CRUD)           │
│  ✓ Clients    (CRUD)           │
│  ✓ Contacts   (View/Delete)    │
│  ✓ Subscribers (View/Delete)   │
└─────────────────────────────────┘
```

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│                    FRONTEND (React)                      │
│                   Port: 3000 (Dev)                       │
│                                                          │
│  ┌─────────────┬──────────────┬──────────────┐          │
│  │  Landing    │  Admin Login │   Admin      │          │
│  │    Page     │     Page     │  Dashboard   │          │
│  └─────────────┴──────────────┴──────────────┘          │
│         ↓              ↓              ↓                  │
│    REST API Calls (axios)                               │
│         ↓              ↓              ↓                  │
└──────────────────────────────────────────────────────────┘
                        ↓ (HTTP)
┌──────────────────────────────────────────────────────────┐
│                                                          │
│               BACKEND (Node + Express)                   │
│                  Port: 5000 (Dev)                        │
│                                                          │
│  ┌────────────────────────────────────────────────┐     │
│  │         API Routes & Middleware                │     │
│  │  ┌──────────────────────────────────────────┐ │     │
│  │  │  Authentication Middleware (JWT)         │ │     │
│  │  │  Image Upload Middleware (Multer)        │ │     │
│  │  │  CORS Middleware                         │ │     │
│  │  │  JSON Parser Middleware                  │ │     │
│  │  └──────────────────────────────────────────┘ │     │
│  │                                                │     │
│  │  ┌──────────────────────────────────────────┐ │     │
│  │  │  Route Handlers                          │ │     │
│  │  │  /auth/login                             │ │     │
│  │  │  /projects (CRUD)                        │ │     │
│  │  │  /clients (CRUD)                         │ │     │
│  │  │  /contact (Create, Read)                 │ │     │
│  │  │  /subscribe (Create, Read)               │ │     │
│  │  │  /uploads (Static images)                │ │     │
│  │  └──────────────────────────────────────────┘ │     │
│  │                                                │     │
│  │  ┌──────────────────────────────────────────┐ │     │
│  │  │  Services                                │ │     │
│  │  │  Image Processing (Sharp)                │ │     │
│  │  │  Authentication (JWT)                    │ │     │
│  │  │  Data Validation                         │ │     │
│  │  └──────────────────────────────────────────┘ │     │
│  └────────────────────────────────────────────────┘     │
│         ↓ (MongoDB Protocol)                            │
└──────────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────────┐
│                                                          │
│           DATABASE (MongoDB Atlas / Local)               │
│                                                          │
│  ┌─────────────┬──────────────┬──────────────┐          │
│  │  Projects   │   Clients    │  Contacts    │          │
│  │ Collection  │ Collection   │ Collection   │          │
│  └─────────────┴──────────────┴──────────────┘          │
│                                                          │
│  ┌──────────────────────────────────┐                  │
│  │   Subscribers Collection         │                  │
│  └──────────────────────────────────┘                  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagram

### Project Creation Flow
```
Admin Dashboard
    ↓
[Fill Form: Name, Description]
    ↓
[Select Image File]
    ↓
Image Cropper Component
    ↓
[Crop to 450x350 and Save]
    ↓
[POST /api/projects + FormData]
    ↓
Backend receives request
    ↓
[Check JWT Token] ← Valid?
    ↓ Yes
[Validate Form Data]
    ↓ Valid?
    ↓ Yes
[Process Image with Sharp]
    ↓
[Resize to 450x350]
    ↓
[Convert to WebP]
    ↓
[Save to /uploads directory]
    ↓
[Create MongoDB Document]
    ↓
[Return Success Response]
    ↓
Admin Dashboard Updates
    ↓
Project appears in list
    ↓
Homepage fetches projects
    ↓
Project displays on landing page
```

### Contact Form Submission Flow
```
User fills form on landing page
├─ Full Name
├─ Email
├─ Mobile Number
└─ City
    ↓
Form Validation
    ↓
[All required fields filled?]
    ↓ Yes
[Email format valid?]
    ↓ Yes
[POST /api/contact]
    ↓
Backend receives data
    ↓
[Validate all fields]
    ↓
[Check email format]
    ↓
[Create MongoDB document]
    ↓
[Return success response]
    ↓
Frontend shows success message
    ↓
Form clears
    ↓
Admin sees in Contacts tab
```

---

## 📱 Component Tree

```
<App />
├── <Router>
│   ├── <Route path="/">
│   │   └── <HomePage>
│   │       ├── <Header>
│   │       ├── <ProjectCard /> (multiple)
│   │       ├── <ClientCard /> (multiple)
│   │       ├── <ContactForm>
│   │       │   └── [Form fields]
│   │       ├── <NewsletterSection>
│   │       │   └── [Email input]
│   │       └── <Footer>
│   │
│   ├── <Route path="/admin">
│   │   └── <AdminLoginPage>
│   │       └── [Login form]
│   │
│   └── <Route path="/admin/dashboard">
│       └── <ProtectedRoute>
│           └── <AdminDashboardPage>
│               ├── <ProjectManagement>
│               │   ├── <ImageCropper />
│               │   └── [Project form & list]
│               ├── <ClientManagement>
│               │   ├── <ImageCropper />
│               │   └── [Client form & list]
│               ├── <ContactManagement>
│               │   └── [Contacts table]
│               └── <SubscriberManagement>
│                   └── [Subscribers table]
```

---

## 🗄️ Database Schema Relationships

```
┌──────────────────────────────────────┐
│       PROJECTS COLLECTION            │
├──────────────────────────────────────┤
│ _id: ObjectId (Primary Key)          │
│ name: String                         │
│ description: String                  │
│ image: String (path to image)        │
│ createdAt: Date                      │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│        CLIENTS COLLECTION            │
├──────────────────────────────────────┤
│ _id: ObjectId (Primary Key)          │
│ name: String                         │
│ designation: String                  │
│ description: String                  │
│ image: String (path to image)        │
│ createdAt: Date                      │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│       CONTACTS COLLECTION            │
├──────────────────────────────────────┤
│ _id: ObjectId (Primary Key)          │
│ fullName: String                     │
│ email: String (indexed)              │
│ mobileNumber: String                 │
│ city: String                         │
│ createdAt: Date                      │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│      SUBSCRIBERS COLLECTION          │
├──────────────────────────────────────┤
│ _id: ObjectId (Primary Key)          │
│ email: String (unique indexed)       │
│ subscribedAt: Date                   │
└──────────────────────────────────────┘
```

---

## 🔐 Authentication Flow

```
User visits /admin
    ↓
[Login Page displayed]
    ↓
User enters credentials
├─ Username: admin
└─ Password: admin123
    ↓
[Form submitted]
    ↓
[POST /api/auth/login]
    ↓
Backend receives credentials
    ↓
[Check username & password]
    ↓ Match?
    ├─ Yes: Generate JWT token
    ├─ No: Return 401 error
    ↓
Token returned to frontend
    ↓
[Store in localStorage]
    ↓
[Redirect to /admin/dashboard]
    ↓
Protected component checks token
    ↓
[Token valid?]
    ├─ Yes: Display dashboard
    └─ No: Redirect to login
    ↓
Every API request includes token
    ├─ Header: Authorization: Bearer <token>
    ↓
Backend verifies token
    ├─ Valid: Process request
    └─ Invalid: Return 401 error
```

---

## 📤 Image Upload & Processing Pipeline

```
User clicks "Upload Image"
    ↓
[File picker opens]
    ↓
User selects image file
    ↓
[Frontend validates]
    ├─ File type check (JPEG, PNG, WebP)
    ├─ File size check (< 10MB)
    └─ Format check
    ↓ Valid?
    ├─ No: Show error message
    └─ Yes: Continue
    ↓
[ImageCropper component opens]
    ↓
[Display image preview]
    ↓
User adjusts crop area
    ├─ Dimensions: 450x350 (fixed ratio)
    ├─ Position: Draggable
    └─ Size: Resizable
    ↓
[User clicks "Save Cropped Image"]
    ↓
[Convert canvas to Blob]
    ↓
[Create File object from Blob]
    ↓
[Add to FormData]
    ↓
[POST to /api/projects or /api/clients]
    ↓
Backend receives FormData
    ↓
[Multer middleware processes]
    ├─ Reads file into memory
    ├─ Validates MIME type
    └─ Passes to next middleware
    ↓
[Sharp image processing]
    ├─ Resize to 450x350
    ├─ Crop center (fit: cover)
    ├─ Convert to WebP
    └─ Compress (quality: 80)
    ↓
[Generate unique filename]
    ├─ Format: {timestamp}-{random}.webp
    └─ Example: 1234567890-123456789.webp
    ↓
[Save to /uploads directory]
    ├─ Path: backend/uploads/
    └─ Accessible via: /uploads/filename
    ↓
[Store path in MongoDB]
    ├─ Document field: image
    └─ Value: /uploads/filename.webp
    ↓
[Return success response]
    ↓
Frontend updates
    ├─ Project/Client list refreshes
    └─ New image displays
    ↓
Image served to users
    ├─ Via: /uploads/filename.webp
    └─ Displayed on landing page
```

---

## 🌐 Request/Response Cycle

### Landing Page Loading
```
Browser: GET /
    ↓
Vite serves index.html
    ↓
React renders App
    ↓
HomePage component mounts
    ↓
useEffect runs
    ↓
axios.get('/api/projects')
    ↓
Request reaches backend
    ↓
Backend: GET /api/projects
    ↓
Query MongoDB
    ↓
Return projects array
    ↓
Frontend receives response
    ↓
setProjects(response.data)
    ↓
Component re-renders
    ↓
Projects display on page
```

### Admin Dashboard Loading
```
Browser: GET /admin/dashboard
    ↓
ProtectedRoute checks localStorage
    ↓
Token exists?
    ├─ No: Redirect to /admin
    └─ Yes: Continue
    ↓
React renders AdminDashboardPage
    ↓
Component mounts
    ↓
axios.get('/api/projects', {
  headers: { Authorization: `Bearer ${token}` }
})
    ↓
Backend receives request
    ↓
Verify token in middleware
    ↓
Token valid?
    ├─ No: Return 401
    └─ Yes: Continue
    ↓
GET /api/projects
    ↓
Query MongoDB for projects
    ↓
Return array
    ↓
Frontend displays project list
```

---

## 📊 API Endpoint Map

```
/api/
├── auth/
│   └── login (POST)
│
├── projects/
│   ├── / (GET) - public
│   ├── / (POST) - admin only
│   ├── /:id (GET) - public
│   ├── /:id (PUT) - admin only
│   └── /:id (DELETE) - admin only
│
├── clients/
│   ├── / (GET) - public
│   ├── / (POST) - admin only
│   ├── /:id (GET) - public
│   ├── /:id (PUT) - admin only
│   └── /:id (DELETE) - admin only
│
├── contact/
│   ├── / (POST) - public
│   ├── / (GET) - admin only
│   └── /:id (DELETE) - admin only
│
├── subscribe/
│   ├── / (POST) - public
│   ├── / (GET) - admin only
│   └── /:id (DELETE) - admin only
│
├── health (GET) - public
│
└── /uploads/* (GET) - static files
```

---

## 🎨 File Organization Map

```
flippr/
│
├── 🔥 Backend Logic
│   ├── server.js (main entry, routes, middleware)
│   ├── models/ (database schemas)
│   │   ├── Project.js
│   │   ├── Client.js
│   │   ├── Contact.js
│   │   └── Subscriber.js
│   ├── routes/ (API endpoints)
│   │   ├── projects.js
│   │   ├── clients.js
│   │   ├── contact.js
│   │   └── subscribers.js
│   ├── middleware/ (req processing)
│   │   ├── auth.js
│   │   └── upload.js
│   └── uploads/ (images)
│
├── ⚛️ Frontend UI
│   ├── src/
│   │   ├── App.jsx (main router)
│   │   ├── pages/ (full pages)
│   │   │   ├── HomePage.jsx
│   │   │   ├── AdminLoginPage.jsx
│   │   │   └── AdminDashboardPage.jsx
│   │   ├── components/ (reusable)
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
│   │   ├── services/ (API calls)
│   │   │   └── api.js
│   │   ├── utils/ (helpers)
│   │   │   └── auth.js
│   │   └── index.css (styles)
│   └── index.html
│
└── 📖 Documentation
    ├── README.md
    ├── QUICKSTART.md
    ├── DEPLOYMENT.md
    ├── API_REFERENCE.md
    ├── ARCHITECTURE.md
    ├── TESTING.md
    ├── PROJECT_OVERVIEW.md
    ├── QUICK_REFERENCE.md
    ├── FILE_MANIFEST.md
    └── COMPLETION_SUMMARY.md
```

---

## 📈 Deployment Architecture

### Development
```
http://localhost:3000 (Frontend)
         ↓
http://localhost:5000 (Backend)
         ↓
localhost:27017 (MongoDB)
```

### Production
```
vercel.app (Frontend CDN)
         ↓
render.com (Backend Container)
         ↓
MongoDB Atlas (Cloud Database)
```

---

## 🎯 Feature Completion Map

```
Landing Page
├── ✅ Header/Hero
├── ✅ Projects Section
│   ├── ✅ Fetch from API
│   ├── ✅ Display images
│   └── ✅ Read More button
├── ✅ Clients Section
│   ├── ✅ Fetch from API
│   ├── ✅ Show testimonials
│   └── ✅ Display designations
├── ✅ Contact Form
│   ├── ✅ All fields
│   ├── ✅ Validation
│   └── ✅ Submit to API
├── ✅ Newsletter
│   ├── ✅ Email input
│   ├── ✅ Subscribe button
│   └── ✅ Duplicate prevention
└── ✅ Footer

Admin Panel
├── ✅ Login Page
│   ├── ✅ Form validation
│   └── ✅ JWT token
├── ✅ Dashboard
│   ├── ✅ Tab navigation
│   ├── ✅ Logout button
│   └── ✅ Protection
├── ✅ Projects Management
│   ├── ✅ View all
│   ├── ✅ Add new
│   ├── ✅ Edit existing
│   ├── ✅ Delete
│   └── ✅ Image cropping
├── ✅ Clients Management
│   ├── ✅ View all
│   ├── ✅ Add new
│   ├── ✅ Edit existing
│   ├── ✅ Delete
│   └── ✅ Image cropping
├── ✅ Contact Viewer
│   ├── ✅ View all submissions
│   ├── ✅ Display in table
│   └── ✅ Delete
└── ✅ Subscriber Viewer
    ├── ✅ View all subscribers
    ├── ✅ Display in table
    └── ✅ Delete

Backend API
├── ✅ Authentication
│   └── ✅ Login endpoint
├── ✅ Projects CRUD
│   ├── ✅ Create
│   ├── ✅ Read (all & single)
│   ├── ✅ Update
│   └── ✅ Delete
├── ✅ Clients CRUD
│   ├── ✅ Create
│   ├── ✅ Read (all & single)
│   ├── ✅ Update
│   └── ✅ Delete
├── ✅ Contacts
│   ├── ✅ Create
│   ├── ✅ Read
│   └── ✅ Delete
├── ✅ Subscribers
│   ├── ✅ Create
│   ├── ✅ Read
│   └── ✅ Delete
└── ✅ Images
    ├── ✅ Upload
    ├── ✅ Process (crop, resize)
    └── ✅ Serve static
```

---

**All diagrams and flowcharts are complete! 🎉**
