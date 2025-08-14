import React from 'react';
import Chessboard from "react-chessboard";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Chess from "chess.js";

function TestMatch() {
    

    return(
    <>
        <Chessboard
            position="start"
            darkSquareStyle={{ backgroundColor: 'SaddleBrown' }}
            lightSquareStyle={{ backgroundColor: 'PeachPuff' }}
            boardStyle={{
                width: '100%',
                height: '100%',
                maxWidth: '600px',
                maxHeight: '600px',
            }}
        />
    </>
    );
}

export default TestMatch;