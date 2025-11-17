# Detailed Deployment Instructions

## Prerequisites

Before deploying, ensure you have:
- GitHub account with your repository pushed
- MongoDB Atlas account
- Vercel/Netlify account (for frontend)
- Render/Railway account (for backend)

---

## Step 1: Set Up MongoDB Atlas

### Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up and create a new organization
3. Create a new project called "flippr"
4. Build a cluster (select M0 Free tier for testing)

### Get Connection String
1. In Atlas, go to "Connect"
2. Choose "Drivers"
3. Copy the connection string
4. It will look like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/flippr?retryWrites=true&w=majority
   ```

### Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Create username and strong password
4. Copy credentials for your .env file

### Whitelist IP Addresses
1. Go to "Network Access"
2. Click "Add IP Address"
3. For development: Add your current IP
4. For production: Add `0.0.0.0/0` (or specific IPs)

---

## Step 2: Backend Deployment (Render)

### Push Code to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Create Render Web Service
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +"
4. Select "Web Service"
5. Connect your GitHub repository

### Configure Service
1. **Name**: flippr-backend
2. **Region**: Choose closest to your users
3. **Branch**: main
4. **Root Directory**: backend
5. **Environment**: Node
6. **Build Command**: `npm install`
7. **Start Command**: `npm start`

### Set Environment Variables
In the "Environment" section, add:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/flippr?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
JWT_SECRET=generate_strong_secret_key_here
ADMIN_USERNAME=youradminname
ADMIN_PASSWORD=strongpassword123
```

### Deploy
- Click "Create Web Service"
- Wait for deployment to complete
- Note the backend URL (e.g., `https://flippr-backend.render.com`)

### Verify Backend
```bash
curl https://flippr-backend.render.com/api/health
```

---

## Step 3: Frontend Deployment (Vercel)

### Option A: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New..."
4. Select "Project"
5. Import your GitHub repository

### Configure Frontend
1. **Framework Preset**: Vite
2. **Root Directory**: frontend
3. **Build Command**: `npm run build`
4. **Output Directory**: dist

### Environment Variables
Add:
```
VITE_API_URL=https://flippr-backend.render.com/api
```

### Deploy
- Click "Deploy"
- Wait for build and deployment
- Your frontend URL will be provided

### Update Backend CORS (if needed)
If you get CORS errors, add to backend `server.js`:
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'https://your-vercel-url.vercel.app',
  credentials: true
}));
```

---

## Step 4: Frontend Deployment (Netlify)

### Alternative to Vercel

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site"
3. "Import an existing project"
4. Connect your GitHub repository

### Configure Build
1. **Base directory**: frontend
2. **Build command**: `npm run build`
3. **Publish directory**: dist

### Environment Variables
Add:
```
VITE_API_URL=https://flippr-backend.render.com/api
```

### Deploy
- Click "Deploy site"
- Get your Netlify URL

---

## Step 5: Testing Your Deployment

### Test Backend API
```bash
# Health check
curl https://flippr-backend.render.com/api/health

# Login
curl -X POST https://flippr-backend.render.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Test Frontend
1. Visit your Vercel/Netlify URL
2. Check if projects and clients load
3. Test contact form submission
4. Test newsletter subscription

### Test Admin Panel
1. Go to `/admin` route
2. Login with your admin credentials
3. Try adding a project/client
4. Verify they appear on landing page

---

## Production Checklist

- [ ] MongoDB Atlas configured and secured
- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel/Netlify
- [ ] Environment variables set correctly
- [ ] Backend CORS allows frontend domain
- [ ] Admin credentials changed from defaults
- [ ] JWT_SECRET is a strong, random string
- [ ] Images uploading and displaying correctly
- [ ] Contact form submissions working
- [ ] Newsletter subscription working
- [ ] Admin CRUD operations working

---

## Monitoring & Maintenance

### Monitor Logs
- **Render**: Dashboard → Logs
- **Vercel**: Deployments → Logs
- **Netlify**: Deploys → Deploy Log

### Update Code
```bash
git add .
git commit -m "Your commit message"
git push origin main
# Automatic redeploy on both Vercel and Render
```

### Database Backups
- MongoDB Atlas provides automated backups (paid tier)
- Consider regular manual exports from Atlas dashboard

---

## Troubleshooting Deployment

### Backend won't deploy
- Check Node version compatibility
- Verify all dependencies in package.json
- Check build logs for errors
- Ensure .env variables are set

### Frontend shows blank page
- Check browser console for errors
- Verify API URL is correct
- Check network tab for API calls
- Clear cache and rebuild

### CORS errors
- Verify backend CORS configuration
- Check frontend API URL matches backend domain
- Add frontend URL to backend CORS whitelist

### Images not loading
- Check /uploads directory exists on backend
- Verify image paths are correct
- Check image permissions
- Use absolute URLs in image tags

### Login not working
- Verify admin credentials match backend
- Check JWT_SECRET is set
- Clear browser localStorage
- Check network tab for auth request

---

## Cost Breakdown (Monthly)

- **MongoDB Atlas**: Free tier (up to 512MB)
- **Render**: Free tier (with limitations) or $7+
- **Vercel**: Free tier (with limitations) or $20+
- **Total**: $0-27+ depending on usage

## Scale Your Application

As your application grows:
1. Upgrade MongoDB to paid tier
2. Use Render's paid tier for better performance
3. Enable CDN for frontend assets
4. Add caching layers
5. Implement database indexing
6. Use image optimization services

---

**Your application is now live! 🎉**
