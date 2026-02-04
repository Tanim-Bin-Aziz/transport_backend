## Backend Setup (Express + TypeScript + Prisma)

### Requirements
- Node.js 18+ (recommended 20)
- npm
- PostgreSQL (local or hosted)

---

### 1. Go to backend folder
```bash
cd backend

npm install

```
### 2. Create .env file
```bash
DATABASE_URL=postgresql://postgres:Password@localhost:5432/transport_db
JWT_SECRET=supersecretjwt
PORT=5000
```
### 3. Replace:
```bash
USER = your postgres username
PASSWORD = your postgres password
transport_db = your database name
```
### 4. Prisma schema location
```bash
backend/prisma/schema.prisma
```
### 5. Generate Prisma Client
```bash
npx prisma generate
```
### 6. Run migrations (create tables)
```bash
npx prisma migrate dev --name init
```
### 7. (Optional) Open Prisma Studio
```bash
npx prisma studio
```
### 8. Start backend server
```bash
npm run dev
http://localhost:5000
Api Docs
http://localhost:5000/api-docs
```
### 8. Admin Create
```bash
/auth/create-admin

body
{
  "email": "admin@school.com",
  "password": "admin123"
}

admin and auth disbale it & create admin
protected (only existing admin can create new admin)

auth/authroute.ts
authRouter.post("/create-admin", authMiddleware, adminOnly, createAdmin);
 
```


