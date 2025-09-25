# 🎬 Movie App – ALX Project Nexus  

## 📌 Overview  
This repository documents my journey of building a **Movie App** as part of the **ProDev Frontend Engineering Program**.  
The app was not just a coding project, but also a reflection of how I applied concepts in **mobile development, API integration, and UI/UX design** to create a real-world product. Along the way, I explored different tools, tackled bugs, and refined my problem-solving process.  

---

## 🚀 The Journey  

### 🛠️ Starting Out  
- Began with **React Native + Expo** to bootstrap the mobile app.  
- Integrated **Expo Router** for navigation and routing.  
- Designed reusable UI components (cards, buttons, modals) to keep the app scalable.  

### 🎥 Core Features Implemented  
- **Movie Search & Discover** – Fetching data from **TMDB API** (titles, ratings, overviews).  
- **Movie Details Screen** – Displaying trailers, cast, and metadata.  
- **Responsive UI** – Built with **TailwindCSS (NativeWind)** for consistency across devices.  
- **Loading States & Error Handling** – Added `ActivityIndicator` and fallback UI for better UX.  

### ⚡ Challenges & How I Solved Them  
1. **Challenge:** API authentication with TMDB.  
   - **Solution:** Used **environment variables** (`.env`) and configured API headers with secure tokens.  

2. **Challenge:** Nested scroll views breaking performance.  
   - **Solution:** Migrated to `FlatList` and optimized with **list virtualization**.  

3. **Challenge:** Styling inconsistencies across Android & iOS.  
   - **Solution:** Leveraged **NativeWind + SafeAreaView** to align UI properly.  

4. **Challenge:** Managing multiple API calls.  
   - **Solution:** Created a custom `useFetch` hook for cleaner and reusable data fetching logic.  

---

## 📚 Learnings & Best Practices  
- **Component Reusability**: Broke down UI into small, reusable pieces.  
- **API Handling**: Learned to optimize fetch calls with proper error states.  
- **TypeScript**: Ensured type safety and prevented common runtime errors.  
- **System Design Thinking**: Approached the app with scalability in mind before coding.  
- **Version Control Discipline**: Maintained clean, meaningful commits that tell the project’s story.  

---

## 🌍 What’s Next  
- Add **user authentication** for watchlists & favorites.  
- Implement **offline support** for cached movies.  
 
 ---

## Author  
 **Michael Ooga**  

