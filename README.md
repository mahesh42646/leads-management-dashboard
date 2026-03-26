# Leads Management Dashboard

A powerful leads and business development management tool with a Google Sheets backend and interactive HTML dashboard.

## Features
- View, add, update, and manage leads
- Sync data with Google Sheets
- Real-time dashboard with responsive design
- Easy-to-use interface
- Deploy to Vercel with one click

## Getting Started

### Prerequisites
- Node.js 14+
- Google Sheets API credentials
- Vercel account (for deployment)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/leads-management-dashboard.git
cd leads-management-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file with:
```
NEXT_PUBLIC_GOOGLE_SHEET_ID=your_sheet_id
GOOGLE_CLIENT_EMAIL=your_client_email
GOOGLE_PRIVATE_KEY=your_private_key
```

4. Run the development server
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

## Deployment

Deploy to Vercel with:
```bash
vercel
```

## Tech Stack
- Next.js
- React
- TailwindCSS
- Google Sheets API
- Node.js

## License
MIT
