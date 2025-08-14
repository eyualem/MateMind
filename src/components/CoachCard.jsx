// src/components/CoachCard.jsx

/**
 * CoachCard Component
 * Renders a selectable card representing an AI chess tutor.
 * Displays an avatar, name, and description with interactive hover effects.
 * 
 * Props:
 * - name: string – the tutor's name
 * - description: string – a short character summary
 * - avatar: string – image URL for the tutor's avatar
 * - onSelect: function – callback triggered when the card is clicked
 */

function CoachCard({ name, description, avatar, onSelect }) {
    return (
      // Interactive card container with hover scale and shadow transition
      <div
        onClick={onSelect}
        className="bg-white text-blue-900 rounded-xl shadow-md p-4 cursor-pointer
                   hover:shadow-lg hover:scale-105 transform transition-all duration-200 ease-in-out
                   flex flex-col items-center gap-3 w-full max-w-xs"
      >
        {/* Tutor avatar (responsive sizing, bordered circle) */}
        <img
          src={avatar}
          alt={`${name} Avatar`}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-contain border-2 border-blue-900"
        />
  
        {/* Tutor name heading */}
        <h2 className="text-lg sm:text-xl font-bold text-center">{name}</h2>
  
        {/* Tutor personality description */}
        <p className="text-sm sm:text-base text-center text-gray-600">{description}</p>
      </div>
    );
  }
  
  export default CoachCard;
  