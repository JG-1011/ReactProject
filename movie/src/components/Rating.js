import "./Rating.css";

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selected = false, Rating, onSelect, onHover }) {
  const className = `Rating-star ${selected ? "selected" : ""}`;

  const handleClick = onSelect ? () => onSelect(Rating) : undefined;

  const handleMouseOver = onHover ? () => onHover(Rating) : undefined;

  return (
    <span
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >
      ★
    </span>
  );
}

function Rating({ className, value = 0, onSelect, onHover, onMouseOut }) {
  return (
    <div className={className} onMouseOut={onMouseOut}>
      {RATINGS.map((Rating) => (
        <Star
          key={Rating}
          selected={value >= Rating}
          Rating={Rating}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </div>
  );
}
export default Rating;
