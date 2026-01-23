import { useState } from "react";
import getAPI from "../services/api";

const Home =()=> {
    return(
        <main className="">
            <div className="HeroSection">
                Savoury Recipes
            </div>
            <div className="recipes">
                <div className="categories">

                </div>
            </div>
        </main>
    )
}

export default Home;