from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from .. import schemas, crud

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)

@router.post(
    "",
    response_model=schemas.EmployeeResponse,
    status_code=status.HTTP_201_CREATED
)
def create_employee(
    employee: schemas.EmployeeCreate,
    db: Session = Depends(get_db)
):
    # Duplicate email check
    if crud.get_employee_by_email(db, employee.email):
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    # Duplicate employee ID check
    if crud.get_employee_by_employee_id(db, employee.employee_id):
        raise HTTPException(
            status_code=400,
            detail="Employee ID already exists"
        )

    return crud.create_employee(db, employee)

@router.get(
    "",
    response_model=list[schemas.EmployeeResponse]
)
def get_employees(db: Session = Depends(get_db)):
    return crud.get_employees(db)

@router.delete(
    "/{employee_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):
    employee = crud.get_employee_by_id(db, employee_id)

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    crud.delete_employee(db, employee)
