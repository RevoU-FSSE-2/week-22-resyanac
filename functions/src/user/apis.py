# from auth.utils import user_required
from user.models import User
from flask import Blueprint

user_bluep = Blueprint("user", __name__)

@user_bluep.route("", methods=["GET"])
# @user_required
def get_user_profile(user_id):
    if not user_id:
        return { "error_message": "User Not Found", "Success": False }, 404
    
    user = User.query.get

    if not user:
        return { "error_message": "User Not Found", "Success": False }, 404
    
    return {
        'message': "Successful Get User Profile",
        'data': {
            'id': user.id,
            'username': user.username,
            'role': user.role.value
        }
    }