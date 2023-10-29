import React, { useState } from "react";
import "./burger.css";

const Burger = props => {
    // Only displays sidebar if page state is 1; state is passed down from parent component (usually the header)
    // At the moment, the parent is RecipeInv for testing purposes
    if (props.count == 1) {
        return (
            <aside className = "SIDEBAR">
                <p>Test</p>
            </aside>
        )
    }
};

export default Burger;