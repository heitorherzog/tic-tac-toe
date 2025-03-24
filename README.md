# 🕹️ Tic-Tac-Toe Multiplayer + AI

## 🛠️ Requirements

- [.NET 7 SDK](https://dotnet.microsoft.com/download/dotnet/7.0)
- [PostgreSQL](https://www.postgresql.org/)
- [Node.js v18](https://nodejs.org/)
- [Angular CLI v16](https://angular.io/cli)

---

### 🔧 Getting Started

You can run the application using **Visual Studio (F5)** or manually via the command line:

---

#### ▶️ Run via Visual Studio

Simply open the solution in Visual Studio and press **F5** to launch both frontend and backend using the built-in SPA proxy configuration.

---

#### 💻 Run via Command Line

**Backend**  
Start the ASP.NET Core Web API server:

```bash
cd tic-tac-toe.Server
dotnet run
```

**Frontend**

```bash
cd tic-tac-toe.client
npm install
ng serve
```

---

Full-stack Tic-Tac-Toe game using:

- ✅ Angular 16 (frontend)
- ✅ ASP.NET Core 7 (backend)
- ✅ SignalR for real-time multiplayer
- ✅ PostgreSQL for persistent leaderboard
- ✅ MediatR + CQRS for clean backend architecture
- ✅ RxJS-powered reactive frontend with state management

---

## 🚀 Features

- 🧠 Play against AI (offline)
- 👥 Create or join multiplayer rooms via SignalR
- 📊 Leaderboard with wins, draws, and AI stats
- ♻️ Reactive state using `BehaviorSubject`s
- 💾 Persistent leaderboard via PostgreSQL + EF Core
- 📦 Auto-applies EF migrations at startup

---

### 🧪 Development Tips

- ✅ Leaderboard is auto-loaded on app startup with retry logic
- 🧼 Use the GameLogicService to encapsulate all game behavior

#### 🧠 Tech Stack Summary

| Layer        | Tech                                  |
| ------------ | ------------------------------------- |
| Frontend     | Angular 16, RxJS, SignalR client      |
| State        | GameStateService + BehaviorSubject    |
| Backend      | .NET 7, SignalR, ASP.NET Core Web API |
| Data Access  | EF Core + PostgreSQL                  |
| Architecture | MediatR (CQRS), Clean layering        |

##### 📬 API Endpoints

| Method | Route        | Description          |
| ------ | ------------ | -------------------- |
| GET    | /leaderboard | Fetch leaderboard    |
| POST   | /leaderboard | Save leaderboard     |
| WS     | /gamehub     | SignalR live updates |

##### 🧩 TODO / Future Ideas

- ⬆️ Upgrade to Angular Signals or NgRx
- 💬 In-room chat via SignalR
- 🏅 Match history and timestamp
- 🧪 Unit tests for game logic and API

[Using the Task List in Visual Studio](https://learn.microsoft.com/en-us/visualstudio/ide/using-the-task-list?view=vs-2022)
