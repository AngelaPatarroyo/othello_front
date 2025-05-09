const Tile = ({ value, onClick, white, boardSize }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-center bg-green-600 
      ${boardSize === 8 ? "h-16 w-16" : "h-14 w-14"} 
      border-2 border-green-800 transition-all`}
  >
    {value !== 0 && (
      <div
        className={`${value === white ? "bg-white" : "bg-black"} 
          ${boardSize === 8 ? "h-12 w-12" : "h-11 w-11"} 
          rounded-full`}
      />
    )}
  </div>
);

export default Tile;
