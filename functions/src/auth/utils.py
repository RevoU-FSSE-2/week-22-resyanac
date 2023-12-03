import jwt, os
from flask import request
from user.roles import UserBasedOnRole
from functools import wraps

# auth.utils

# def decode_jwt(token):
#     try:
#         payload = jwt.decode(token, os.getenv("SECRET_KEY"), algorithms="HS256")
#         return payload
#     except jwt.ExpiredSignatureError:
#         return None
#     except jwt.InvalidTokenError:
#         return None 
    
def get_token():
    auth_header = request.headers.get('Authorization')

    if not auth_header:
        return None

    token = auth_header.split(' ')[1]
    
    try:
        decoded_token = jwt.decode(token, os.getenv("SECRET_KEY"), algorithms=['HS256'])
        return decoded_token
    except jwt.ExpiredSignatureError:
        print('Token has expired')
        return None
    except jwt.InvalidTokenError:
        print('Invalid token')
        return None

def logged_user(decoded_token):
    return {
        'userRole': decoded_token.get('role'),
        'username': decoded_token.get('username'),
        'userId': decoded_token.get('id')
    }
         

# def role_required(required_role):
#     def decorator(fn):
#         @wraps(fn)
#         def wrapper(*args, **kwargs):
#             auth_header = request.headers.get('Authorization')
#             if not auth_header:
#                 return {"error_message": "No Token Available"}, 401
            
#             parts = auth_header.split()
#             if len(parts) != 2 or parts[0].lower() != 'bearer':
#                 return {"error_message": "Token Invalid"}, 401
            
#             token = parts[1]

#             decoded_token = decode_jwt(token)
#             if decoded_token is None:
#                 return {"error_message": "Token is expired"}, 401
            
#             user_role = decoded_token.get("role")

#             if user_role == required_role:
#                 return fn(token, *args, **kwargs)  # Pass the token as an argument
#             else:
#                 return {"error_message": f"Unauthorized role: {required_role}"}, 403
#         return wrapper
#     return decorator

# admin_required = role_required(UserBasedOnRole.ADMIN.value)
# user_required = role_required(UserBasedOnRole.USER.value)
