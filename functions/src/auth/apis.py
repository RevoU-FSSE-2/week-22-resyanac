from flask import Blueprint, request
from common.bcrypt import bcrypt
from user.models import User
from db import db
import jwt, os
from datetime import datetime, timedelta
from marshmallow import Schema, fields, ValidationError
from user.roles import UserBasedOnRole

auth_blup = Blueprint("auth", __name__)

class UserRegistrationSchema(Schema):
    username = fields.String(required=True)
    password = fields.String(required=True)
    role = fields.String(default= UserBasedOnRole.USER, required=True)

@auth_blup.route("/registration", methods=["POST"])
def register():
    data = request.get_json()
    schema = UserRegistrationSchema()
    try:
        data = schema.load(data)
    except ValidationError as err:
            return {"success": False, "error": err.messages}, 400

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], password=hashed_password, role=data['role'])
    db.session.add(new_user)
    db.session.commit() 

    return {
        'id': new_user.id,
        'username': new_user.username,
        'role' : new_user.role,
        'message': "Register User Success",
        'success': True,
    }


@auth_blup.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    username = data["username"]
    password = data["password"]

    user = User.query.filter_by(username=username).first()
    if not user:
        return {"error_message": "Username or Password is Incorrect"}, 401
    
    valid_password = bcrypt.check_password_hash(user.password, password)
    if not valid_password:
        return {"error_message": "Username or Password is not valid"}, 401
    
    payload = {
        'user_id': user.id,
        'username': user.username,
        'role': user.role,
        'exp': datetime.utcnow() + timedelta(minutes=20)
    }
    token = jwt.encode(payload, os.getenv('SECRET_KEY'), algorithm="HS256")


    return {
        'success': True,
        'message': 'Login Success',
        'id': user.id,
        'username': user.username,
        'role': user.role,
        'token': token
    }