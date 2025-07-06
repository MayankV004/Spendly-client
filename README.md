# Spendly Frontend 

A modern, responsive financial management application built with Next.js and TypeScript. Finora helps users track their expenses, manage transactions, and gain insights into their financial habits with beautiful charts and analytics.

## 🚀 Live Demo

**[View Live Application](https://spendly-client.vercel.app)**

Deployed on Vercel with automatic deployments from the main branch.

### Backend Link
```bash
https://spendly-backend-4dmv.onrender.com
```
### Backend Repo
```bash
https://github.com/MayankV004/Spendly-backend
````

## ✨ Features

### 💳 Transaction Management
- **Add Transactions** - Create income and expense entries with categories
- **Edit Transactions** - Modify existing transaction details in real-time
- **Delete Transactions** - Remove unwanted entries with confirmation
- **View All Transactions** - Complete transaction history with pagination
- **Recent Transactions** - Quick access to latest financial activities
- **Advanced Filtering** - Sort transactions by category, type, and date range
- **Data Export** - Export transaction data as CSV files for external analysis
- **Transaction Categories** - Organize expenses by custom categories
- **Real-time Updates** - Instant UI updates with Redux state management

## ✨ Key Features Showcase

### 📊 Transaction Dashboard
- **Smart Filtering**: Filter transactions by category (Food, Transportation, Entertainment, etc.), type (Income/Expense), and custom date ranges
- **CSV Export**: Download your transaction data in CSV format for external analysis and record keeping
- **Real-time Search**: Instantly search through your transactions
- **Sort & Organize**: Multiple sorting options like type and category
- **Quick Actions**: Edit or delete transactions with intuitive modal interfaces

### 🔍 Advanced Analytics
- **Financial Overview**: Comprehensive dashboard showing income vs expenses
- **Category Breakdown**: Visual representation of spending patterns by category
- **Monthly/Yearly Reports**: Time-based financial insights and trends
- **Net Balance Tracking**: Real-time calculation of your financial position
- **Recent Activity**: Quick access to your latest 5 transactions

### 🎨 User Interface
- **Responsive Design** - Mobile-first approach with seamless desktop experience
- **Modern UI Components** - Built with Shadcn/ui component library
- **Intuitive Icons** - Lucide React icons for better user experience

## 🛠️ Tech Stack

### Frontend Framework
- **[Next.js 14](https://nextjs.org/)** - React framework for production
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React 18](https://reactjs.org/)** - UI library with latest features

### State Management
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - Efficient Redux development

### UI & Styling
- **[Shadcn/ui](https://ui.shadcn.com/)** - Beautiful component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful SVG icons

### HTTP Client
- **[Axios](https://axios-http.com/)** - Promise-based HTTP client

### Deployment
- **[Vercel](https://vercel.com/)** - Deployment and hosting platform

## 🎯 Custom Hooks

### useTransactions Hook
Complete transaction management with filtering and analytics:

```typescript
const { 
  addTransaction, 
  editTransaction, 
  removeTransaction,
  fetchTransactions, 
  fetchRecent,
  fetchStats,
  updateFilters,
  resetFilters,
  getTransactionById,
  getTransactionsByCategory,
  getTransactionsByType,
  getTransactionsByDateRange,
  transactions, 
  recentTransactions,
  stats,
  totalIncome,
  totalExpenses,
  netBalance,
  categorySummary,
  isLoading, 
  error 
} = useTransactions();
```

**Features:**
- CRUD operations for transactions
- Advanced filtering by category, type, and date range
- Real-time transaction statistics and analytics
- Recent transactions with customizable limits
- Utility functions for data retrieval
- Computed financial metrics (income, expenses, balance)
- Category-wise transaction summaries
- Export functionality for CSV download

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Spendly-client.git
   cd Spendly-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Add your server URL in lib/axios**
   
4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration
### Redux Store
Centralized state management with:
- Authentication slice
- Transaction slice
- UI state management
- Middleware for API calls

## 🎨 UI Components

Built with **Shadcn/ui** components:
- **Form Components** - Validated forms with real-time error handling
- **Data Tables** - Advanced tables with sorting, filtering, and pagination
- **Transaction Modals** - Edit transaction modal with form validation
- **Navigation** - Responsive navbar with profile dropdown
- **Charts and Graphs** - Visual analytics for financial data
- **Export Functionality** - CSV download buttons with data processing
- **Filter Controls** - Category and type filters with reset options
- **Loading States** - Skeletons and spinners for better UX
- **Alert Dialogs** - Confirmation modals for destructive actions

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Support** - Adapted layouts for tablets
- **Desktop Enhancement** - Full-featured desktop experience
- **Cross-browser** - Compatible with modern browsers

## 🔒 Security Features

- JWT token management
- Protected routes with authentication guards
- Secure API communication

## 🚀 Deployment

Deployed on **Vercel** with:
- Automatic deployments from Git
- Environment variable management
- Preview deployments for pull requests
- Global CDN distribution

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Shadcn](https://ui.shadcn.com/) for the beautiful component library
- [Vercel](https://vercel.com/) for seamless deployment
- [Lucide](https://lucide.dev/) for the beautiful icons

## 📞 Support

If you have any questions or need help, please:
- Contact: mayank.msverma@gmail.com

---

**Built with ❤️ by Mayank **
