import "./App.css";
import Auth from "./components/auth/index";
import Login from "./components/auth/Login.tsx";
import LogoutRoute from "./components/auth/LogoutRoute.tsx";
import Social from "./components/social/index";
import Notfound from "./components/notfound";
import Planner from "./components/planner/Planner.jsx";
import Tracker from "./components/tracker/index";
import DMs from "./components/chat/index.tsx";
import GPTDMs from "./components/GPT/index.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./components/auth/context/AuthProvider.tsx";

function App() {
  const { auth, logout } = useContext(AuthContext);

  return (
    <div className="absolute bg-neutral top-0 w-full h-full p-0">
      <div className="w-full navbar bg-secondary p-0">
        <a
          className="btn btn-ghost text-primary hover:bg-accent hover:text-primary text-xl"
          href="/">
          {auth?.username || "SL"}
        </a>
        <a
          className="btn btn-ghost text-primary hover:bg-accent hover:text-primary normal-case text-xl"
          href="/planner">
          Workout Planner
        </a>
        <a
          className="btn btn-ghost text-primary hover:bg-accent hover:text-primary normal-case text-xl"
          href="/tracker">
          Progress Tracker
        </a>
        <a
          className="btn btn-ghost text-primary hover:bg-accent hover:text-primary normal-case text-xl"
          href="/social">
          Feed
        </a>
        <a
          className="btn btn-ghost text-primary hover:bg-accent hover:text-primary normal-case text-xl"
          href="/dm/">
          Chat
        </a>
        <a
          className="btn btn-ghost text-primary hover:bg-accent hover:text-primary normal-case text-xl"
          href="/ai">
          AI
        </a>
        {auth?.username && (
          <a
            className="btn btn-ghost text-primary hover:bg-accent hover:text-primary normal-case text-xl"
            href="/logout">
            Log Out
          </a>
        )}
      </div>
      <div className="flex">
        <div className="grow">
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={auth?.username ? <Planner /> : <Login />}
              />
              <Route
                path="/signup"
                element={auth?.username ? <Planner /> : <Auth />}
              />
              <Route
                path="social"
                element={<Social />}
              />
              <Route
                path="planner"
                element={
                  <Planner
                    currentUsername={auth.username}
                    number={3}
                  />
                }
              />
              <Route
                path="tracker"
                element={<Tracker currentUsername={auth.username} />}
              />
              <Route
                path="/logout"
                element={<LogoutRoute logout={logout} />}
              />
              <Route
                path="/dm/"
                element={
                  auth?.username ? (
                    <DMs currentUsername={auth.username} />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/dm/:friendUsername"
                element={
                  auth?.username ? (
                    <DMs currentUsername={auth.username} />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/ai"
                element={
                  auth?.username ? (
                    <GPTDMs currentUsername={auth.username} />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="*"
                element={<Notfound />}
              />
            </Routes>
          </BrowserRouter>
        </div>
        <div className="p-4 bg-neutral"></div>
      </div>
    </div>
  );
}

export default App;
