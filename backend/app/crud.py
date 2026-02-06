from sqlalchemy.orm import Session
from . import models, schemas

def create_employee(db: Session, employee: schemas.EmployeeCreate):
    db_employee = models.Employee(
        employee_id=employee.employee_id,
        full_name=employee.full_name,
        email=employee.email,
        department=employee.department
    )
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

def get_employees(db: Session):
    return db.query(models.Employee).all()

def get_employee_by_id(db: Session, employee_id: int):
    return db.query(models.Employee).filter(
        models.Employee.id == employee_id
    ).first()

def get_employee_by_email(db: Session, email: str):
    return db.query(models.Employee).filter(
        models.Employee.email == email
    ).first()

def get_employee_by_employee_id(db: Session, employee_id: str):
    return db.query(models.Employee).filter(
        models.Employee.employee_id == employee_id
    ).first()

def delete_employee(db: Session, employee):
    db.delete(employee)
    db.commit()

def create_attendance(db: Session, attendance: schemas.AttendanceCreate):
    record = models.Attendance(
        employee_id=attendance.employee_id,
        date=attendance.date,
        status=attendance.status
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record

def get_attendance_by_employee(db: Session, employee_id: int):
    return db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id
    ).all()
