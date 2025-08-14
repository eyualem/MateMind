const lessons = [
  {
    "id": "tactics-001",
    "category": "tactics",
    "title": "Knight Fork",
    "fen": "rnbqkbnr/pppppppp/8/3N4/8/8/PPPPPPPP/R1BQKBNR b KQkq - 0 1",
    "correctMoves": [
      "e7e6",
      "d5c7"
    ],
    "sideToMove": "white",
    "tutorSays": "Look for a double attack with your knight."
  },
  {
    "id": "tactics-002",
    "category": "tactics",
    "title": "Pin and Win",
    "fen": "r1bqkbnr/pppp1ppp/2n5/4p3/3P2P1/5N2/PPP1PP1P/RNBQKB1R b KQkq g3 0 4",
    "correctMoves": [
      "e5d4",
      "f3d4",
      "c6d4"
    ],
    "sideToMove": "black",
    "tutorSays": "Try to use the pin on the knight to win material."
  },
  {
    "id": "tactics-003",
    "category": "tactics",
    "title": "Back Rank Mate",
    "fen": "2r3k1/5ppp/8/8/8/8/5PPP/5RK1 w - - 0 1",
    "correctMoves": [
      "f1d1",
      "c8c1"
    ],
    "sideToMove": "white",
    "tutorSays": "Watch for your opponent's back rank weakness."
  },
  {
    "id": "openings-001",
    "category": "openings",
    "title": "King's Pawn Opening",
    "fen": "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
    "correctMoves": [
      "e7e5"
    ],
    "sideToMove": "black",
    "tutorSays": "Control the center by mirroring your opponent."
  },
  {
    "id": "openings-002",
    "category": "openings",
    "title": "Sicilian Defense",
    "fen": "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2",
    "correctMoves": [
      "g1f3"
    ],
    "sideToMove": "white",
    "tutorSays": "Develop your knight toward the center."
  },
  {
    "id": "openings-003",
    "category": "openings",
    "title": "Queen's Gambit",
    "fen": "rnbqkbnr/ppp1pppp/8/3p4/2P5/8/PP1PPPPP/RNBQKBNR b KQkq c3 0 2",
    "correctMoves": [
      "e7e6"
    ],
    "sideToMove": "black",
    "tutorSays": "Support your center with a pawn."
  },
  {
    "id": "endgame-001",
    "category": "endgames",
    "title": "King and Pawn vs King",
    "fen": "8/8/8/8/4k3/8/4P3/4K3 w - - 0 1",
    "correctMoves": [
      "e2e3"
    ],
    "sideToMove": "white",
    "tutorSays": "Start pushing the pawn with king support."
  },
  {
    "id": "endgame-002",
    "category": "endgames",
    "title": "Lucena Position",
    "fen": "8/8/8/1P6/8/1K6/5PPP/8 b - - 0 1",
    "correctMoves": [
      "b5b6"
    ],
    "sideToMove": "white",
    "tutorSays": "Build a bridge to help promote the pawn."
  },
  {
    "id": "endgame-003",
    "category": "endgames",
    "title": "Basic Checkmate",
    "fen": "6k1/5ppp/8/8/8/8/5PPP/6K1 w - - 0 1",
    "correctMoves": [
      "g1f1",
      "f2f4",
      "f4f5"
    ],
    "sideToMove": "white",
    "tutorSays": "Get your pieces active and bring the king closer."
  }
];

export default lessons;