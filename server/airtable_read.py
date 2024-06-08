import os 
from python_dotenv import read_dotenv
loead_dotenv()

AIRTABLE_TOKEN = os.getenv('AIRTABLE_TOKEN')
AIRTABLE_BASE = os.getenv('AIRTABLE_BASE')

print(AIRTABLE_TOKEN, AIRTABLE_BASE)