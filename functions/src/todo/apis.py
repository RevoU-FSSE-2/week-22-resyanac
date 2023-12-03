from flask import Blueprint, request, jsonify
from flask_jwt_extended import current_user
import jwt, os
from datetime import datetime, timedelta
from auth.utils import get_token, logged_user
from db import db
from user.models import User
from todo.models import Todo
from sqlalchemy.exc import SQLAlchemyError
# from marshmallow import Schema, fields, ValidationError
# from todo.roles import Progress, Priority
from user.roles import UserBasedOnRole

todo_blueprint = Blueprint("todo", __name__)
 
# class TodoSchema(Schema):
#     title = fields.String(required=True)
#     maker = fields.String(default= current_user,required=True)
#     progress = fields.String(default=Progress.NOT_STARTED, required=True)
#     priority = fields.String(default=Priority.LOW, required=True)

@todo_blueprint.route('/', methods=['POST'])
# @role_required
def create_todo():
    token = get_token()
    if not token:
        return jsonify({
            'success': False,
            'message': 'Unauthorized, please login'
        }), 401

    user_info = logged_user(token)
    username = user_info['username']

    data = request.get_json()
    title = data.get('title')
    progress = data.get('progress')
    priority = data.get('priority')

    if priority not in ['high', 'medium', 'low']:
            return jsonify({
                'success': False,
                'message': "Only 'high', 'medium', or 'low' allowed in priority"
            }), 400
    
    if progress not in ['on started', 'on progress', 'done']:
            return jsonify({
                'success': False,
                'message': "only 'on started', 'on progress', or 'done' allowed in priority"
            }), 400

    new_todo = Todo(
        # user_id=user_id,  # Associate the todo with the user
        title=title, 
        maker=username,
        progress=progress, 
        priority=priority
    )
    
    db.session.add(new_todo)
    db.session.commit()

    return {
        'message': 'Success Create To Do List',
        'data':{
            'title': new_todo.title,
            'maker': new_todo.maker,
            'progress': new_todo.progress,
            'priority': new_todo.priority
        }
    }, 200


@todo_blueprint.route('/', methods=['GET'])
# @role_required
def get_todos():
    token = get_token()
    if not token:
        return jsonify({
            'success': False,
            'message': 'Unauthorized, please login'
        }), 401

    user_info = logged_user(token)
    role = user_info['userRole']
    username = user_info['username']
    if role == "admin":
        todos = Todo.query.all()
    else:
        todos = Todo.query.filter_by(maker = username).all()

    # result_todos = []
    # for todo in todos:
    #     serialized_todo = {
    #         "id": todo.id,
    #         "title": todo.title,
    #         "maker": todo.maker,
    #         "progress": todo.progress,
    #         "priority": todo.priority, 
    #         "date": todo.date.strftime("%Y-%m-%d %H:%M:%S"),
    #         "created_date": todo.created_date.strftime("%Y-%m-%d %H:%M:%S")
        # }
        # result_todos.append(serialized_todo)
    todo_list = [{
        "id": todo.id,
        "title": todo.title,
        "maker": todo.maker,
        "progress": todo.progress,
        "priority": todo.priority, 
        "date": todo.date.strftime("%Y-%m-%d %H:%M:%S"),
        # "created_date": todo.created_date.strftime("%Y-%m-%d %H:%M:%S")
    } for todo in todos]
    
    return {
        "success": True,
        "message": "List of To Do",
        "data": todo_list,
        
    }, 200


@todo_blueprint.route('/<int:todo_id>', methods=['PUT'])
# @role_required
def update_todo(todo_id):  # Change 'id' to 'todo_id'
    try:
        data = request.get_json()
        progress = data.get('progress')
        priority = data.get('priority')
        date = data.get('date')

        todo = Todo.query.get(todo_id)  # Change 'id' to 'todo_id'
        if not todo:
            return {'error_message': 'To Do List did not exist'}, 404

        if progress is not None:
            todo.progress = progress
        if priority is not None:
            todo.priority = priority
        if date is not None:
            todo.date = date
    
        db.session.commit()

        return {'success': True, 'message': 'To Do List successfully updated', 'data': todo_id}, 200

    except SQLAlchemyError as error:
        db.session.rollback()
        return {'error_message': 'Error updating To Do List'}, 500


@todo_blueprint.route('/<int:todo_id>', methods=['DELETE'])
# @role_required
def delete_todo(todo_id):
    token = get_token()
    if not token:
        return jsonify({
            'success': False,
            'message': 'Unauthorized, please login'
        }), 401

    user_info = logged_user(token)
    username = user_info['username']

    todo = Todo.query.filter_by(id = todo_id).first()
    print(todo)
    if not todo:
        return {'error_message': 'To Do Not Found'}, 404
    # Check if the user has permission to delete the todo
    if todo.maker == username:
        db.session.delete(todo)
        db.session.commit()
        return {'message': 'To Do List Deleted Successfully', "data": todo_id }, 200
    else:
        return {'error_message': 'Unauthorized to delete To Do List'}, 403

