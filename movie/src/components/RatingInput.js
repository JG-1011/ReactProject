import { useState } from "react";
import Rating from "./Rating";
import "./RatingInput.css";

function RatingInput({ name, value, onChange }) {
  //name,value : input의 이름과 값에 해당, onChange : input을 선택했을 때 실행할 함수

  const [rating, setRating] = useState(value);
  const handleSelect = (nextValue) => onChange(name, nextValue);
  const handleMouseOut = () => setRating(value);
  return (
    <Rating
      className="RatingInput"
      value={rating}
      onSelect={handleSelect}
      onHover={setRating}
      onMouseOut={handleMouseOut}
    />
  );
}
export default RatingInput;
