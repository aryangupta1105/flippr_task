# 🎯 FLIPPR - Quick Reference Guide

## ⚡ Quick Commands

### Backend Setup & Run
```bash
cd backend
npm install
npm start           # Production mode
npm run dev        # Development with auto-reload
```

### Frontend Setup & Run
```bash
cd frontend
npm install
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview production build
```

### Both at Once
```bash
npm run install-all    # Install both
```

---

## 🌐 URLs Reference

### Development
| Service | URL |
|---------|-----|
| Landing Page | http://localhost:3000 |
| Admin Login | http://localhost:3000/admin |
| Admin Dashboard | http://localhost:3000/admin/dashboard |
| Backend API | http://localhost:5000/api |
| API Health | http://localhost:5000/api/health |

### Production (After Deployment)
| Service | Example |
|---------|---------|
| Landing Page | https://your-app.vercel.app |
| Admin Login | https://your-app.vercel.app/admin |
| Admin Dashboard | https://your-app.vercel.app/admin/dashboard |
| Backend API | https://flippr-backend.render.com/api |

---

## 🔑 Default Credentials

```
Username: admin
Password: admin123
```

⚠️ **Change immediately in production!**

---

## 📋 Essential Files

| Need | File | Location |
|------|------|----------|
| Start Here | QUICKSTART.md | Root |
| Features | README.md | Root |
| Setup Backend | backend/server.js | Backend |
| Setup Frontend | frontend/src/App.jsx | Frontend |
| Config Backend | backend/.env.example | Backend |
| Config Frontend | frontend/.env.example | Frontend |
| Deploy Guide | DEPLOYMENT.md | Root |
| API Endpoints | API_REFERENCE.md | Root |
| Architecture | ARCHITECTURE.md | Root |

---

## 🔄 Common Tasks

### Add a New Project in Admin
1. Go to `/admin/dashboard`
2. Login with credentials
3. Click "Projects" tab
4. Click "+ Add Project"
5. Fill: Name, Description
6. Click "Upload & Crop Image"
7. Select image and crop
8. Click "Create Project"
9. View on homepage

### Submit Contact Form
1. Go to homepage
2. Scroll to "Contact Us" section
3. Fill: Name, Email, Mobile, City
4. Click "Send Message"
5. See success message
6. Check admin panel → Contacts

### Subscribe to Newsletter
1. Go to homepage
2. Scroll to newsletter section (blue background)
3. Enter email
4. Click "Subscribe"
5. See confirmation
6. Check admin panel → Subscribers

### View Admin Data
1. Go to `/admin/dashboard`
2. Login
3. Click tab for desired section:
   - Projects → View/Edit/Delete projects
   - Clients → View/Edit/Delete clients
   - Contacts → View contact submissions
   - Subscribers → View newsletter subscribers

---

## 📊 API Quick Reference

### Login
```bash
POST /api/auth/login
{
  "username": "admin",
  "password": "admin123"
}
```

### Get All Projects
```bash
GET /api/projects
```

### Create Project (Admin)
```bash
POST /api/projects
Headers: Authorization: Bearer <token>
FormData:
  - name: "Project Name"
  - description: "Description"
  - image: <file>
```

### Get All Clients
```bash
GET /api/clients
```

### Submit Contact
```bash
POST /api/contact
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "mobileNumber": "+1234567890",
  "city": "New York"
}
```

### Subscribe
```bash
POST /api/subscribe
{
  "email": "user@example.com"
}
```

---

## ⚙️ Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/flippr
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-change-this
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📱 Responsive Breakpoints

- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

All pages are fully responsive!

---

## 🎨 Color Scheme

| Element | Color | Usage |
|---------|-------|-------|
| Primary | #2563eb (Blue) | Buttons, Links |
| Secondary | #1e40af (Dark Blue) | Hover states |
| Success | #16a34a (Green) | Success messages |
| Danger | #dc2626 (Red) | Delete buttons |
| Warning | #ea580c (Orange) | Warnings |
| Text | #1f2937 (Dark Gray) | Body text |
| Light | #f3f4f6 (Light Gray) | Backgrounds |

---

## 📁 Directory Structure Quick Guide

```
flippr/
├── backend/           → Node.js + Express server
│   ├── server.js      → Main entry point
│   ├── models/        → MongoDB schemas
│   ├── routes/        → API routes
│   └── middleware/    → Authentication, image upload
│
├── frontend/          → React + Vite application
│   ├── src/
│   │   ├── pages/     → Page components
│   │   ├── components/ → Reusable components
│   │   ├── services/  → API client
│   │   └── utils/     → Helper functions
│   └── index.html     → HTML entry point
│
└── docs/              → Documentation files
    ├── README.md
    ├── QUICKSTART.md
    ├── DEPLOYMENT.md
    └── ...
```

---

## 🔧 Troubleshooting Quick Fixes

### Port Already in Use
```bash
# Change PORT in .env to 5001 or 5002
# Or kill process using port: lsof -ti:5000 | xargs kill
```

