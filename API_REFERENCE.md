# Flippr - Admin API Reference

## Authentication

All admin endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

---

## Projects

### Get All Projects
```
GET /api/projects
```

### Get Single Project
```
GET /api/projects/:id
```

### Create Project
```
POST /api/projects
Content-Type: multipart/form-data
Authorization: Bearer <token>

Form Data:
- name: string (required)
- description: string (required)
- image: file (required, auto-cropped to 450x350)

Response: 201 Created
{
  "_id": "...",
  "name": "Project Name",
  "description": "Description",
  "image": "/uploads/...",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Update Project
```
PUT /api/projects/:id
Content-Type: multipart/form-data
Authorization: Bearer <token>

Form Data:
- name: string (optional)
- description: string (optional)
- image: file (optional)
```

### Delete Project
```
DELETE /api/projects/:id
Authorization: Bearer <token>
```

---

## Clients

### Get All Clients
```
GET /api/clients
```

### Get Single Client
```
GET /api/clients/:id
```

### Create Client
```
POST /api/clients
Content-Type: multipart/form-data
Authorization: Bearer <token>

Form Data:
- name: string (required)
- designation: string (required)
- description: string (required)
- image: file (required)
```

### Update Client
```
PUT /api/clients/:id
Content-Type: multipart/form-data
Authorization: Bearer <token>
```

### Delete Client
```
DELETE /api/clients/:id
Authorization: Bearer <token>
```

---

## Contact Form

### Submit Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "mobileNumber": "+1234567890",
  "city": "New York"
}
```

### Get All Contacts
```
GET /api/contact
Authorization: Bearer <token>

Response: Array of contact objects
```

### Delete Contact
```
DELETE /api/contact/:id
Authorization: Bearer <token>
```

---

## Newsletter Subscribers

### Subscribe
```
POST /api/subscribe
Content-Type: application/json

{
  "email": "subscriber@example.com"
}
```

### Get All Subscribers
```
GET /api/subscribe
Authorization: Bearer <token>
```

### Delete Subscriber
```
DELETE /api/subscribe/:id
Authorization: Bearer <token>
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Error description"
}
```

### 401 Unauthorized
```json
{
  "message": "No token provided" / "Invalid token"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "message": "Internal server error"
}
```

---

## Example Requests

### cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Get Projects
curl http://localhost:5000/api/projects

# Get Contacts (with auth)
curl http://localhost:5000/api/contact \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create Contact
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "mobileNumber": "+1234567890",
    "city": "New York"
  }'
```

### JavaScript (Fetch)

```javascript
// Login
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: 'admin123' })
});
const { token } = await loginResponse.json();

// Get Projects
const projectsResponse = await fetch('/api/projects');
const projects = await projectsResponse.json();

// Create Contact
const contactResponse = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fullName: 'John Doe',
    email: 'john@example.com',
    mobileNumber: '+1234567890',
    city: 'New York'
  })
});
```

---

## Rate Limiting

Currently no rate limiting implemented. Consider adding for production:
- `express-rate-limit` package
- Implement per-IP rate limiting
- Add request timeout handling

---

## CORS Configuration

Frontend origin allowed:
- Development: `http://localhost:3000`
- Production: Configure in `.env` or backend code
