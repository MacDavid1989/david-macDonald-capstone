import React from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../assets/icons/long-arrow-right-white.svg';
// imported icons
import hero from '../../assets/images/hero.png';
import browse from '../../assets/images/browse.png';
import largePlan from '../../assets/images/largePlan.png';
import plan from '../../assets/images/plan.png';
import recipe from '../../assets/images/recipe.png';
import shop from '../../assets/images/shop.png';
// styling
import '../../scss/Home.scss';

// Home page component
function Home () {

    return (
        <>
            <div className="home">
                {/* Hero section denoted by turquoise background */}
                <header className="hero">
                    <div className="hero__container">
                        <h1 className="hero__title">
                            Meet Your Favorite Time Saver
                        </h1>
                        <img className="hero__image" src={hero} alt="mobile snapshot of search page"/>
                    </div>
                </header>
                {/* Summary section denoted by 3 mobile screen shot panels */}
                <section className="summary">
                    <h2 className="summary__title">
                        Meal planning and grocery shopping has never been easier.
                    </h2>
                    <div className="summary__container">
                            {/* Browse page screenshot */}
                            <div className="summary__topic">
                                <img className="summary__topic-image" src={browse} alt="browsing through meals"/>
                                <h3 className="summary__topic-title">
                                    Browse
                                </h3>
                            </div>
                            {/* Menu page screenshot */}
                            <div className="summary__topic">
                                <img className="summary__topic-image" src={plan} alt="planning weekly meals"/>
                                <h3 className="summary__topic-title">
                                    Plan
                                </h3>
                            </div>
                            {/* Grpcery page screenshot */}
                            <div className="summary__topic">
                                <img className="summary__topic-image" src={shop} alt="grocery shopping"/>
                                <h3 className="summary__topic-title">
                                    Shop
                                </h3>
                            </div>
                    </div>
                    <Link className="home__link" to="/browse">
                        <span className="home__link-text">
                            Begin Planning
                        </span>
                        <img className="home__link-icon" src={arrow} alt="arrow right"/>
                    </Link>
                </section>
                {/* Large screenshot panel section */}
                <section className="home__card--alt">
                    <h2 className="home__card-title">
                        Plan your meals for the week in just minutes.
                    </h2>
                    <img className="home__card-image--alt" src={largePlan} alt="meal plan snapshot"/>
                    <Link className="home__link" to="/browse">
                        <span className="home__link-text">
                            Browse Recipes
                        </span>
                        <img className="home__link-icon" src={arrow} alt="arrow right"/>
                    </Link>
                </section>
                {/* Singular mobile screenshot section */}
                <section className="home__card">
                    <h2 className="home__card-title">
                        What are you waiting for - Save time, eat well.
                    </h2>
                    <img className="home__card-image" src={recipe} alt="grocery list snapshot"/>
                    <Link className="home__link" to="/browse">
                        <span className="home__link-text">
                            Start Cooking
                        </span>
                        <img className="home__link-icon" src={arrow} alt="arrow right"/>
                    </Link>
                </section>
            </div>
        </>
    );  
};

export default Home;