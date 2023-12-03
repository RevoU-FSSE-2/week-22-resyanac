from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import Enum
# from user.roles import UserBasedOnRole
from db import db


class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(25), nullable=False)
