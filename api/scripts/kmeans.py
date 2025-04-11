import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
import seaborn as sns

recipes = pd.read_csv(r"C:\Users\Alaukikk\Desktop\FYP\clean-fyp\api\data\health_categorized_recipes.csv")

features = ['calories','fat','carbohydrates','protein','cholesterol','sodium','fiber']
recipes_clean = recipes.dropna(subset=features).copy()
scaler = StandardScaler()
X_scaled = scaler.fit_transform(recipes_clean[features])


kmeans = KMeans(n_clusters=7, random_state=42)
recipes_clean['cluster'] = kmeans.fit_predict(X_scaled)

# Function: Get similar foods based on clustering
def get_similar_foods(top5_titles):
    clusters = recipes_clean[recipes_clean['recipe_name'].isin(top5_titles)][['recipe_name', 'cluster']]

    similar_recs = []
    for cluster_id in clusters['cluster'].unique():
        similar = recipes_clean[recipes_clean['cluster'] == cluster_id]
        similar = similar[~similar['recipe_name'].isin(top5_titles)]
        sampled = similar.sample(n=min(3, len(similar)), random_state=42)
        similar_recs.extend(sampled.to_dict(orient='records'))

    return similar_recs


# Visualize cluster
def plot_clusters():
    from sklearn.decomposition import PCA

    pca = PCA(n_components=2)
    X_pca = pca.fit_transform(X_scaled)
    recipes_clean['pca1'] = X_pca[:, 0]
    recipes_clean['pca2'] = X_pca[:, 1]

    plt.figure(figsize=(10, 6))
    sns.scatterplot(data=recipes_clean, x='pca1', y='pca2', hue='cluster', palette='Set2', s=80)
    plt.title("K-Means Clusters of Recipes (PCA Projection)")
    plt.xlabel("PCA 1")
    plt.ylabel("PCA 2")
    plt.grid(True)
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    
    plot_clusters()
