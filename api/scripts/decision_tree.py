import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, accuracy_score, ConfusionMatrixDisplay
import matplotlib.pyplot as plt
import os
import requests 
from PIL import Image 
from io import BytesIO
import webbrowser
from kmeans import get_similar_foods

print("matplotlib imported successfully")
#Dataloading and preprocessing 
survey_data = pd.read_csv(r"C:\Users\Alaukikk\Desktop\FYP\api\data\Survey Data.csv", encoding='latin1')
survey_data.columns = survey_data.columns.str.strip()

df = survey_data[[ 
    "What is your age?",
    "What is your gender ?",
    "What types of food do you normally eat?",
    "How many calories do you approximately consume daily?",
    "What is your Primary Goal ?",
    "Do you have any Food Allergies ?",
    "How active are you ?"
]].copy()

for col in df.columns:
    df[col] = df[col].astype(str).str.strip().str.lower().str.replace('\xa0', '', regex=False)

# Ordinal mapping for age 
age_mapping = {
    "18-24": 0,
    "25-34": 1,
    "35-44": 2,
    "45-54": 3,
    "55-64": 4,
    "65+": 5
}
df["What is your age?"] = df["What is your age?"].map(age_mapping)

# Label encoding
label_encoders = {}
for col in df.columns:
    if col != "What types of food do you normally eat?":
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        label_encoders[col] = le

target_le = LabelEncoder()
df["target"] = target_le.fit_transform(df["What types of food do you normally eat?"])
df.drop(columns=["What types of food do you normally eat?"], inplace=True)

#Decision Tree
X = df.drop(columns=["target"])
y = df["target"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=12)

dt_model = DecisionTreeClassifier(max_depth=5, random_state=12)
dt_model.fit(X_train, y_train)

y_pred = dt_model.predict(X_test)

print("Model accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))
joblib.dump(dt_model, "decision_tree_model.pkl")

#importances = dt_model.feature_importances_
#feature_names = X.columns

#plt.figure(figsize=(8, 5))
#plt.barh(feature_names, importances)
#plt.xlabel("Importance")
#plt.title("Feature Importance in Decision Tree")
#plt.grid(True)
#plt.tight_layout()
#plt.show()

# Plot confusion matrix
#ConfusionMatrixDisplay.from_estimator(dt_model, X_test, y_test)
#plt.title("Confusion Matrix")
#plt.show()

#Visualize the decision tree
# plt.figure(figsize=(20, 10))
# plot_tree(
#     dt_model,
#     filled=True,
#     feature_names=X.columns,
#     class_names=target_le.classes_,
#     #max_depth=2  
# )
# plt.title("Decision Tree Visualization (First Three Levels)")
# plt.show()
# #Recommendation Function

recipes = pd.read_csv(r"C:\Users\Alaukikk\Desktop\FYP\api\data\health_categorized_recipes.csv")

#ingredient sub
ingredient_substitutions = {
    "nut": ["sunflower seeds", "pumpkin seeds", "coconut flakes"],
    "soy": ["chickpeas", "mung beans", "lentils"],
    "dairy": ["oat milk", "nutritional yeast", "coconut milk"],
    "gluten": ["rice flour", "quinoa", "cornmeal"]
}

def substitute_ingredients(ingredients, allergy):
    if not isinstance(ingredients, str):
        return ingredients  # skip bad entries
    for allergen, alternatives in ingredient_substitutions.items():
        if allergen in allergy:
            for word in ingredients.split(','):
                if allergen in word:
                    return ingredients.replace(word, alternatives[0])
    return ingredients

# Mappings for new user input
gender_map = {"male": 0, "female": 1, "other": 2}
calorie_map = {"less than 1200": 0, "1200-1800": 1, "1800-2500": 2, "more than 2500": 3}
goal_map = {"lose weight": 0, "gain weight": 1, "build muscle": 2, "eat healthier": 3}
allergy_map = {"none": 0, "gluten-free": 1, "lactose free": 2, "nut free": 3, "soy free": 4}
activity_map = {"sedentary": 0, "lightly active": 1, "moderately active": 2, "very active": 3}

def download_images_and_preview(df):
    image_paths = []
    for i, row in df.iterrows():
        try:
            url = row['image_url']
            response = requests.get(url, timeout=10)
            img = Image.open(BytesIO(response.content)).convert("RGB")
            clean_title = "".join(x for x in row['recipe_name'] if x.isalnum() or x in " -_")
            filename = f"{i+1}_{clean_title[:30]}.jpg"
            filepath = os.path.abspath(filename)
            img.save(filepath)

            image_paths.append(filepath)

        except Exception as e:
            print(f"Could not download image for {row['recipe_name']}: {e}")
    return image_paths 
 
def recommend_food(user_input):
    model = joblib.load("decision_tree_model.pkl")

    # Prepare input features from user response
    features = [
        age_mapping.get(user_input['age'].lower(), 0),
        gender_map.get(user_input['gender'].lower(), 0),
        calorie_map.get(user_input['calories'].lower(), 1),
        goal_map.get(user_input['goal'].lower(), 0),
        allergy_map.get(user_input['allergies'].lower(), 0),
        activity_map.get(user_input['activity'].lower(), 0)
    ]

    # Predict food type
    print("Feature Vector:" , features)
    predicted_class = model.predict([features])[0]
    predicted_type = target_le.inverse_transform([predicted_class])[0]

    # Filter recipes based on predicted type
    allergy_keywords = user_input['allergies'].lower().replace(" free", "").split(",")
    filtered = recipes[
        (recipes['health_category'].str.lower() == predicted_type.lower())
    ]

    # Select top 5 matching recipes
    shown = 0
    displayed_recipes = []

    for _, row in filtered.iterrows():
        ingredients = str(row['ingredients_list']).lower()

        if any(allergen.strip() in ingredients for allergen in allergy_keywords):
            substituted = substitute_ingredients(ingredients, allergy_keywords)
            print(f"{row['recipe_name']} (contains allergen)\n   Suggested substitution: {substituted}\n")
        else:
            print(f"{row['recipe_name']} — Calories: {row['calories']}, Protein: {row['protein']}")
            displayed_recipes.append(row)
            shown += 1

        if shown >= 5:
            break

    # Convert to list of dictionaries for API/json
    recipe_list = [row.to_dict() for row in displayed_recipes]

    # Download and preview images
    if displayed_recipes:
        image_df = pd.DataFrame(displayed_recipes)
        image_paths = download_images_and_preview(image_df)
    else:
        image_paths = []

    # Use KMeans to get similar recommendations
    top5_titles = [row['recipe_name'] for row in displayed_recipes]
    similar_recs = get_similar_foods(top5_titles)

    # Print for debugging/console preview
    print("Top 5 Recommended Recipes:")
    for r in recipe_list:
        print(f"- {r['recipe_name']} (Calories: {r.get('calories', 'N/A')}, Protein: {r.get('protein', 'N/A')})")

    print("Similar Food: ")
    for r in similar_recs:
        print(f"- {r['recipe_name']} (Cluster-based match)")

    # Final return for use in app or API
    return {
        "recommended": recipe_list,
        "images": image_paths,
        "similar_options": similar_recs
    }


# ------------------------
# User Testing
# ------------------------
user_input = {
    "age": "25-34",
    "gender": "male",
    "calories": "1200-1800",
    "goal": "eat healthier",
    "allergies": "soy free",
    "activity": "sedentary"
}
recommend_food(user_input)


