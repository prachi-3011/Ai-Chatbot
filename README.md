# Central Zoo AI Receptionist

A sleek, production-grade, and real-time AI Chatbot specialized to function exclusively as a front-desk receptionist for "Central City Zoo". Built using **React**, **Vite**, and **Groq Cloud API**, this application features ultra-fast token streaming, secure **Google OAuth 2.0** verification, dynamic user-profile contextual greeting hooks, and an advanced frontend guardrail layout.

---

## 🚀 Key Features

* **Specialized Receptionist Persona:** Hard-anchored into a dedicated Zoo Guide identity. Fully equipped with an immutable knowledge base covering ticket matrixes, operation schedules, and key pavilion features.
* **Prompt Injection Shielding (Scope Guarding):** Engineered with robust, programmatic frontend negation blocks and strict systemic instruction overrides. Safely identifies and neutralizes malicious override statements (e.g., *"ignore previous instructions"*), forcing clean fallback error states.
* **Ultra-Fast Token Streaming:** Real-time, chunk-by-chunk delta rendering via a chunk-buffered `TextDecoder()` assembly loop, powered by Groq's high-speed LPU inference network (`llama-3.1-8b-instant`).
* **Identity Extraction via Google OAuth:** Decodes the base64 JWT payload token client-side (`atob`) to dynamically capture authenticated user attributes without external wrapper packages.
* **Context-Aware Variable Injection:** Feeds the extracted Google profile data cleanly into the stateless model wrapper loop, providing dynamic name greeting behaviors on the user interface that automatically hide upon prompt initialization.
* **Refinement Architecture:** Features clean UI viewport encapsulation to eliminate double scrollbar regressions, modular layout files, and optimized payload mapping to leverage Groq's automatic prompt caching pipelines.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React (Functional Hooks + Custom Context Management Engine)
* **Build Tooling:** Vite
* **AI Inference Layer:** Groq API Cloud Endpoint (`v1/chat/completions`)
* **Model Core:** Llama 3.1 (8B Instant - configured with `top_p: 0.1` for maximum deterministic accuracy)
* **Authentication Hub:** Google OAuth 2.0 (`@react-oauth/google`)
* **Styling Structure:** Component-specific CSS Layering

---

## 📦 Getting Started

Follow these steps to spin up a local development instance of the Zoo AI Receptionist.

### Prerequisites

Ensure you have **Node.js (v18.0.0 or higher)** and `npm` installed locally. You will also require:

1. A valid API key generated from the **Groq Developer Console**.
2. An authorized **OAuth Client ID** provisioned through your **Google Cloud Platform Console**.

### Installation & Local Setup

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

```


2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment Context:**
Create a `.env` configuration file in the project's root folder and provision your credentials:
```env
VITE_GROQ_API_KEY=gsk_your_secret_groq_key_here
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

```


> ⚠️ **Security Warning:** The `.env` template extension is cataloged within the local `.gitignore` manifest to strictly prevent runtime environment secrets from being indexed or exposed on downstream remote repositories.


4. **Boot the Vite Development Engine:**
```bash
npm run dev

```


Navigate your local browser viewport to `http://localhost:5173` to interact with the application.

---

## 🧠 Key Architectural Choices

### Reusable Context Custom Hooks

Abstracted text delta buffers, payload compilation, stream iteration loops, and state changes outside the layout into a decoupled `useLlm` hook layer. This separation cleanly divides the interface configuration code from the networking pipelines.

### Stateless Payload Compilations

Because standard server-less completions act completely state-free, the application handles active state simulation client-side. On every prompt submission, the framework automatically merges the system rules profile, structural restriction lists, refusal instructions, and the current state history array at index `0` of the JSON package before delivering it across the network.

### Strict Structural Failsafes

Configured the inference parameters with low temperature and high accuracy metrics (`top_p: 0.1`). This locks the model down to its localized knowledge base matrix and explicitly restricts it from wandering out-of-scope or hallucinating imaginary personal attributes (e.g., family structures or media preferences).