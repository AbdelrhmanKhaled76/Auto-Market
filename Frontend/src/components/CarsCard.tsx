import {
  faArrowRightLong,
  faCalendar,
  faGasPump,
  faGear,
  faLocationDot,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { CarsCardType } from "../interfaces/carsCard";

function CarsCard() {
  const [carProperties, setCarProperties] = useState<CarsCardType | null>(null);
  const labelColorMap = {
    red: "text-red-700 bg-red-500/10",
    blue: "text-blue-700 bg-blue-500/10",
    green: "text-green-700 bg-green-500/10",
  };
  const selectedColor: string = labelColorMap["blue"];
  return (
    <div className="rounded-2xl overflow-hidden shadow-md group hover:shadow-xl transition-shadow duration-200">
      <figure className="overflow-hidden relative">
        <div className="absolute top-3 left-3 px-2 py-1 bg-orange-500 capitalize rounded-2xl text-xs font-semibold z-10 text-white">featured</div>
        <img
          src="/car.jpeg"
          alt="car picture"
          className="group-hover:scale-110 transition-transform duration-300"
        />
      </figure>
      <article className="px-4 bg-white py-5 flex justify-between flex-col gap-5">
        <div className="flex justify-between items-center w-full">
          <h3 className="font-semibold text-lg group-hover:text-[var(--primary-color)]">
            2022 Toyota Camry
          </h3>
          <p className="font-bold text-xl text-[var(--primary-color)]">
            $28,500
          </p>
        </div>
        <span className="text-black/60 text-sm">
          <FontAwesomeIcon icon={faLocationDot} className="pe-3" />
          Los Angeles, CA
        </span>
        <div className="grid grid-cols-2 items-center w-full gap-4 text-black/60 text-sm">
          <span>
            <FontAwesomeIcon icon={faCalendar} className="pe-3" />
            2022
          </span>
          <span>
            <FontAwesomeIcon icon={faStopwatch} className="pe-3" />
            45,000 mi
          </span>
          <span>
            <FontAwesomeIcon icon={faGear} className="pe-3" />
            Manual
          </span>
          <span>
            <FontAwesomeIcon icon={faGasPump} className="pe-3" />
            Gasoline
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p
            className={`${selectedColor} font-medium  px-3 py-1 rounded-2xl text-sm`}
          >
            Excellent
          </p>
          <Link
            to="/browse-cars/:id"
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
