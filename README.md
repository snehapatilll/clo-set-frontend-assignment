# CLO-SET Connect – Frontend Developer Assignment

This is the solution to the Frontend Developer Assignment provided by CLO Virtual Fashion. The project implements a content listing page with filtering, search, infinite scrolling, and responsive layout based on the CLO-SET Store design.

---

## 🔧 Tech Stack

- ⚛️ **React** (with TypeScript)
- 🎨 **SCSS** (CSS preprocessor)
- 🔄 **Redux Toolkit** (state management)
- 🌐 **Axios** (API requests)

---

## 📦 Features Implemented

### ✅ Required Features

- **Pricing Filters**: Free / Paid / View Only (multi-select + reset)
- **Keyword Search**: Filter by username or title
- **Responsive Grid Layout**:
  - 4 columns (default)
  - 3 columns (< 1200px)
  - 2 columns (< 768px)
  - 1 column (< 480px)
- **Infinite Scroll**: Loads more items as the user scrolls
- **Filter/Search Persistence**: Maintains state across infinite scroll (without localStorage)

### ✨ Optional Enhancements (if implemented)

- 🔃 Sorting dropdown
- 💰 Price range slider (only when "Paid" is selected)
- 🦴 Skeleton loader while loading

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/snehapatilll/clo-set-frontend-assignment.git
cd clo-set-frontend-assignment
npm install
npm start
The app will start on http://localhost:3000
src/
├── api/               # API integration
├── components/        # UI components (search, filter, grid)
├── redux/             # State management (store + slice)
├── styles/            # SCSS styles and variables
├── App.tsx
└── index.tsx
🔗 API Source
[GET] https://closet-recruiting-api.azurewebsites.net/api/data

👩🏻‍💻 Author
Sneha Patil
Frontend Developer
📧 snehapatil112001@gmail.com
🔗[ GitHub Profile](https://github.com/snehapatilll)

---

After saving the file:

```bash
git add README.md
git commit -m "Add README with project details"
git push
