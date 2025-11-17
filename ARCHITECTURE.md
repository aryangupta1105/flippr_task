# Flippr - Architecture & Technical Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                  │
│                  Running on :3000 (dev)                     │
├─────────────────────────────────────────────────────────────┤
│  Landing Page │ Admin Login │ Admin Dashboard              │
│   ├─ Projects                                               │
│   ├─ Clients                                                │
│   ├─ Contact Form                                           │
│   └─ Newsletter                                             │
└──────────────────────────┬──────────────────────────────────┘
                           │ REST API (axios)
                           │ /api/* endpoints
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              Backend (Node.js + Express.js)                 │
│                  Running on :5000                           │
├─────────────────────────────────────────────────────────────┤
│  Routes:                                                    │
│  ├─ /api/auth/login                                         │
│  ├─ /api/projects (CRUD)                                    │
│  ├─ /api/clients (CRUD)                                     │
│  ├─ /api/contact (CR + Read)                                │
│  ├─ /api/subscribe (CR + Read)                              │
│  └─ /uploads (static images)                                │
├─────────────────────────────────────────────────────────────┤
│  Middleware:                                                │
│  ├─ CORS                                                    │
│  ├─ JSON Parser                                             │
│  ├─ JWT Authentication                                      │
│  └─ Multer (Image Upload)                                   │
├─────────────────────────────────────────────────────────────┤
│  Services:                                                  │
│  ├─ Image Processing (Sharp)                                │
│  ├─ Authentication (JWT)                                    │
│  └─ File Management                                         │
└──────────────────────────┬──────────────────────────────────┘
                           │ MongoDB Protocol
                           │ (mongoose)
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              MongoDB Database                               │
│         (Local or MongoDB Atlas Cloud)                      │
├─────────────────────────────────────────────────────────────┤
│  Collections:                                               │
│  ├─ projects                                                │
│  ├─ clients                                                 │
│  ├─ contacts                                                │
│  └─ subscribers                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Database Schema

### Projects Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String (required),
  image: String (required, path to image),
  createdAt: Date (default: now)
}
```

### Clients Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  designation: String (required),
  description: String (required),
  image: String (required),
  createdAt: Date (default: now)
}
```

### Contacts Collection
```javascript
{
  _id: ObjectId,
  fullName: String (required),
  email: String (required, validated),
  mobileNumber: String (required),
  city: String (required),
  createdAt: Date (default: now)
}
```

### Subscribers Collection
```javascript
{
  _id: ObjectId,
  email: String (required, unique),
  subscribedAt: Date (default: now)
}
```

---

## API Flow Diagrams

### Authentication Flow
```
User enters credentials
         ↓
POST /api/auth/login
         ↓
Backend validates username/password
         ↓
✓ Valid: Generate JWT token
✗ Invalid: Return 401 error
         ↓
Store token in localStorage
         ↓
Add Authorization header to requests
```

### Project Creation Flow
```
Admin fills form + selects image
         ↓
Image Cropper component
         ↓
Crop image to 450x350
         ↓
POST /api/projects (multipart/form-data)
         ↓
Backend receives image + form data
         ↓
Sharp processes image (resize, crop, convert to WebP)
         ↓
Save image to /uploads directory
         ↓
Create MongoDB document
         ↓
Return success response
         ↓
Frontend updates project list
         ↓
Display on homepage
```

### Contact Form Submission Flow
```
User fills contact form on landing page
         ↓
POST /api/contact (JSON)
         ↓
Backend validates data
         ↓
Store in MongoDB
         ↓
Return success
         ↓
Frontend shows success message
         ↓
Admin sees in Contacts tab
```

---

## Component Hierarchy

### Frontend Structure
```
App.jsx (Router Setup)
├── HomePage.jsx
│   ├── Header (Hero Section)
│   ├── ProjectCard (multiple)
│   ├── ClientCard (multiple)
│   ├── ContactForm
│   └── NewsletterSection
├── AdminLoginPage.jsx
└── AdminDashboardPage.jsx
    ├── ProjectManagement
    │   ├── ImageCropper
    │   └── ProjectCard (admin version)
    ├── ClientManagement
    │   ├── ImageCropper
    │   └── ClientCard (admin version)
    ├── ContactManagement
    │   └── Contact Table
    └── SubscriberManagement
        └── Subscriber Table
```

---

## File Upload & Image Processing Pipeline

```
1. User selects file
   ↓
2. Frontend ImageCropper component
   - Validates file type (JPEG, PNG, WebP)
   - Displays preview
   - Allows user to crop
   ↓
3. Cropped image as Blob
   ↓
4. FormData with cropped image
   ↓
5. POST to backend with multipart/form-data
   ↓
6. Backend Multer middleware
   - Receives in memory
   - Validates MIME type
   ↓
7. Sharp image processing
   - Resize to 450x350
   - Convert to WebP
   - Compress (quality: 80)
   ↓
8. Save to /uploads directory
   - Filename: {timestamp}-{random}.webp
   ↓
9. Store path in MongoDB
   - Example: /uploads/1234567890-123456789.webp
   ↓
10. Serve via Express static middleware
    - URL: /uploads/filename.webp
```

---

## Authentication & Authorization

### JWT Token Structure
```
Header.Payload.Signature

Payload:
{
  "username": "admin",
  "iat": 1234567890,
  "exp": 1234567890 + 7 days
}
```

### Protected Routes
- All POST/PUT/DELETE to admin resources require JWT
- GET endpoints are public
- Token validation happens in auth middleware
- Token stored in localStorage on client

### Admin Verification
```javascript
// Before admin operation:
1. Check if token exists in localStorage
2. Send Authorization header: Bearer <token>
3. Backend verifies token signature
4. If valid: proceed with operation
5. If invalid: return 401 Unauthorized
6. Frontend redirects to login
```

---

## Error Handling Strategy

### Frontend Error Handling
```
Try-Catch around API calls
         ↓
Catch error
         ↓
Check error.response?.status
         ↓
401: Redirect to login (clear token)
400: Show validation error message
404: Show not found error
500: Show server error message
Network error: Show offline message
         ↓
Display user-friendly message
```

### Backend Error Handling
```
Request comes in
         ↓
Validation middleware
         ↓
If invalid: return 400
         ↓
Database operation
         ↓
If error: return 500 with error message
         ↓
Success: return appropriate status code
```

---

## Performance Considerations

### Frontend
- React lazy loading components (if needed)
- Image optimization (WebP format)
- CSS bundling with Tailwind
- Minified production build with Vite
- API caching considerations

### Backend
- Database indexing on frequently queried fields
- Image processing with Sharp (efficient)
- JWT validation is stateless (fast)
- MongoDB connection pooling
- No blocking operations

### Database
- Index on email field (unique in subscribers)
- Index on createdAt for sorting
- TTL index for temporary data (optional)

---

## Security Features

### Authentication
- JWT tokens with expiration (7 days)
- Stateless authentication
- Token stored in localStorage

### Authorization
- Middleware checks token on protected routes
- Only authenticated admins can modify data

### Input Validation
- Mongoose schema validation
- Email format validation
- Required field validation
- Frontend validation with HTML5

### CORS
- Configured to allow frontend origin
- Prevents unauthorized cross-origin requests

### Image Security
- File type validation (MIME type)
- Size limit (10MB)
- Filename randomization
- Stored outside web root in production

---

## Deployment Architecture

### Development
```
Frontend: http://localhost:3000
Backend: http://localhost:5000
Database: localhost:27017 or MongoDB Atlas
```

### Production
```
Frontend: Vercel.app or Netlify.app
         ↓
         (CDN edge locations)
         ↓
Backend: Render.com or Railway.app
         ↓
         (Docker containers)
         ↓
Database: MongoDB Atlas
         ↓
         (Cloud, automated backups)
```

---

## Scaling Strategies

### Short-term (0-1000 users)
- Current setup is sufficient
- MongoDB Atlas free tier works
- Render free tier acceptable

### Medium-term (1000-10,000 users)
- Upgrade MongoDB to paid tier
- Upgrade backend to paid tier
- Add caching layer (Redis)
- Optimize database queries

### Long-term (10,000+ users)
- Implement image CDN (Cloudinary/AWS S3)
- Database replication
- Load balancer for backend
- Separate auth service
- Microservices architecture

---

## Monitoring & Logging

### What to Monitor
- Backend API response times
- Database query performance
- Error rates
- User activity
- Image upload frequency

### Logging Points
- Authentication attempts
- Database errors
- API errors
- Image processing errors
- Failed requests

### Tools for Production
- DataDog or New Relic for APM
- Sentry for error tracking
- CloudWatch/Render logs
- MongoDB Atlas monitoring

---

## Backup & Recovery

### Database Backups
- MongoDB Atlas automatic backups (paid)
- Manual exports from MongoDB Atlas dashboard
- Regular backup testing

### Code Backups
- GitHub repository
- Branch protection rules
- Release tags for versions

### Disaster Recovery Plan
- Document all credentials (secure)
- Maintain environment variable backups
- Database restore procedure
- Deployment rollback procedure

---

## Technology Decisions

### Why React + Vite?
- Fast development with hot reload
- Optimized production builds
- Modern JavaScript features
- Large ecosystem

### Why Express.js?
- Lightweight and flexible
- Perfect for REST APIs
- Large middleware ecosystem
- Easy to scale

### Why MongoDB?
- Flexible schema for rapid development
- Horizontal scalability
- JSON-like documents match JavaScript
- MongoDB Atlas for managed database

### Why Tailwind CSS?
- Utility-first approach
- Fast development
- Responsive design built-in
- Small production bundle

---

## Future Enhancements

### Possible Features
1. User roles (Super Admin, Admin, Editor)
2. Project categories/filtering
3. Multi-language support (i18n)
4. SEO optimization
5. Blog section
6. Analytics dashboard
7. Email notifications
8. Social media integration
9. Payment integration
10. Client portal

### Code Improvements
1. TypeScript for type safety
2. Unit testing (Jest, Vitest)
3. E2E testing (Cypress, Playwright)
4. GraphQL instead of REST
5. WebSocket for real-time updates
6. Rate limiting
7. Request logging
8. API versioning

---

**This completes the technical documentation for Flippr! 🚀**
