# Snacklery - Edible Cutlery Revolution

## About Snacklery

Snacklery is an innovative company that creates edible cutlery from natural ingredients, offering an eco-friendly alternative to traditional plastic utensils. Our mission is to reduce plastic waste while providing delicious and sustainable dining solutions.

## Project Repository

**GitHub**: https://github.com/snacklery/Snacklery-Github-Host

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Getting Started

Follow these steps to run the project locally:

```sh
# Step 1: Clone the repository
git clone https://github.com/snacklery/Snacklery-Github-Host.git

# Step 2: Navigate to the project directory
cd Snacklery-Github-Host

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm start` - Start the production server (used by Render)

### Development Workflow

**Local Development**
- Make changes to the code in your preferred IDE
- Test changes locally using `npm run dev`
- Commit and push changes to the main branch

**Direct GitHub Editing**
- Navigate to the desired file in the GitHub repository
- Click the "Edit" button (pencil icon)
- Make changes and commit directly to the repository

**GitHub Codespaces**
- Open the repository on GitHub
- Click the "Code" button and select "Codespaces"
- Launch a new Codespace for cloud-based development

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployment

This project is configured for deployment on [Render](https://render.com).

### Deploy to Render

1. **Connect Repository**
   - Sign up/login to [Render](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `snacklery/Snacklery-Github-Host`

2. **Deployment Configuration**
   - The project includes a `render.yaml` file for automatic configuration
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: Node.js

3. **Automatic Deployments**
   - Every push to the main branch triggers an automatic deployment
   - Build status and logs are available in the Render dashboard

### Environment Variables

The following environment variables are automatically configured:
- `NODE_ENV`: production
- `PORT`: Dynamically assigned by Render

### Custom Domain

To connect a custom domain:
1. Navigate to your service in the Render dashboard
2. Go to Settings → Custom Domains
3. Add your domain and follow the DNS configuration instructions

## Features

- **Responsive Design** - Works seamlessly across all devices
- **Modern UI** - Built with shadcn-ui and Tailwind CSS
- **Fast Performance** - Optimized with Vite and React
- **SEO Friendly** - Proper meta tags and semantic HTML
- **Accessibility** - WCAG compliant components
