import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

export default function ChessGameWithLogic(){
    const [game] = (new Chess());
    const [position, setPosition] = useState("start");

    function onPieceDrop(sourceSquare, targetSquare){
        const move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // always promote to a queen for simplicity
        }
        );

        if (move === null) return false;

        setPosition(game.fen());
        return true; // legal move
    }

    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-4 bg-white rounded-2xl shadow-xl">
        <Chessboard
          id="MainChessboard"
          position={position}
          onPieceDrop={onPieceDrop}
          // Customizing square colors
          lightSquareStyle={{ backgroundColor: "#fef3c7" }} // amber-100
          darkSquareStyle={{ backgroundColor: "#d97706" }} // amber-700
        />
      </div>
    </div>
  );
}