import pandas as pd
import sqlite3

# Loading data
survey_data = pd.read_excel(r'C:\Users\Alaukikk\Desktop\FYP\system\Survey Data.xlsx')
#print("Survey Data Loaded Successfully:")
#print(survey_data.head())  

nutritional_data = pd.read_csv(r'C:\Users\Alaukikk\Desktop\FYP\system\nutrients_csvfile.csv')
#print("Nutritional Data Loaded Successfully:")
#print(nutritional_data.head())  

# Connect to SQLite database
conn = sqlite3.connect(r'C:\Users\Alaukikk\Desktop\FYP\api\database.db')

# Save data to SQLite tables
survey_data.to_sql('survey_data', conn, if_exists='replace', index=False)
nutritional_data.to_sql('nutritional_data', conn, if_exists='replace', index=False)

# Close the connection
conn.close()