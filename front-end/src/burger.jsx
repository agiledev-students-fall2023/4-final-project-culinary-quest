import React, { useState } from "react";
import "./burger.css";

const Burger = props => {
    if (props.count == 1) {
        return (
            <aside className = "SIDEBAR">
                <p>Test</p>
            </aside>
        )
    }
};

export default Burger;