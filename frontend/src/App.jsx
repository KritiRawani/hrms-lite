import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import "./index.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>HRMS Lite</h1>
        <p>Employee & Attendance Management System</p>
      </header>

      <main className="main">
        <section className="section">
          <Employees />
        </section>

        <section className="section">
          <Attendance />
        </section>
      </main>
    </div>
  );
}

export default App;
