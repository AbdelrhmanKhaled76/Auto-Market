import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReviewType } from "../../interfaces/review/review";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function ReviewCard({ review }: { review: ReviewType }) {
  return (
    <div className="bg-white rounded-xl p-5 flex flex-col gap-4 shadow-md">
      <div className="flex justify-between items-center w-fit">
        {Array.from({ length: review.rating }).map((_, idx) => (
          <FontAwesomeIcon
            key={idx}
            icon={faStar}
            className="text-yellow-400 text-lg"
          />
        ))}
      </div>
      <p className="text-black/70">"{review.description}"</p>
      <div className="flex flex-col">
        <h3 className="capitalize font-semibold">
          {typeof review.madeBy !== "string" ? review.madeBy.username : null}
        </h3>
        <span>{new Date(review.createdAt).toDateString()}</span>
      </div>
    </div>
  );
}

export default ReviewCard;
