import React from 'react';
import ChessboardWithLogic from "../components/ChessboardWithLogic";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Chess from "chess.js";

function TestMatch() {


    return(
    <>
        <ChessboardWithLogic
            arePiecesDraggable={true}
            boardOrientation="white"
        />
    </>
    );
}

export default TestMatch;