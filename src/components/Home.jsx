import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleGame1 = () => {
        navigate('/mini-game1');
    }

    const handleGame2 = () => {
        navigate('/mini-game2');
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-primary font-semibold mb-8">Explore your favourite games</h1>
            <div className="flex flex-row">
                <button 
                    onClick={handleGame1}
                    className="text-lg text-white bg-blue-500 hover:text-xl py-2 px-4 rounded-lg m-3"
                    >Minigame1
                </button>
                <button 
                    onClick={handleGame2}
                    className="text-lg text-white bg-green-500 hover:text-xl py-2 px-4 rounded-lg m-3"
                    >Minigame2
                </button>
            </div>
        </div>
    );
}

export default Home;