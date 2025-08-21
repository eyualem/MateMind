import React from 'react';
import ChessboardWithLogic from "../components/ChessboardWithLogic";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Chess } from "chess.js";
import Affirmation from '../Affirmation.jsx';

function TestMatch() {
    const navigate = useNavigate();

    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Affirmation />
            <ChessboardWithLogic
                arePiecesDraggable={true}
                boardOrientation="white"
            />
        </div>
    );
}

export default TestMatch;