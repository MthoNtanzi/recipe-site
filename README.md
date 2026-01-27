# 🍽️ Recipe Site

A simple and modern recipe web app built with React and deployed on Vercel. The app fetches and displays recipes from the public **dummyjson.com Recipes API**, allowing users to browse recipes on the homepage and view full details on a dedicated recipe page.

🔗 **Live Demo:** [https://recipe-site-red.vercel.app/](https://recipe-site-red.vercel.app/)

## 🚀 Features

- **🏠 Homepage with Recipe Cards**
  - Fetches recipes from the DummyJSON Recipes API
  - Displays all recipes using a reusable `RecipeCard` component
  - Maps over API data to render a grid/list of recipe cards

- **📄 Recipe Detail Page**
  - Clicking a recipe card navigates to `RecipePage.jsx`
  - Displays detailed information for a selected recipe
  - Shows full recipe content (ingredients, instructions, etc.)

- **⚡ Fast & Lightweight**
  - Client-side data fetching
  - Deployed on Vercel for fast performance

- **📱 Responsive Design**
  - Works across desktop, tablet, and mobile screens

- **🔍 Search and filter by ingredients or cuisine**
  - Search for your favourite meals and recipes

- **⭐ Favourite recipes (using localStorage)**
  - Save your favourite recipes

## 🧠 Tech Stack

- **React** – Frontend UI library
- **React Router** – Page navigation
- **DummyJSON Recipes API** – Recipe data source
- **CSS Modules** – Component-based styling
- **Vercel** – Deployment & hosting

## 🔗 API Used

This project uses the public DummyJSON Recipes API:
```
https://dummyjson.com/recipes
```

Recipes are fetched from this endpoint and passed into components for rendering.

## 🧩 How It Works

### HomePage(`HomePahge.jsx`)
- The homepage fetches recipe data from the API.
- A `RecipeCard` component is used to display individual recipes.
- The app maps over the API response to render multiple `RecipeCard` components.

Example concept:
```js
recipes.map(recipe => (
  <RecipeCard key={recipe.id} recipe={recipe} />
))
```

### Recipe Page (`RecipePage.jsx`)
When a user clicks on a recipe card:
- They are routed to `RecipePage.jsx`
- The selected recipe is loaded
- Full recipe details are displayed

This separates list view (homepage) from detail view (recipe page), following common React app architecture.

## 📦 Getting Started

### Prerequisites
Make sure you have:
- Node.js (v16 or higher)
- npm or yarn

### 💻 Local Setup

1. Clone the repository:
```bash
git clone https://github.com/MthoNtanzi/recipe-site.git
cd recipe-site-red
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open in browser:
```
http://localhost:3000
```

## 🌱 Future Improvements
- 🧾 Pagination or infinite scrolling
- 📦 Convert to PWA for offline access
- 🌙 Dark mode toggle



## 📄 License
This project is for learning and portfolio purposes. Feel free to use and modify as needed.
