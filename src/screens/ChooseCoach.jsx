// Import the CoachCard component (displays a single tutor card)
import CoachCard from "../components/CoachCard.jsx";

import { useNavigate } from "react-router-dom";

// Import useContext from React.
import React, { useContext } from "react";

// Import the AppContext component.
import { useAppContext } from "../context/AppContext.jsx";

// Import avatar images for each tutor
import salonAvatar from "../assets/avatars/salon.png";
import nimzoAvatar from "../assets/avatars/nimzo.png";
import lunaAvatar from "../assets/avatars/luna.png";

// Define the list of AI tutors with their metadata
const tutors = [
  {
    id: "salon",
    name: "Grandmaster Salon",
    avatar: salonAvatar,
    description: "Wise and calm. Teaches with depth and patience.",
  },
  {
    id: "nimzo",
    name: "Nimzo",
    avatar: nimzoAvatar,
    description: "Energetic, tactical, and straight to the point.",
  },
  {
    id: "luna",
    name: "Grandmaster Luna",
    avatar: lunaAvatar,
    description: "Witty and stylish. Loves creativity on the board.",
  },
];

/**
 * ChooseCoach Screen
 * Displays a screen allowing the user to choose one of three AI tutor personas.
 * Clicking a card triggers the tutor selection logic.
 */
function ChooseCoach() {
  // Access shared context values (userName and updateUserName) from the AppProvider
  const { user, tutor, updateTutor } = useAppContext();

  // For routing across pages.
  const navigate = useNavigate();

  // Handler for when a tutor is selected
  const handleTutorSelect = (t) => {

      // Use updateTutor to set the selected tutor.
      updateTutor(t);

      // Use navigate() to send user to QuizIntro.jsx
      navigate("/quiz-intro");
  };

  return (
    // Full-screen layout with padding and vertical spacing
    <div className="min-h-screen bg-blue-900 text-white flex flex-col items-center py-12 px-4 gap-8">
      
      {/* Screen title */}
      <h1 className="text-2xl sm:text-4xl md:text-4xl font-semibold text-center">
        Choose Your AI Tutor
      </h1>

      {/* Grid layout of tutor cards (responsive by screen size) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tutors.map((tutor) => (
          <CoachCard
            key={tutor.id}
            name={tutor.name}
            description={tutor.description}
            avatar={tutor.avatar}
            onSelect={() => handleTutorSelect(tutor)}
          />
        ))}
      </div>
    </div>
  );
}

export default ChooseCoach;
