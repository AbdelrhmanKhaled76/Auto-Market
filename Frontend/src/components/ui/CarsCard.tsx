import {
  faArrowRightLong,
  faCalendar,
  faGasPump,
  faGear,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import type { CarType } from "../../interfaces/Cars/Car";


function CarsCard({ value }: { value: CarType }) {
  const labelColorMap = {
    red: "text-red-700 bg-red-500/10",
    blue: "text-blue-700 bg-blue-500/10",
    green: "text-green-700 bg-green-500/10",
    yellow: "text-yellow-700 bg-yellow-500/10",
  };
  let selectedColor: string = "green";
  switch (value.condition) {
    case "excellent":
      selectedColor = labelColorMap["green"];
      break;
    case "good":
      selectedColor = labelColorMap["blue"];
      break;
    case "fair":
      selectedColor = labelColorMap["yellow"];
      break;
    case "bad":
      selectedColor = labelColorMap["red"];
      break;
  }
  return (
    <div className="rounded-2xl overflow-hidden shadow-md group hover:shadow-xl transition-shadow duration-200 grid grid-rows-2 max-h-[400px]">
      <figure className="overflow-hidden relative w-full ">
        {value.featured && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-orange-500 capitalize rounded-2xl text-xs font-semibold z-10 text-white">
            featured
          </div>
        )}
        <img
          src={value.images[0].url}
          alt={value.model}
          className="group-hover:scale-110 transition-transform duration-300 w-full h-full object-cover"
        />
      </figure>
      <article className="px-4 bg-white py-5 flex justify-between flex-col gap-5 h-full">
        <div className="flex justify-between items-center w-full">
          <h3 className="font-semibold text-lg group-hover:text-[var(--primary-color)]">
            {value.year + " " + value.make}
          </h3>
          <p className="font-bold text-xl text-[var(--primary-color)]">
            ${value.price}
          </p>
        </div>
        <div className="grid grid-cols-2 items-center w-full gap-4 text-black/60 text-sm">
          <span>
            <FontAwesomeIcon icon={faCalendar} className="pe-3" />
            {value.year}
          </span>
          <span>
            <FontAwesomeIcon icon={faStopwatch} className="pe-3" />
            {value.mileage} mi
          </span>
          <span>
            <FontAwesomeIcon icon={faGear} className="pe-3" />
            {value.transmission}
          </span>
          <span>
            <FontAwesomeIcon icon={faGasPump} className="pe-3" />
            {value.fuelType}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p
            className={`${selectedColor} font-medium  px-3 py-1 rounded-2xl text-sm`}
          >
            {value.condition}
          </p>
          <Link
            to={`/browse-cars/${value._id}`}
            className="capitalize text-sm text-[var(--primary-color)] font-semibold hover:underline hover:text-[var(--secondary-color)]"
          >
            view details
            <FontAwesomeIcon icon={faArrowRightLong} className="text-xs ps-3" />
          </Link>
        </div>
      </article>
    </div>
  );
}

export default CarsCard;
