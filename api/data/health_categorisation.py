import pandas as pd
import os


data = pd.read_csv(r"C:\Users\Alaukikk\Desktop\FYP\api\data\categorized_recipes.csv")

#Health Category

def classify_health_category(row):
    calories = row['calories']
    fat = row['fat']
    carbs = row['carbohydrates']
    protein = row['protein']
    cholesterol = row['cholesterol']
    sodium = row['sodium']
    fiber = row['fiber']
    eatwell = row['eatwell_category'].lower() if isinstance(row['eatwell_category'], str) else ""
    allergens = row['allergens'].lower() if isinstance(row['allergens'], str) else ""

    # Special Diet
    if all(a not in allergens for a in ['gluten', 'soy', 'milk', 'nut']):
        if carbs < 20 or protein >= 20:
            return "Special Diet"

    # Healthy
    if (
        calories < 600 and
        fat < 10 and
        sodium < 300 and
        cholesterol < 75 and
        fiber >= 3 and
        protein >= 10 and
        any(g in eatwell for g in ['fruit_veg', 'proteins', 'starchy_carbs'])
    ):
        return "Healthy"

    # Moderately Healthy
    if (
        calories < 800 and
        fat < 17.5 and
        sodium < 600 and
        cholesterol < 150 and
        fiber >= 2 and
        any(g in eatwell for g in ['fruit_veg', 'proteins', 'starchy_carbs', 'dairy'])
    ):
        return "Moderately Healthy"

    # Fast Food
    if (
        calories >= 800 or
        fat >= 20 or
        sodium >= 600 or
        cholesterol >= 200 or
        fiber < 2
    ):
        return "Fast Food"

    return "Uncategorized"

data['health_category'] = data.apply(classify_health_category, axis=1)


output_folder = r"C:\Users\Alaukikk\Desktop\FYP\api\data"
os.makedirs(output_folder, exist_ok=True)
output_path = os.path.join(output_folder, "health_categorized_recipes.csv")
data.to_csv(output_path, index=False)


