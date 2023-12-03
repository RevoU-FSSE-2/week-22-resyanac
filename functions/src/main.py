import os
from db import db, db_init
from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
# from flask_talisman import Talisman
from common.bcrypt import bcrypt
from firebase_functions import https_fn


from auth.apis import auth_blup
from todo.apis import todo_blueprint
from user.apis import user_bluep

app = Flask(__name__)

@https_fn.on_request(max_instances=1)
def resyanac22(req: https_fn.Request) -> https_fn.Response:
    with app.request_context(req.environ):
        return app.full_dispatch_request()

CORS(app, resources={r"/*": {"origins": ["*"], "method": ["PUT", "POST", "DELETE", "GET"]}})
# Talisman(app)
load_dotenv()

database_url = "postgresql://postgres:Resyaa21042000@db.dwgrpssntdkrmvmkvfde.supabase.co:5432/postgres"
app.config['SQLALCHEMY_DATABASE_URI'] = database_url

db.init_app(app)
bcrypt.init_app(app)

# with app.app_context():
#     db.create_all()
#     initialize_roles()



app.register_blueprint(auth_blup, url_prefix="/auth")
app.register_blueprint(todo_blueprint, url_prefix="/todos")
app.register_blueprint(user_bluep, url_prefix="/user")



# with app.app_context():
#     db_init()