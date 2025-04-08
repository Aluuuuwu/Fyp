from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import pandas as pd
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from decision_tree import recommend_food
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}}, supports_credentials=True)

# Load your recipe data if needed for the model
data = pd.read_csv(r"C:\Users\Alaukikk\Desktop\FYP\api\data\health_categorized_recipes.csv")

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/food-recommendation-db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'

db = SQLAlchemy(app)
jwt = JWTManager(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

# UserProfile Model
class UserProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    age = db.Column(db.String(20))
    food_type = db.Column(db.String(50))
    calories = db.Column(db.String(50))
    goal = db.Column(db.String(50))
    allergies = db.Column(db.String(200))
    activity = db.Column(db.String(50))

    user = db.relationship('User', backref=db.backref('profiles', lazy=True))

# Create tables
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

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "User already exists"}), 409

    password_hash = generate_password_hash(password)
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

    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"message": "Invalid username or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"message": "Login successful", "access_token": access_token}), 200

# Recommendation Endpoint
@app.route('/recommend', methods=['POST'])
@jwt_required()  # Requires user to be logged in
def recommend():
    try:
        user_id = get_jwt_identity()
        user_input = request.get_json()

        # Save user input as a UserProfile
        profile = UserProfile(
            user_id=user_id,
            age=user_input.get('age'),
            food_type=user_input.get('foodType'),
            calories=user_input.get('calories'),
            goal=user_input.get('goal'),
            allergies=user_input.get('allergies'),
            activity=user_input.get('activity')
        )
        db.session.add(profile)
        db.session.commit()

        # Get recommendations using your logic
        recommendations = recommend_food(user_input)
        return jsonify(recommendations)

    except Exception as e:
        print("Error in /recommend:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
