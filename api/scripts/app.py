from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import pandas as pd
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from decision_tree import recommend_food
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
data = pd.read_csv(r"C:\Users\Alaukikk\Desktop\FYP\api\data\health_categorized_recipes.csv")

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/food-recommendation-db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)


# Configure JWT Secret Key
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  
jwt = JWTManager(app)

# Create the Database
with app.app_context():
    db.create_all()


# Sign-Up Endpoint
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    # Check if user already exists
    if User.query.filter_by(username=username).first():
        return jsonify({"message": "User already exists"}), 409

    # Hash the password
    password_hash = generate_password_hash(password)

    print(len(password_hash))

    # Create new user
    new_user = User(username=username, password_hash=password_hash)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

# Login Endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    # Find user by username
    user = User.query.filter_by(username=username).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"message": "Invalid username or password"}), 401

    # Generate JWT Token
    access_token = create_access_token(identity=user.id)
    return jsonify({"message": "Login successful", "access_token": access_token}), 200

# API Endpoint for Recommendations
@app.route('/recommend', methods=['POST'])
def recommend():
    user_input = request.json
    
     
    # Get recommendations
    food = recommend_food(user_input)
    return jsonify(food)


if __name__ == '__main__':
    app.run(debug=True)
    