### MongoDB Connection Error
```bash
# Check connection string in .env
# Verify MongoDB Atlas IP whitelist
# Test with: mongosh "mongodb+srv://..."
```

### Frontend Can't Connect to Backend
```bash
# Check backend is running on port 5000
# Check vite.config.js proxy settings
# Check CORS in backend server.js
```

### Images Not Uploading
```bash
# Ensure uploads/ directory exists
# Check file size (< 10MB)
# Verify image format (JPEG, PNG, WebP)
```

### Admin Login Not Working
```bash
# Verify credentials match .env
# Check JWT_SECRET is set
# Clear browser localStorage: localStorage.clear()
```

---

## 🚀 Deployment Quick Steps

### MongoDB Atlas
1. Create account at mongodb.com/cloud/atlas
2. Create cluster (M0 free)
3. Create database user
4. Get connection string
5. Whitelist IP (0.0.0.0/0 for test)
6. Add to backend .env

### Render (Backend)
1. Push code to GitHub
2. Create new Web Service on render.com
3. Connect GitHub repo
4. Set root directory to `backend`
5. Add environment variables
6. Deploy → Copy backend URL

### Vercel (Frontend)
1. Go to vercel.com
2. Import GitHub repo
3. Select `frontend` as root directory
4. Add VITE_API_URL to environment
5. Deploy → Get frontend URL

---

## 📈 Performance Tips

### Frontend
- Use lazy loading for images
- Minimize bundle size
- Use CDN for assets
- Cache API responses

### Backend
- Add database indexes
- Implement API caching
- Use pagination for lists
- Compress images with Sharp

### Database
- Index frequently queried fields
- Regular backups
- Monitor database size
- Optimize queries

---

## 🔒 Security Checklist

- [ ] Change admin credentials from defaults
- [ ] Use strong JWT_SECRET (32+ chars)
- [ ] Enable HTTPS in production
- [ ] Whitelist MongoDB Atlas IPs
- [ ] Configure CORS for your domain
- [ ] Use environment variables for secrets
- [ ] Validate all user inputs
- [ ] Rate limit API endpoints
- [ ] Keep dependencies updated
- [ ] Monitor error logs

---

## 📞 Common Questions

### Q: How do I deploy?
**A:** Follow DEPLOYMENT.md step-by-step

### Q: How do I add a new field?
**A:** Update model schema, update form component, update API route

### Q: How do I change the design?
**A:** Modify Tailwind classes in components or edit src/index.css

### Q: How do I add more features?
**A:** Follow existing pattern: Model → Route → Component

### Q: Is it secure?
**A:** Yes! JWT auth, input validation, CORS, etc. (enhance for production)

### Q: Can I deploy to X hosting?
**A:** Yes! Backend to Render/Railway/EC2, Frontend to Vercel/Netlify

### Q: How do I backup data?
**A:** Use MongoDB Atlas automatic backups or manual exports

---

## 📊 Feature Checklist

### Landing Page
- [x] Hero section
- [x] Projects section (dynamic)
- [x] Clients section (dynamic)
- [x] Contact form (functional)
- [x] Newsletter signup (functional)
- [x] Footer
- [x] Responsive design

### Admin Dashboard
- [x] Login page
- [x] Project CRUD
- [x] Client CRUD
- [x] Contact viewer
- [x] Subscriber viewer
- [x] Image cropping
- [x] Data validation

### Backend API
- [x] Authentication
- [x] Project endpoints
- [x] Client endpoints
- [x] Contact endpoints
- [x] Subscriber endpoints
- [x] Image processing
- [x] Error handling

---

## 🎓 Learning Paths

### Beginner
1. Read: QUICKSTART.md
2. Run: Local development
3. Test: Landing page features
4. Modify: Colors and text

### Intermediate
1. Read: README.md + API_REFERENCE.md
2. Understand: API endpoints
3. Extend: Add new fields
4. Deploy: To production

### Advanced
1. Read: ARCHITECTURE.md
2. Understand: System design
3. Optimize: Performance
4. Scale: For large users

---

## ✅ Pre-Launch Checklist

- [ ] All features tested locally
- [ ] Admin credentials changed
- [ ] JWT_SECRET updated
- [ ] MongoDB Atlas configured
- [ ] Backend deployed
- [ ] Frontend deployed
- [ ] Environment variables set
- [ ] CORS configured
- [ ] Images uploading correctly
- [ ] Forms submitting correctly
- [ ] No console errors
- [ ] Mobile responsive verified
- [ ] All tests passed
- [ ] Domains configured
- [ ] SSL active

---

## 🎉 You're Ready!

Everything is set up for:
- ✅ Local development
- ✅ Production deployment
- ✅ Scaling and growth
- ✅ Easy maintenance
- ✅ Future enhancements

**Start building! 🚀**

---

**Quick Links:**
- 📖 Full Documentation: See README.md
- 🚀 Deploy Now: Follow DEPLOYMENT.md
- 🔍 API Docs: See API_REFERENCE.md
- 🏗️ Architecture: See ARCHITECTURE.md
- ✅ Test Checklist: See TESTING.md
