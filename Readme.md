# App Sentiment Search (Next.js Frontend)

A simple Next.js frontend application that allows users to:

- Search for an app name.
- View a dropdown of suggestions.
- Select an app and fetch its sentiment score and total number of reviews.

This project demonstrates:

- Controlled inputs with real-time suggestions.
- Basic API integration using Axios.
- Conditional rendering and request management (loading state, single fetch at a time).
- Minimal styling using inline styles, no external CSS.

---

## 🧱 Project Structure

```
/SENTIMENT-APP
  ├── /pages
  │   └── index.js
  ├── /components
  │   └── SearchBar.js
  ├── Readme.md
  └── package.json

```

## 🚀 How to Run This App

1. **Install dependencies**:

   ```bash
   npm install

   npm run dev
   ```

2- Open your browser and go to:
http://localhost:3000

## Backend API Integration

This app expects two APIs from the backend:

### GET /get_suggestions

Description: Returns a list of app suggestions based on a query.

Example:

```
http://localhost:8000/get_suggestions?query=your_query
```

Response:

```
[
  {
    "name": "Facebook",
    "packageId": "com.facebook.katana"
  },
  {
    "name": "Facebook Lite",
    "packageId": "com.facebook.lite"
  }
]
```

### GET /get_sentiment

Description: Returns sentiment score and total number of reviews for a selected app.

Example:

```
http://localhost:8000/get_sentiment?package_id=your_package_id
```

Response:

```
{
  "score": 4.2,
  "totalReviews": 15324
}
```

### Sentiment Score Explanation:

-1: Negative sentiment

1: Positive sentiment

Between -1 and 1: Neutral sentiment

Example: -0.2 indicates more negative, and 0.2 indicates more positive.

### Features:

1- Provide App suggestions
2- Provide Sentiment score to app on the basis of last 100 reviews.
