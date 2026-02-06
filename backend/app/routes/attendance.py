from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from .. import schemas, crud

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)

@router.post(
    "",
    response_model=schemas.AttendanceResponse,
    status_code=status.HTTP_201_CREATED
)
def mark_attendance(
    attendance: schemas.AttendanceCreate,
    db: Session = Depends(get_db)
):
    # Check if employee exists
    employee = crud.get_employee_by_id(db, attendance.employee_id)
    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    # Validate status
    if attendance.status not in ["Present", "Absent"]:
        raise HTTPException(
            status_code=400,
            detail="Status must be Present or Absent"
        )

    return crud.create_attendance(db, attendance)

@router.get(
    "/{employee_id}",
    response_model=list[schemas.AttendanceResponse]
)
def get_attendance(
    employee_id: int,
    db: Session = Depends(get_db)
):
    employee = crud.get_employee_by_id(db, employee_id)
    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return crud.get_attendance_by_employee(db, employee_id)
