# Testing Guide

Complete testing checklist to verify all features are working correctly.

## 🧪 Pre-Testing Setup

1. Ensure backend is running: `npm start` from backend directory
2. Ensure frontend is running: `npm run dev` from frontend directory
3. Open browser to `http://localhost:3000`
4. Clear browser cache and localStorage

---

## 📱 Landing Page Tests

### Header Section
- [ ] Page loads without errors
- [ ] "Welcome to Flippr" header is visible
- [ ] Tagline "Transform Your Ideas Into Reality" displays
- [ ] Page is responsive on mobile (use DevTools)

### Projects Section
- [ ] "Our Projects" heading displays
- [ ] All projects load from backend
- [ ] Each project shows image, name, description
- [ ] "Read More" button is visible (non-functional is OK)
- [ ] Project cards are responsive
- [ ] No API errors in console

### Clients Section
- [ ] "Happy Clients" heading displays
- [ ] All clients load from backend
- [ ] Client images are circular
- [ ] Client names, designations, descriptions display
- [ ] Section is responsive

### Contact Form Section
- [ ] Form title "Contact Us" displays
- [ ] All fields present: Full Name, Email, Mobile, City
- [ ] Can fill all fields without errors
- [ ] Submit button works
- [ ] Success message appears after submission
- [ ] Form clears after submission
- [ ] Contact stored in backend (check admin panel)

### Newsletter Section
- [ ] Newsletter section has blue background
- [ ] Email input field is visible
- [ ] Subscribe button is visible
- [ ] Can enter email and subscribe
- [ ] Success message appears
- [ ] Duplicate email shows appropriate message
- [ ] Subscriber stored in backend

---

## 🔐 Admin Panel Tests

### Login Page
- [ ] Page accessible at `/admin`
- [ ] Username and password fields visible
- [ ] Demo credentials shown
- [ ] Can login with `admin`/`admin123`
- [ ] Redirects to dashboard after login
- [ ] Wrong credentials show error message
- [ ] Error message clears when typing

### Dashboard Navigation
- [ ] Dashboard tab bar has 4 tabs: Projects, Clients, Contacts, Subscribers
- [ ] Clicking each tab switches content
- [ ] Page doesn't reload when switching tabs
- [ ] Logout button is visible
- [ ] Logout redirects to login page
- [ ] Logout clears stored token

---

## 📁 Project Management Tests

### View Projects
- [ ] All projects display in grid
- [ ] Each project shows thumbnail, name, description
- [ ] Edit and Delete buttons visible on each project
- [ ] Project count displays correctly

### Add Project
- [ ] "+ Add Project" button opens form
- [ ] Form fields: Name, Description, Image upload
- [ ] Image cropper opens when clicking "Upload & Crop Image"
- [ ] Image cropping interface works:
  - [ ] Can select image file
  - [ ] Can move crop area
  - [ ] Crop area is 450x350 aspect ratio
  - [ ] "Save Cropped Image" button works
  - [ ] Confirmation shows "Image selected and cropped"
- [ ] Can fill form and submit
- [ ] Success message appears
- [ ] New project appears in list immediately
- [ ] New project appears on landing page

### Edit Project
- [ ] Click "Edit" button on any project
- [ ] Form pre-fills with existing data
- [ ] Can modify fields
- [ ] Can update image or skip
- [ ] Update button changes to "Update Project"
- [ ] Success message appears
- [ ] Changes reflect in list and landing page

### Delete Project
- [ ] Click "Delete" button
- [ ] Confirmation dialog appears
- [ ] Confirm deletion
- [ ] Project removed from list
- [ ] Project disappears from landing page

---

## 👥 Client Management Tests

### View Clients
- [ ] All clients display in grid
- [ ] Client images are circular
- [ ] Client names, designations, descriptions visible
- [ ] Edit and Delete buttons present

### Add Client
- [ ] "+ Add Client" button works
- [ ] Form fields: Name, Designation, Description, Image
- [ ] Image cropping works correctly
- [ ] Can submit form
- [ ] Success message appears
- [ ] New client appears in list
- [ ] New client appears on landing page

### Edit Client
- [ ] Edit button opens form with existing data
- [ ] Can modify all fields
- [ ] Can update image
- [ ] Changes save correctly

