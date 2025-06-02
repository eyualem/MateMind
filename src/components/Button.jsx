
function Button({children, onClick, className=''}){
    return (
        <button
            onClick={onClick}
            className={`bg-white text-blue-900 font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-gray-100 transition ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;