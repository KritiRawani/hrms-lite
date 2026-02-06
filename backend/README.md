# HRMS Lite – Backend (FastAPI)

This is the backend service for **HRMS Lite**, a lightweight Human Resource Management System.

It provides RESTful APIs for:
- Employee management
- Attendance tracking

---

##  Tech Stack

- Python
- FastAPI
- SQLAlchemy
- SQLite (local)
- Pydantic (validation)

---

##  Folder Structure

backend/
│── app/
│ ├── main.py
│ ├── database.py
│ ├── models.py
│ ├── schemas.py
│ ├── crud.py
│ └── routes/
│       ├── employees.py
│       └── attendance.py
│── venv/
│── requirements.txt


##  How to Run Backend Locally

###  Create & activate virtual environment

```bash
python -m venv venv
.\venv\Scripts\Activate.ps1   # PowerShell

###  Install dependencies
pip install -r requirements.txt

### Install dependencies
uvicorn app.main:app --reload

http://127.0.0.1:8000

http://127.0.0.1:8000/docs
