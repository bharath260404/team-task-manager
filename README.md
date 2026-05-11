🚀 Team Task Manager (TeamFlow)
A full-stack project management application designed to streamline team collaboration. It allows users to create projects, manage tasks, and track progress through a secure, role-based dashboard.

🌐 Live Demo
Live Application: View Site

Backend API: API Endpoint

🛠️ Technical Stack
Frontend
Framework: Next.js / React

Styling: Tailwind CSS

State Management: React Context API / Hooks

HTTP Client: Axios (with interceptors for JWT)

Backend
Runtime: Node.js / Express

Language: TypeScript

ORM: Prisma

Authentication: JSON Web Tokens (JWT) & Bcrypt

Database & Hosting
Database: PostgreSQL (Hosted on Railway)

Cloud Hosting: Railway (Automated CI/CD)

✨ Key Features
Secure Authentication: JWT-based login/signup with password hashing.

Role-Based Access (RBAC): Distinct permissions for Admin and User roles.

Project Management: Create, update, and delete team projects.

Task Tracking: Assign tasks to specific projects with status updates (Pending/In-Progress/Completed).

Responsive Design: Fully optimized for Mobile, Tablet, and Desktop views.

⚙️ Environment Variables
To run this project locally, create a .env file in both the /client and /server directories with the following:

Server .env
Code snippet
PORT=5000
DATABASE_URL="your_postgresql_url"
JWT_SECRET="your_secret_key"
Client .env
Code snippet
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
🚀 Installation & Local Setup
Clone the Repository:

Bash
git clone https://github.com/bharath260404/team-task-manager.git
cd team-task-manager
Setup Backend:

Bash
cd server
npm install
npx prisma generate
npx prisma db push
npm run dev
Setup Frontend:

Bash
cd ../client
npm install
npm run dev
📂 Project Structure
Plaintext
├── client/              # Next.js Frontend
│   ├── src/components   # Reusable UI components
│   ├── src/context      # Auth & Global state
│   └── src/utils        # Axios instance & API config
├── server/              # Node.js/Express Backend
│   ├── src/controllers  # Request logic
│   ├── src/routes       # API endpoints
│   └── prisma/          # Database schema & migrations
└── README.md
👤 Author
Jella Bharath Kumar Computer Science Engineering Student @ Vignan Institute of Technology and Science

GitHub: @bharath260404
