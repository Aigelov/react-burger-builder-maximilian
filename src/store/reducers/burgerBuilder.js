import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  meat: 1.3,
  bacon: 0.7,
  salad: 0.5,
  cheese: 0.4,
  onion: 0.2
};

const addIngredient = (state, action) => {
  const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  };

  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  };

  return updateObject(state, updatedSt);
};

const setIngredients = (state, action) => {
  const ingredients = action.ingredients;
  return updateObject(state, {
    ingredients: {
      meat: ingredients.meat,
      bacon: ingredients.bacon,
      salad: ingredients.salad,
      cheese: ingredients.cheese,
      onion: ingredients.onion,
    },
    totalPrice: 4,
    error: false
  });
};

const fetchIngredientsFailed = state => {
  return updateObject(state, {error: true});
};

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state);
    default:
      return state;
  }
};

export default burgerBuilder;
