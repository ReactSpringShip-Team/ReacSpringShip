# 🚀 ReacSpringShip: High-Performance Space Shooter & Gaming Ecosystem

**ReacSpringShip** is a full-stack web gaming platform that blends a fluid, arcade-style space shooter experience with a robust, enterprise-grade backend. This project serves as a showcase of modern software engineering, featuring a data-driven game engine in the frontend and a secure, scalable architecture in the backend.

---

## 🛠️ Frontend Architecture: The ECS Engine

The client-side is built with **React 19** and **TypeScript**, leveraging the **Canvas API** for high-frequency rendering. Unlike traditional web apps, the core game logic is architected using the **Entity Component System (ECS)** pattern.

### Why ECS?

- **Performance at Scale:** By separating data (Components) from logic (Systems), the engine maintains a consistent 60 FPS, even with hundreds of active entities (bullets, enemies, particles) on screen.
- **Extreme Decoupling:** Adding new features—like a different enemy type or a weapon power-up—is as simple as creating a new system, without touching existing code.
- **Predictable State:** The unidirectional data flow ensures the game state is easy to debug and extend.

### Key Technologies

| Technology | Purpose |
|---|---|
| **Vite 7** | Next-generation build tool for instant HMR and optimized production bundles |
| **Tailwind CSS 4** | Sleek, responsive HUD and menu interfaces |
| **Vitest** | Engine reliability through rigorous unit and integration testing |

---

## 🛡️ Backend Architecture: The Enterprise Core

The backend is a RESTful API developed with **Java 25** and **Spring Boot 4**, designed with a focus on security, maintainability, and the "Clean Architecture" philosophy.

### Core Strengths

- **Advanced Security:** Implementation of **Spring Security** with **OAuth2 Resource Server** and JWT, ensuring user data and competitive integrity are protected.
- **Modern Java 25 Features:** Utilizing the latest language enhancements (Virtual Threads for concurrency and Pattern Matching) to ensure the API is future-proof and efficient.
- **Reliable Persistence:** Powered by **Spring Data JPA** with **PostgreSQL** for production and **H2** for rapid development and testing.
- **Interactive Documentation:** Fully documented with **SpringDoc OpenAPI (Swagger)**, providing a clear contract for frontend-backend communication.

### Key Technologies

| Technology | Purpose |
|---|---|
| **Docker** | Complete containerization of the ecosystem for seamless deployment and environment parity |
| **Maven** | Robust dependency management and build lifecycle automation |

---

## 🎯 Current Scope & Implemented Features

This project focuses on a polished, production-ready **Single-Player** experience:

1. **Dynamic Combat Engine:** Real-time physics, collision detection (AABB and Circular), and procedural enemy wave spawning.
2. **Secure Authentication:** Full registration and login flow with encrypted credentials and token-based session management.
3. **Global Leaderboard:** A persistent scoring system that tracks the best pilots across the community.
4. **UX & Settings:** Real-time audio management and customizable controls, saved via persistent user preferences.
5. **Reactive HUD:** A real-time interface built with React that bridges the gap between the high-speed game loop and the DOM.

---

## 🧪 Quality Assurance

Code quality is non-negotiable. The project maintains high standards through:

- **Frontend Testing:** Component and hook testing using **React Testing Library**.
- **Backend Testing:** Integration tests with **JUnit 5** and **MockMvc** to validate API contracts and security layers.

---

## 🚀 Getting Started

The entire environment is orchestrated via Docker for a "one-click" setup:

```bash
git clone https://github.com/your-username/ReacSpringShip.git
```

- Access the game at `http://localhost:5173`
- Explore the API docs at `http://localhost:8080/swagger-ui.html`

---

> **Note for Recruiters:** ReacSpringShip demonstrates my ability to navigate complex frontend performance challenges (ECS/Canvas) while maintaining the architectural rigor required for enterprise-grade backend systems (Java/Spring Security).
