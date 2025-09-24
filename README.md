# Token Portfolio

## Overview
Token Portfolio is a simple crypto dashboard that allows you to **track tokens, prices, holdings, and 7-day sparklines**.  
It gives you an easy way to manage your watchlist, see live price updates, and calculate the total value of your holdings.

## Features
- 🔍 **Search & Add Tokens** to your watchlist  
- ⭐ **Watchlist with Prices** (live from CoinGecko API)  
- 📈 **7-Day Sparkline Charts** for quick trend visualization  
- 📊 **Holdings Management** (edit and save token amounts)  
- 💵 **Portfolio Value Calculation** (price × holdings)  
- 🔄 **Manual Refresh** for latest prices  
- ⏯ **Pagination** to handle large token lists  
- 💾 **Persisted State** (watchlist saved in local storage)  

## Tech Stack
- **Frontend**: React + Vite + TypeScript  
- **State Management**: Redux Toolkit + Redux Persist  
- **API**: CoinGecko API (for token prices & sparkline data)  
- **UI**: TailwindCSS + custom components  

## Installation
```bash
git clone <repo-url>
cd project-folder
npm install
npm run dev
