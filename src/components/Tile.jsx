
const Tile = ({ value, onClick, white, boardSize }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-center bg-green-600 ${boardSize === 8 ? "h-20 w-20" : "h-16 w-16"} border-solid border-2 border-green-800`}
  >
    {value !== 0 && (
      <div
        className={`${value === white ? "bg-white" : "bg-black"
          } ${boardSize === 8 ? "h-16 w-16" : "h-12 w-12"} rounded-full `}
      />
    )}
  </div>
);

export { Tile }