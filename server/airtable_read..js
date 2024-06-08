const apiKey = 'patrTllyb2WdjHNx3.c687a9fbcf885c4b62b9a3bce4f2f5c2e6784c6266419041dfb6d3a51245cc25';
const baseURL = 'https://api.airtable.com/v0/appIQYAnCAABYkQtE/recipes';

async function fetchRecipes() {
    try {
        const response = await fetch(`${baseURL}?fields[]=name&fields[]=ingredients&fields[]=description&fields[]=instructions&fields[]=dietary%20information&filterByFormula=users%3D%22Pickle+Recipe%22`, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }
        
        const data = await response.json();
        return data.records.map(record => ({
            name: record.fields.name,
            ingredients: record.fields.ingredients,
            description: record.fields.description,
            instructions: record.fields.instructions,
            dietaryInformation: record.fields['dietary information'],
        }));
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
}

// Usage example
fetchRecipes().then(recipes => {
    console.log('Recipes:', recipes);
}).catch(error => {
    console.error('Error:', error);
});
