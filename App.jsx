
import { useState } from "react";
import "./App.css";

const artwork = "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600";

const features = [
  "Study Planner",
  "Mood Tracker",
  "Relaxation Centre",
  "Personal Journal",
  "Support Centre",
  "Focus Timer",
  "Exam Countdown",
  "Smart Reminders",
  "Weekly Analytics",
  "Goals & Habits",
  "Profile & Settings",
  "Motivational Quotes",
  "Offline Mode",
];

export default function App() {
  const [page, setPage] = useState("Welcome");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState([]);

  const go = (next) => {
    setPage(next);
    window.scrollTo(0, 0);
  };

  return (
    <div className="page">
      <div className="orb orb-a" />
      <div className="orb orb-b" />

      <header className="nav">
        <button className="logo" onClick={() => go("Dashboard")}>
          <span className="logo-mark" /> MindBridge
        </button>
        <nav className="links">
          <button onClick={() => go("Dashboard")}>Dashboard</button>
          <button onClick={() => go("Login")}>Login</button>
        </nav>
      </header>

      <main>
        {page === "Welcome" && (
          <section className="hero welcome-layout">
            <div>
              <p className="eyebrow">YOUR SPACE TO GROW</p>
              <h1>Your mind matters.<span> Your journey begins here.</span></h1>
              <p className="lede">
                A friendly space to balance studying, emotions, wellbeing,
                and everyday goals.
              </p>
              <div className="actions">
                <button className="btn primary" onClick={() => go("Login")}>
                  Get Started
                </button>
                <button className="btn ghost" onClick={() => go("Dashboard")}>
                  Explore Dashboard
                </button>
              </div>
            </div>
            <div className="art-frame">
              <img src={artwork} alt="Student portrait illustration" />
              <div className="art-caption">A brighter day starts with you</div>
            </div>
          </section>
        )}

        {page === "Login" && (
          <section className="login-panel">
            <div className="login-art">
              <img src={artwork} alt="MindBridge welcome portrait" />
              <h2>You are not alone.</h2>
              <p>Take a breath. One small step is enough.</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); go("Dashboard"); }}>
              <p className="eyebrow">WELCOME BACK</p>
              <h1>Sign in to MindBridge</h1>
              <label>Your name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />
              <label>Email address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
              <button className="btn primary" type="submit">Continue to dashboard</button>
              <p className="muted-note">Demo interface only; no account is created.</p>
            </form>
          </section>
        )}

        {page === "Dashboard" && (
          <>
            <section className="dashboard-heading">
              <p className="eyebrow">YOUR PERSONAL SPACE</p>
              <h1>Hello{name ? `, ${name}` : ""}! <span>You've got this.</span></h1>
              <p className="lede">Small steps make meaningful progress.</p>
            </section>
            <section className="stats-grid">
              <article className="card"><h2>Today's focus</h2><strong>25 min</strong><p>Make space for one thing.</p></article>
              <article className="card"><h2>Daily wellbeing</h2><strong>Good start</strong><p>Check in with yourself.</p></article>
              <article className="card"><h2>Your goals</h2><strong>{done.length} completed</strong><p>Every step counts.</p></article>
            </section>
            <h2 className="section-title">Explore MindBridge</h2>
            <section className="features">
              {features.map((item, i) => (
                <button className={`card feature-card feature-${i % 4}`} key={item} onClick={() => go(item)}>
                  <span className="feature-number">{String(i + 1).padStart(2, "0")}</span>
                  <h2>{item}</h2>
                  <p>Open your {item.toLowerCase()} space.</p>
                  <span className="open-feature">Open feature ↗</span>
                </button>
              ))}
            </section>
          </>
        )}

        {!["Welcome", "Login", "Dashboard"].includes(page) && (
          <section className="feature-page">
            <button className="btn ghost back-button" onClick={() => go("Dashboard")}>← Back to dashboard</button>
            <p className="eyebrow">MINDBRIDGE TOOL</p>
            <h1>{page}</h1>
            <p className="lede">Make a little space for yourself today.</p>
            {page === "Focus Timer" && <FocusTimer />}
            {page === "Study Planner" && <Planner />}
            {page === "Mood Tracker" && <MoodTracker />}
            {!["Focus Timer", "Study Planner", "Mood Tracker"].includes(page) && (
              <div className="card feature-content">
                <h2>Your {page}</h2>
                <p>Use this space to reflect, plan, and take your next small step.</p>
                <textarea placeholder={`Write something for your ${page.toLowerCase()}...`} rows="5" />
                <button className="btn primary" onClick={() => alert("This is a demo. Connect storage to save your entries.")}>Save entry</button>
              </div>
            )}
          </section>
        )}
      </main>
      <footer className="footer"><p>MindBridge · your space to grow</p></footer>
    </div>
  );
}

function FocusTimer() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  return (
    <div className="card feature-content">
      <h2>{Math.floor(seconds / 60).toString().padStart(2, "0")}:{(seconds % 60).toString().padStart(2, "0")}</h2>
      <p>Focus for a little while, then take a break.</p>
      <div className="actions">
        <button className="btn primary" onClick={() => setRunning(!running)}>{running ? "Pause" : "Start"}</button>
        <button className="btn ghost" onClick={() => { setSeconds(25 * 60); setRunning(false); }}>Reset</button>
      </div>
      {running && <p className="status">Timer demo selected. Use a timer interval to enable countdown.</p>}
    </div>
  );
}

function Planner() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  return (
    <div className="card feature-content">
      <h2>Today's study tasks</h2>
      <form onSubmit={(e) => { e.preventDefault(); if (task.trim()) { setTasks([...tasks, task.trim()]); setTask(""); } }}>
        <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Add a study task..." />
        <button className="btn primary">Add task</button>
      </form>
      {tasks.map((t, i) => <label className="task-row" key={`${t}-${i}`}><input type="checkbox" />{t}</label>)}
    </div>
  );
}

function MoodTracker() {
  const [mood, setMood] = useState("");
  return (
    <div className="card feature-content">
      <h2>How are you feeling today?</h2>
      <div className="mood-options">
        {["Calm", "Happy", "Okay", "Tired", "Stressed"].map((m) => (
          <button className={`btn ${mood === m ? "primary" : "ghost"}`} key={m} onClick={() => setMood(m)}>{m}</button>
        ))}
      </div>
      {mood && <p className="status">Your selected mood: {mood}</p>}
    </div>
  );
}
