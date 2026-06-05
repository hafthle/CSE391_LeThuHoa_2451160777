import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import UserProfile from "./UserProfile";
import ProductInfo from "./ProductInfo";

function App() {
    return (
        <div>
            <ProductInfo />
            <UserProfile />
        </div>
    );
}

export default App;