import React, { Component } from 'react';
import '../../scss/Search.scss';
import axios from 'axios';
import select from '../../assets/icons/add.svg'
import { v4 as uuidv4 } from 'uuid';
import RecipeModal from '../../components/RecipeModal'
import AddToModal from '../../components/AddToModal'
import { mealType as randomMealType } from '../../utils/randomMealType';
import { letters as randomQuery } from '../../utils/randomLetter';

// randomQuery[Math.floor(Math.random() * randomQuery.length)]

class Search extends Component {
    // state for meal search and select page
    state = {
        query: randomQuery[Math.floor(Math.random() * randomQuery.length)],
        mealType: randomMealType[Math.floor(Math.random() * randomMealType.length)],
        meals: '',
        from: 0,
        to: 12,
        display: false,
        previous: false,
        src: '',
        selectedMeal: '',
        selectedMealId: ''
    }

    componentDidMount() {
        if(sessionStorage.getItem('query')&&sessionStorage.getItem('mealType')){
            this.setState({
                query: sessionStorage.getItem('query'),
                mealType: sessionStorage.getItem('mealType'),
                from: parseInt(sessionStorage.getItem('from')),
                to: parseInt(sessionStorage.getItem('to')),
            }, this.getMeals)
        } else {
            this.getMeals()
        }    
    }

    componentDidUpdate(_prevP, prevS) {
        prevS.from===12&&this.state.from===0&&
        this.setState({
            previous: false
        })
        prevS.from===0&&this.state.from===12&&
        this.setState({
            previous: true
        })

        !this.state.previous&&this.state.from!==0&&
        this.setState({
            previous: true
        })
    }

    componentWillUnmount() {
        sessionStorage.setItem('query', this.state.query);
        sessionStorage.setItem('mealType', this.state.mealType);
        sessionStorage.setItem('from', this.state.from);
        sessionStorage.setItem('to', this.state.to);
    }

    // request to get meals from api based on search
    getMeals = () => {
        const API_URL = process.env.REACT_APP_API_URL;
        const API_ID = process.env.REACT_APP_API_ID;
        const API_KEY = process.env.REACT_APP_API_KEY;
        const MEAL = `&mealType=${this.state.mealType}&from=${this.state.from}&to=${this.state.to}`;
        const QUERY = this.state.query;

        this.state.query&&this.state.mealType&&!this.state.meals&&
        axios.get(API_URL+QUERY+API_ID+API_KEY+MEAL)
        .then(response => {
            this.setState({
                meals: response.data.hits.map(meal => meal.recipe)
            })
        }) 
    }

    // onChange handler for search input
    changeSearchIngredient = (e) => {
        this.setState({
            meals: '',
            query: e.target.value.toLowerCase()
        }, this.getMeals)   
    }

    // onChange handler for select input
    changeMealType = (e) => {
        this.setState({
            meals: '',
            mealType: e.target.value
        }, this.getMeals)
    }

    // resets meals forcing new request for the next 10 meals in the search
    handleNext = () => {
        this.setState({
            meals: '',
            from: this.state.from + 12,
            to: this.state.to + 12
        }, this.getMeals)
    }

    // resets meals forcing new request for the previous 10 meals in the search
    handlePrevious = () => {
        (this.state.from > 0)&&
        this.setState({
            meals: '',
            from: this.state.from - 12,
            to: this.state.to - 12
        }, this.getMeals)
    }

    // post to server with the meal wanting to be added
    handleAdd = (meal, id, date, week) => {
        const ingredients = meal.ingredients.map(ingredient => {
           const newIngredient = {
                id: uuidv4(),
                week: week,
                mealId: id,
                quantity: ingredient.quantity,
                measure: ingredient.measure,
                food: ingredient.food,
                foodId: ingredient.foodId,
                weight: ingredient.weight,
                category: ingredient.foodCategory,
                image: ingredient.image
            }

            return newIngredient
        })
        axios.post(`http://localhost:8080/meals`, {
            id: id,
            date: date,
            week: week,
            calories: Math.ceil(meal.calories / meal.yield),
            name: meal.label,
            image: meal.image,
            url: meal.url,
            ingredients: ingredients
        }).then(()=>{
            axios.post(`http://localhost:8080/groceries`, { plan: true })
            .then()
            .catch()
        })
        .catch(console.error)
    }

    //opens the modal
    showIframe = (src) => {
        this.setState({
            src: src
        })
    }

    resetSrc = () => {
        this.setState({
            src: ''
        })
    }

    showAddTo = (meal, id) => {
        this.setState({
            display: true,
            selectedMeal: meal,
            selectedMealId: id
        })
    }

    resetDisplay = () => {
        this.setState({
            display: false,
            selectedMeal: '',
            selectedMealId: ''
        })
    }

    render() {
        return (
            <div>
                <form>
                    <input type='search' name='searchIngredient' placeholder="Search Meals" value={this.state.query} onChange={this.changeSearchIngredient}/>
                    <select name='mealType' value={this.state.mealType} onChange={this.changeMealType}>
                    <option defaultValue value="default" hidden>
                      Please select a meal:
                    </option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    </select>
                </form>
                {/* render meal cards */}
                <ul className="mealList">
                    {this.state.meals&&this.state.meals.map(meal => {
                        const id = uuidv4();
                    return <li key={id} className="mealCard">
                        <img className="mealCard-select" onClick={()=>this.showAddTo(meal, id)} src={select} alt="plus symbol"/>
                        <img className="mealCard-image" onClick={()=>this.showIframe(meal.url)} src={meal.image} alt={meal.label}/>
                        <div className="mealCard-details">
                            <span>
                                {meal.label}
                            </span>
                            <span>
                                {`${Math.ceil(meal.calories / meal.yield)} cals`}
                            </span>
                        </div>
                    </li>
                    })}
                </ul>
                <button style={{ display: this.state.previous ? "flex" : "none" }} onClick={this.handlePrevious}>PREVIOUS</button>
                <button onClick={this.handleNext}>NEXT</button>
                    {/* Modal */}
                    <RecipeModal resetSrc={this.resetSrc} src={this.state.src}/>
                    {/* Add to modal */}
                    <AddToModal 
                    display={this.state.display} 
                    meal={this.state.selectedMeal}
                    id={this.state.selectedMealId}
                    addToDate={this.handleAdd} 
                    resetDisplay={this.resetDisplay}
                    />
            </div>
        );
    }
}

export default Search;