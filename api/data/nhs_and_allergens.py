import pandas as pd
import os

#dataset loading
data = pd.read_csv(r"C:\Users\Alaukikk\Desktop\FYP\api\recipe_final (1).csv")

# Cleaning ingredients_list
data['ingredients_list'] = data['ingredients_list'].str.replace("[", "").str.replace("]", "").str.replace("'", "").str.lower()


#---------------------------------------------------------------------------------------------------------------------------
# Defining NHS Eatwell categories
eatwell_categories = {
    "fruit_veg": ["apple", "banana", "carrot", "broccoli", "spinach", "tomato", "cucumber", "zucchini", "kale", "avocado"],
    "starchy_carbs": ["rice", "pasta", "potato", "bread", "quinoa", "oats", "barley", "bulgur"],
    "proteins": ["chicken", "beef", "salmon", "eggs", "tofu", "beans", "lentils", "turkey", "shrimp", "fish", "pork"],
    "dairy": ["milk", "yogurt", "cheese", "butter", "cream", "almond milk", "soy milk"],
    "oils": ["olive oil", "sunflower oil", "coconut oil", "vegetable oil"],
    "drinks": ["water", "tea", "coffee", "juice", "smoothie"]
}

#---------------------------------------------------------------------------------------------------------------------------
def assign_eatwell_category(ingredients):
    categories = []
    for category, keywords in eatwell_categories.items():
        if any(keyword in ingredients for keyword in keywords):
            categories.append(category)
    return ", ".join(categories) if categories else "Uncategorized"

# Assign Eatwell categories
data['eatwell_category'] = data['ingredients_list'].apply(assign_eatwell_category)


#=------------------------------------------------------------------------------------------------------------------------------
#Allergerns 
allergens = {
    "peanuts": ["peanut", "peanuts"],
    "tree_nuts": ["almond", "walnut", "pecan", "cashew", "hazelnut", "pistachio", "macadamia"],
    "milk": ["milk", "cheese", "butter", "yogurt", "cream", "buttermilk", "ghee"],
    "eggs": ["egg", "eggs"],
    "fish": ["salmon", "tuna", "cod", "tilapia", "shrimp", "crab", "lobster", "clam", "mussel"],
    "shellfish": ["shrimp", "crab", "lobster", "clam", "mussel", "scallops", "oyster"],
    "soy": ["soy", "tofu", "tempeh", "soy milk", "edamame"],
    "wheat_gluten": ["wheat", "gluten", "flour", "bread", "pasta", "noodles", "cereal", "cracker"],
    "sesame": ["sesame", "tahini"]
}
#=------------------------------------------------------------------------------------------------------------------------------


# Detect allergens
def detect_allergens(ingredients):
    detected_allergens = []
    for allergen, keywords in allergens.items():
        if any(keyword in ingredients for keyword in keywords):
            detected_allergens.append(allergen)
    return ", ".join(detected_allergens) if detected_allergens else "No Allergens"
data['allergens'] = data['ingredients_list'].apply(detect_allergens)


data.to_csv(r"C:\Users\Alaukikk\Desktop\FYP\api\data\categorized_recipes.csv", index=False)
