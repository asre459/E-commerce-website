import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  return [1, 2, 3, 4, 5].map((star) => {
    const isActive = star <= rating;

    return (
      <Button
        key={star}
        variant="outline"
        size="icon"
        onClick={handleRatingChange ? () => handleRatingChange(star) : null}
        style={{
          padding: "8px",
          borderRadius: "50%",
          transition: "background-color 0.2s, color 0.2s",
          color: isActive ? "#facc15" : "#000",
        }}
        onMouseEnter={(e) => {
          if (isActive) {
            e.currentTarget.style.backgroundColor = "#000";
            e.currentTarget.style.color = "#facc15";
          } else {
            e.currentTarget.style.backgroundColor = "#3b82f6";
            e.currentTarget.style.color = "#fff";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = isActive ? "#facc15" : "#000";
        }}
      >
        <StarIcon
          style={{
            width: "24px",
            height: "24px",
            fill: isActive ? "#facc15" : "#000",
          }}
        />
      </Button>
    );
  });
}

export default StarRatingComponent;