### Delete Client
- [ ] Delete confirms before removing
- [ ] Client removed from all locations

---

## 📧 Contact Form Data Tests

### View Submissions
- [ ] Tab shows all contact submissions
- [ ] Table displays columns: Full Name, Email, Mobile, City, Date
- [ ] Correct number of submissions
- [ ] Data from landing page contact form appears here
- [ ] Submissions sorted by newest first

### Delete Submission
- [ ] Click Delete button
- [ ] Confirm dialog appears
- [ ] Submission removed from table

---

## 📬 Subscriber Management Tests

### View Subscribers
- [ ] Tab shows subscriber count
- [ ] Table displays columns: Email, Subscribed Date
- [ ] All subscribers from landing page appear
- [ ] Sorted by newest subscription first

### Delete Subscriber
- [ ] Click Delete button
- [ ] Confirm dialog appears
- [ ] Subscriber removed from table

---

## 🖼️ Image Upload Tests

### Image Cropping
- [ ] Accepts JPEG files
- [ ] Accepts PNG files
- [ ] Accepts WebP files
- [ ] Rejects other formats with error
- [ ] Cropped images are 450x350 pixels
- [ ] Images display correctly after upload
- [ ] Images serve from `/uploads/` path

### Image Display
- [ ] Project images display correctly
- [ ] Client images display correctly
- [ ] Placeholder shown for missing images
- [ ] Images are responsive

---

## 🔒 Security Tests

### Authentication
- [ ] Non-admin users cannot access dashboard
- [ ] Non-admin users cannot access admin APIs
- [ ] Invalid tokens are rejected
- [ ] Expired tokens require re-login

### CORS
- [ ] Frontend can communicate with backend
- [ ] No CORS errors in console
- [ ] Works from different origins (if deployed)

### Input Validation
- [ ] Empty fields show validation errors
- [ ] Invalid email shows error
- [ ] Invalid phone number handling
- [ ] XSS attempts are handled safely

---

## 📱 Responsive Design Tests

Test on different screen sizes:

### Mobile (320px)
- [ ] All content visible
- [ ] No horizontal scroll
- [ ] Forms are usable
- [ ] Text is readable

### Tablet (768px)
- [ ] Layout adjusts correctly
- [ ] Grid columns adjust
- [ ] Forms are responsive

### Desktop (1024px+)
- [ ] Full layout displays
- [ ] Proper spacing
- [ ] All features accessible

---

## 🚀 Performance Tests

- [ ] Landing page loads in < 3 seconds
- [ ] Admin dashboard loads quickly
- [ ] Images load without lag
- [ ] No memory leaks (check DevTools)
- [ ] Network requests are efficient
- [ ] No console errors

---

## 🔧 Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## 📊 Data Flow Tests

### Project Submission Flow
1. Add project in admin panel → Save
2. Check project appears in database
3. Refresh page → Project still visible
4. Edit project → Changes persist
5. Delete project → Removed everywhere

### Contact Form Flow
1. Fill and submit contact form on landing page
2. Check confirmation message
3. Go to admin → Contacts tab
4. Verify submission appears
5. Delete from admin panel

### Newsletter Flow
1. Subscribe on landing page
2. Check success message
3. Go to admin → Subscribers tab
4. Verify subscriber appears
5. Try duplicate email
6. Should show "already subscribed" message

---

## 🐛 Error Handling Tests

### Network Errors
- [ ] Offline mode shows appropriate errors
- [ ] Slow network doesn't break app
- [ ] Timeout errors handled gracefully

### Validation Errors
- [ ] Missing required fields show errors
- [ ] Invalid data formats show errors
- [ ] Error messages are clear

### Server Errors
- [ ] 500 errors handled gracefully
- [ ] Retry options available
- [ ] User informed of issues

---

## ✅ Final Checklist

Before deploying to production:

- [ ] All landing page features working
- [ ] All admin panel features working
- [ ] All CRUD operations working
- [ ] Image upload and cropping working
- [ ] Form validation working
- [ ] Error handling working
- [ ] Responsive design working
- [ ] No console errors
- [ ] No network errors
- [ ] Admin credentials secure
- [ ] JWT_SECRET is strong
- [ ] MongoDB connection secure
- [ ] All tests passed
- [ ] Ready for deployment!

---

**Congratulations! Your application is production-ready! 🎉**
