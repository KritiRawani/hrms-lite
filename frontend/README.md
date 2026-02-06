# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


```md
# HRMS Lite – Frontend (React)

This is the frontend application for **HRMS Lite**, built using React.

It provides a clean UI for:
- Managing employees
- Marking and viewing attendance

---

##  Tech Stack

- React (Vite)
- JavaScript
- Axios
- CSS

---

##  Folder Structure

frontend/
│── src/
│ ├── api/
│ │ ├── api.js
│ │ ├── employees.js
│ │ └── attendance.js
│ ├── pages/
│ │ ├── Employees.jsx
│ │ └── Attendance.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│── package.json


---

##  How to Run Frontend Locally

###  Install dependencies

```bash
npm install
npm run dev
http://localhost:5173

