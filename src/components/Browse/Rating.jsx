import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

function Rating({ rating }) {
  if (!rating) {
    rating = 0;
  }
  const starCount = Math.floor(rating);
  const halfStarCount = rating.toFixed(1).split(".")[1];
  const stars = [];
  // console.log(stars.length);

  for (let i = 0; i < starCount; i++) {
    stars.push(<FaStar key={i} />);
  }
  if (halfStarCount >= 5) {
    stars.push(<FaStarHalfAlt key={0.5} />);
  }
  if (stars.length < 5) {
    const l = stars.length;
    for (let j = 1; j <= 5 - l; j++) {
      stars.push(<FaRegStar key={j + 5} />);
    }
  }

  return <>{stars}</>;
}

export default Rating;
