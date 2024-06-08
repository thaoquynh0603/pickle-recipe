import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Collapse from '@mui/material/Collapse';
import CardMedia from '@mui/material/CardMedia';
import { UserContext } from '../UserContext';
import './styles/displayRecipe.css';
require('dotenv').config();

function RecipeCard() {
    const { userData } = useContext(UserContext);
    const [recipeData, setRecipeData] = useState([]);
    const [expandedCardId, setExpandedCardId] = useState(null);

    const airtableToken = process.env.AIRTABLE_TOKEN_READ;
    console.log('Data Name', userData.name);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.airtable.com/v0/appIQYAnCAABYkQtE/recipes?filterByFormula=users+%3D+"${userData.name}"`, {
                    headers: {
                        Authorization: `Bearer ${airtableToken}`, 
                    },
                });
                
                setRecipeData(response.data.records.map(record => ({
                    id: record.id,
                    name: record.fields.Name,
                    description: record.fields.Description,
                    ingredients: record.fields.Ingredients,
                    instructions: record.fields.Instructions.split(/(?=\d+\.\s)/),                    
                    imageUrl: record.fields.Image[0].url, // Assuming the field name is 'image_url'
                    carbs: record.fields.Carbs,
                    protein: record.fields.Protein,
                    fat: record.fields.Fat,
                    calories: record.fields.Calories,
                })));

                console.log('Recipes:', response.data.records);
                console.log('Output:', recipeData);

            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        if (userData.name) {
          fetchData();
          }
      }, [userData.name]);

    const handleExpandClick = (id) => {
        setExpandedCardId(expandedCardId === id ? null : id);
    };

    return (
    <div className='mainPage'>
                {userData.isAuthenticated ? (
                    <div>
                        <h2 className='leftAlign'> Wanna throw away your leftovers? </h2>
                        <h1 className='leftAlign highlight'> Here are some recipes for you! </h1>
                        <div className='recipeContainer'>
                            {recipeData.map(recipe => (
                                <Card className={`collapseContent ${expandedCardId === recipe.id ? 'expanded' : ''}`} key={recipe.id} sx={{ maxWidth: "50%" }}>
                                    <div className='nutritionInfo'>
                                      <CardActions 
                                            className='cardActions nutritionInfoElements'
                                          disableSpacing>
                                          {/* <IconButton aria-label="add to favorites">
                                              <FavoriteIcon />
                                          </IconButton>
                                          <IconButton aria-label="share">
                                              <ShareIcon />
                                          </IconButton> */}
                                          <IconButton
                                              aria-expanded={expandedCardId === recipe.id}
                                              onClick={() => handleExpandClick(recipe.id)}
                                              aria-label="show more"
                                          >
                                              <ExpandMoreIcon />
                                          </IconButton>
                                      </CardActions>
                                        <Typography paragraph id='CalorieNutrient' className='nutritionInfoElements'><p>Calories: {recipe.calories}</p></Typography>
                                        <Typography paragraph id='CarbNutrient' className='nutritionInfoElements'><p>Carb: {recipe.carbs}</p></Typography>
                                        <Typography paragraph id='ProteinNutrient' className='nutritionInfoElements'><p>Protein: {recipe.protein}</p></Typography>
                                        <Typography paragraph id='FatNutrient' className='nutritionInfoElements'><p>Fat: {recipe.fat}</p></Typography>
                                       
                                    </div>
                                   
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={recipe.imageUrl}
                                        alt="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {recipe.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {recipe.description}
                                        </Typography>
                                    </CardContent>
                                    <br></br>
                                    <br></br>
                                    {/* <div
                                        className=
                                    > */}
                                        <CardContent>
                                            <Typography paragraph>Ingredients:</Typography>
                                            <Typography paragraph>
                                                {recipe.ingredients}
                                            </Typography>
                                            <Typography paragraph>Instructions:</Typography>
                                            {recipe.instructions.map((instruction, index) => (
                                                <Typography key={index} paragraph>
                                                    {instruction}
                                                </Typography>
                                            ))}
                                        </CardContent>
                                    {/* </div> */}
                                </Card>
                            ))}
                        </div>
                    </div>
                ) : (
                    // display image in a circle with the file path src\components\styles\loginpickle.jpeg
                    <div class="image-container">
                    <img className='pickleImg' src={require('./styles/loginpickle.jpeg')} alt='pickle'/>
                    </div>
                )}
            </div>
    );
}

export default RecipeCard;
