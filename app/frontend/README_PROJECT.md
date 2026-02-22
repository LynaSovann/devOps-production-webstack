# ProjectHub - Demo Application

A modern full-stack Next.js application showcasing user authentication, project management, and team collaboration features. Perfect for DevOps and cloud deployment demonstrations.

## Features

### Authentication
- User login and signup
- Session persistence with localStorage
- Protected routes with automatic redirection
- Demo credentials for easy testing

### Dashboard
- Welcome screen with statistics
- Quick overview of projects and team members
- Navigation sidebar with user info

### Project Management
- **Create Projects**: Users can create new projects with name and description
- **View Projects**: Browse all projects in the system
- **Edit Projects**: Update project details (only by project owner)
- **Delete Projects**: Remove projects (only by project owner)
- **Permission-based Actions**: Users can only edit/delete their own projects

### User Management
- **View All Users**: Browse team members directory
- **User Profiles**: View detailed user profiles with:
  - Avatar and bio
  - Join date
  - Project count and statistics
  - List of projects owned
- **Profile Management**: Users can edit their own profile

### Data Persistence
- Uses localStorage for mock data storage
- Includes mock users and projects for demo purposes
- Can be easily replaced with backend API calls

## Project Structure

```
app/
├── layout.tsx              # Root layout with providers
├── page.tsx                # Home page (redirects to login/dashboard)
├── login/
│   └── page.tsx            # Login page
├── signup/
│   └── page.tsx            # Signup page
└── dashboard/
    ├── layout.tsx          # Dashboard layout with sidebar
    ├── page.tsx            # Dashboard home page
    ├── profile/
    │   └── page.tsx        # User profile page
    ├── projects/
    │   ├── page.tsx        # Projects listing
    │   ├── [id]/
    │   │   └── page.tsx    # Project detail page
    │   └── create-project-modal.tsx
    └── users/
        ├── page.tsx        # Users directory
        └── [id]/
            └── page.tsx    # User profile view page

components/
├── ui/                     # shadcn/ui components
└── dashboard/
    └── sidebar.tsx         # Navigation sidebar

lib/
├── auth-context.tsx        # Authentication context
├── projects-context.tsx    # Projects context
└── users-context.tsx       # Users context
```

## Key Features

### Authentication Flow
1. User visits the app → redirected to `/login` if not authenticated
2. User can sign up or login with demo credentials
3. Auth state is stored in React Context and persisted to localStorage
4. Protected routes in `/dashboard` automatically redirect unauthenticated users

### Permission System
- Users can **view** any user's profile and projects
- Users can **only edit/delete** their own projects
- Users can **only edit** their own profile
- Enforced through permission checks in components

### Demo Data
Pre-loaded with:
- 5 mock users with avatars
- 5 mock projects across different users
- Ready to extend with your backend API

## Getting Started

### Login with Demo Credentials
- **Email**: demo@example.com
- **Password**: any password (demo accepts any)

### Or Create a New Account
- Go to `/signup`
- Enter username, email, and password
- Will be redirected to dashboard

## Connecting Your Backend

To connect your own backend:

1. **Update Auth**: Modify `lib/auth-context.tsx` login/signup functions to call your API
2. **Update Projects**: Modify `lib/projects-context.tsx` to fetch from your API
3. **Update Users**: Modify `lib/users-context.tsx` to fetch from your API

All contexts use localStorage as fallback, making it easy to transition to a real backend.

## Technology Stack

- **Framework**: Next.js 16+ with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Context API
- **Data Persistence**: localStorage (mock) / Ready for backend integration
- **UI Components**: shadcn/ui components

## Cloud Deployment

This app is production-ready for cloud deployment:

### Deploy to Vercel
```bash
vercel deploy
```

### Deploy to AWS, GCP, or other platforms
The app can be containerized and deployed to any platform supporting Node.js applications.

### Environment Variables
Add these to your deployment platform:
- `NEXT_PUBLIC_API_URL` - Your backend API URL
- Any authentication secrets (if using real auth)

## Development Tips

### Adding a New Feature
1. Update the appropriate context (`lib/*-context.tsx`)
2. Create a new page or component
3. Use the context hooks (`useAuth()`, `useProjects()`, `useUsers()`)
4. Leverage existing UI components from `components/ui/`

### Customizing Styling
- Global styles: `app/globals.css`
- Design tokens: CSS variables in `globals.css`
- Component classes: Use Tailwind classes throughout

### Testing Locally
```bash
npm run dev
# Open http://localhost:3000
# You'll be redirected to /login
```

## Demo Workflow

1. Go to `http://localhost:3000`
2. Click "Sign in" with `demo@example.com`
3. View dashboard with stats
4. Navigate to "My Projects" to see and create projects
5. Go to "Users" to view team members
6. Click any user to view their profile
7. Click "Profile" to edit your own information

## Notes for DevOps Showcase

This app demonstrates:
- ✅ Clean, scalable architecture
- ✅ Production-ready component structure
- ✅ Context-based state management
- ✅ Protected routes and authentication flow
- ✅ Mock data layer (easily replaceable with real backend)
- ✅ Responsive, modern UI
- ✅ Ready for containerization and deployment

Perfect for showcasing your ability to build and deploy full-stack applications!
