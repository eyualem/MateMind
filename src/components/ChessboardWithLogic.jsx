// src/components/Chessboard/ChessboardWithLogic.jsx

import React, { useState, useRef } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

/**
 * A complete, self-contained Chessboard component with full game logic.
 *
 * This component manages its own state, handles piece drops, and contains
 * all the logic for turn management, game-over conditions, and game resets.
 * It does not require a parent component to manage the game flow.
 *
 * @param {object} props The component props.
 * @param {boolean} [props.arePiecesDraggable=true] - Determines if pieces can be dragged.
 * @param {string} [props.boardOrientation='white'] - Sets the board's orientation ('white' or 'black').
 */
const ChessboardWithLogic = ({
  arePiecesDraggable = true,
  boardOrientation = "white"
}) => {
  // Use a useRef to create a persistent reference to the Chess instance.
  const game = useRef(new Chess());

  // State to hold the current board position (FEN string).
  const [position, setPosition] = useState("start");

  // State to hold messages for the user, such as whose turn it is or game-over status.
  const [message, setMessage] = useState("Your turn, White!");

  /**
   * This is the main event handler for when a piece is dropped on the board.
   * It handles all the game logic internally.
   *
   * @param {string} sourceSquare - The square the piece was moved from (e.g., 'e2').
   * @param {string} targetSquare - The square the piece was dropped onto (e.g., 'e4').
   * @returns {boolean} - Returns true if the move was legal, and false otherwise.
   */
  function onPieceDrop(sourceSquare, targetSquare) {
    const move = game.current.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) {
      return false; // illegal move
    }

    // Update the state with the new position.
    setPosition(game.current.fen());
    
    // Check for game-over conditions immediately after a legal move.
    checkForGameOver();
    
    // Update the turn message for the user.
    updateTurnMessage();

    return true; // legal move
  }

  /**
   * Helper function to check if the game is over due to checkmate, stalemate,
   * or other draw conditions.
   */
  function checkForGameOver() {
    if (game.current.isGameOver()) {
      if (game.current.isCheckmate()) {
        const winner = game.current.turn() === 'w' ? 'Black' : 'White';
        setMessage(`Checkmate! ${winner} wins!`);
      } else if (game.current.isDraw()) {
        setMessage("The game is a draw!");
      }
    }
  }

  /**
   * Helper function to update the message indicating whose turn it is.
   */
  function updateTurnMessage() {
    if (!game.current.isGameOver()) {
      const turn = game.current.turn() === 'w' ? 'White' : 'Black';
      setMessage(`It's ${turn}'s turn.`);
    }
  }

  /**
   * Method to reset the game to the initial state.
   */
  function handleResetGame() {
    game.current.reset();
    setPosition(game.current.fen());
    setMessage("Game has been reset! Your turn, White!");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="p-4 bg-white rounded-2xl shadow-xl">
        {/* Display the current game message */}
        <div className="text-center mb-4 text-xl font-medium text-gray-800">
          {message}
        </div>

        {/* The Chessboard component with integrated logic. */}
        <Chessboard
          id="MainChessboard"
          position={position}
          onPieceDrop={onPieceDrop}
          arePiecesDraggable={arePiecesDraggable}
          boardOrientation={boardOrientation}
          lightSquareStyle={{ backgroundColor: "#fef3c7" }}
          darkSquareStyle={{ backgroundColor: "#d97706" }}
        />

        {/* A simple button to reset the game */}
        <button
          onClick={handleResetGame}
          className="mt-6 px-6 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-md"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default ChessboardWithLogic;
