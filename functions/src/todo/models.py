from db import db
from datetime import datetime, timedelta
from sqlalchemy import Enum, Column, Integer, String, Date
# from todo.roles import Progress, Priority
# from user.models import User



class Todo(db.Model):
    # def default_due_date():
    #     return datetime.utcnow() + timedelta(days=7)
    __tablename__ = 'todo'
    # user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    maker = Column(String)
    progress = Column(Enum('not started', 'on progress', 'done', name= 'progress_enum'), nullable=False)
    priority = Column(Enum('low', 'medium', 'high', name= 'priority_enum'), nullable=False)
    date = Column(Date, default=datetime.utcnow().date() + timedelta(days=3), nullable=False)
    created_date = Column(Date, default=datetime.utcnow().date(), nullable=False)

    # user = db.relationship('User', backref=db.backref('todos', lazy=True))