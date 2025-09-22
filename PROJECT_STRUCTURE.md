# Token Portfolio - Project Structure

## 📁 Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout wrapper
│   └── index.ts        # Component exports
├── pages/              # Page components
│   ├── Home.tsx        # Home page
│   └── index.ts        # Page exports
├── hooks/              # Custom React hooks
│   ├── usePortfolio.ts # Portfolio management hook
│   └── index.ts        # Hook exports
├── types/              # TypeScript type definitions
│   └── index.ts        # All type definitions
├── utils/              # Utility functions
│   ├── constants.ts    # App constants
│   ├── helpers.ts      # Helper functions
│   └── index.ts        # Utility exports
├── contexts/           # React contexts (for state management)
├── assets/             # Static assets
│   ├── images/         # Image files
│   └── icons/          # Icon files
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## 🚀 Getting Started

1. **Run the development server:**

   ```bash
   npm run dev
   ```

2. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🎨 Features Included

- ✅ **Home Page** - Main dashboard with portfolio overview
- ✅ **Layout Component** - Header, navigation, and footer
- ✅ **TypeScript Types** - Complete type definitions for tokens, portfolio, etc.
- ✅ **Custom Hooks** - `usePortfolio` for state management
- ✅ **Utility Functions** - Currency formatting, calculations, etc.
- ✅ **Tailwind CSS** - Custom colors (primary: red, secondary: dark gray)
- ✅ **Responsive Design** - Mobile-first approach

## 🛠️ Next Steps

You can now start building your token portfolio app! Here are some ideas:

1. **Add Token Management:**

   - Create forms to add/edit tokens
   - Implement token search functionality
   - Add token price fetching from APIs

2. **Portfolio Features:**

   - Real-time price updates
   - Portfolio performance charts
   - Transaction history

3. **UI Components:**

   - Token cards
   - Charts and graphs
   - Modals and forms

4. **Data Persistence:**
   - Local storage integration
   - API integration for real-time data

## 📝 Available Hooks

- `usePortfolio()` - Manage portfolio state and operations
  - `addToken()` - Add new token to portfolio
  - `removeToken()` - Remove token from portfolio
  - `updateTokenAmount()` - Update token quantity
  - `calculateStats()` - Calculate portfolio statistics

## 🎯 Available Utilities

- `formatCurrency()` - Format numbers as currency
- `formatPercentage()` - Format numbers as percentages
- `formatLargeNumber()` - Format large numbers (1.2M, 3.4B)
- `getValueColorClass()` - Get color class based on value
- `calculatePercentageChange()` - Calculate percentage changes

Happy coding! 🚀
