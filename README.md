AI Chatbot
A sleek, responsive, and real-time AI Chatbot built using React, Vite, and the Groq API. This application features ultra-fast streaming responses, user authentication via Google OAuth, persistent session history, and a modern user interface designed for seamless conversations.

🚀 Features
Streaming Responses: Real-time, word-by-word text generation powered by Groq's high-performance LLM inference.

Secure Authentication: Integrated Google Sign-In for user authentication.

Persistent Chat History: Maintains your conversation context across messages so the AI remembers the flow.

Robust Error Handling: Built-in retry logic and graceful error states for network interruptions or API limits.

Optimized Performance: Built on Vite for lightning-fast local development and production builds.

Clean UI/UX: Fully responsive layout designed with a focus on readability and smooth user interactions.

🛠️ Tech Stack
Frontend Framework: React (with Hooks & custom state management)

Build Tool: Vite

AI Inference Engine: Groq API

Authentication: Google OAuth 2.0

Styling: Basic CSS3

📦 Getting Started
Follow these steps to get a local copy of the project up and running.

Prerequisites
Make sure you have Node.js (v18 or higher recommended) and npm installed on your machine. You will also need:

A free API key from the Groq Console.

A Google Client ID from the Google Cloud Console.

Installation
Clone the repository:

Bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2. **Install dependencies:**
   ```bash
npm install
Set up environment variables:
Create a .env file in the root directory of your project and add your API credentials:

Code snippet
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   *(Note: The `.env` file is included in `.gitignore` to protect your local credentials from being exposed publicly).*

4. **Run the development server:**
   ```bash
npm run dev
Open http://localhost:5173 in your browser to see the app in action!

🧠 Key Architectural Choices
Custom Hooks: Separated core chat logic, API integration, and streaming parsing into clean, reusable React custom hooks to keep components modular and easy to maintain.

State Management: Handled message arrays and loading states via React state, optimizing component re-renders during high-frequency streaming updates.

Secure Frontend Environment: Leveraged Vite environment variables (import.meta.env) to manage API and Auth configurations cleanly without hardcoding sensitive strings.