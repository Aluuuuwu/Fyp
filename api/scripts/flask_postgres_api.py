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
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Configure JWT Secret Key

db = SQLAlchemy(app)
jwt = JWTManager(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

# User Profile Model
class UserProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    age = db.Column(db.String(20))
    food_type = db.Column(db.String(50))
    calories = db.Column(db.String(50))
    goal = db.Column(db.String(50))
    allergies = db.Column(db.String(255))
    activity = db.Column(db.String(50))

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

# Store profile data and return recommendations
@app.route('/submit-profile', methods=['POST'])
def submit_profile():
    data = request.get_json()
    required_fields = ["age", "gender", "calories", "goal", "allergies", "activity"]

    if not all(field in data for field in required_fields):
        return jsonify({"message": "Missing fields in the profile data"}), 400

    # Save user profile
    profile = UserProfile(
        age=data['age'],
        gender=data['gender'],
        calories=data['calories'],
        goal=data['goal'],
        allergies=data['allergies'],
        activity=data['activity']
    )
    db.session.add(profile)
    db.session.commit()

    # Get recommendations
    recommendations = recommend_food(data)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
