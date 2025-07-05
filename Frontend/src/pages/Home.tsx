import {
  faArrowRightLong,
  faArrowTrendUp,
  faPeopleGroup,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import CarsCard from "../components/carsCard";

function Home() {
  return (
    <div>
      {/* hero section */}
      <section className="text-white bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] py-20">
        <div className="container">
          <h1 className="text-center text-6xl font-bold py-4">
            Find Your Perfect Car
          </h1>
          <h2 className="text-center text-2xl py-2">
            Discover thousands of quality used cars from trusted sellers
          </h2>
          <div className="flex justify-between items-center py-10  w-full">
            <div className="flex justify-between items-center flex-col">
              <p className="text-orange-400 text-3xl font-bold">10,000+</p>
              <span className="capitalize">cars available</span>
            </div>
            <div className="flex justify-between items-center flex-col">
              <p className="text-orange-400 text-3xl font-bold">5,000+</p>
              <span className="capitalize">happy customers</span>
            </div>
            <div className="flex justify-between items-center flex-col">
              <p className="text-orange-400 text-3xl font-bold">99%</p>
              <span className="capitalize">satisfaction rate</span>
            </div>
          </div>
        </div>
      </section>
      {/* why us section  */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-center text-3xl font-bold">
            Why Choose AutoMarket?
          </h2>
          <p className="text-center py-3 text-lg text-black/60">
            We make buying and selling cars simple, safe, and transparent
          </p>
          <div className="flex justify-between items-center pt-10">
            <div className="flex justify-between flex-col items-center gap-4">
              <FontAwesomeIcon
                icon={faShield}
                className="text-[var(--primary-color)] p-5 rounded-full bg-[var(--primary-color)]/10 text-3xl"
              />
              <h3 className="font-semibold text-xl">Verified Listings</h3>
              <p className="text-black/60 text-center">
                All our listings are verified for accuracy and authenticity
              </p>
            </div>
            <div className="flex justify-between flex-col items-center gap-4">
              <FontAwesomeIcon
                icon={faArrowTrendUp}
                className="text-green-600 p-5 rounded-full bg-green-600/10 text-3xl"
              />
              <h3 className="font-semibold text-xl">Best Prices</h3>
              <p className="text-black/60 text-center">
                Competitive pricing with transparent market values{" "}
              </p>
            </div>
            <div className="flex justify-between flex-col items-center gap-4">
              <FontAwesomeIcon
                icon={faPeopleGroup}
                className="text-orange-500 p-5 rounded-full bg-orange-600/10 text-3xl"
              />
              <h3 className="font-semibold text-xl">Trusted Community</h3>
              <p className="text-black/60 text-center">
                Connect with verified buyers and sellers in your area{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* featured cars  */}
      <section className="bg-[var(--secondary-bgColor)] py-20 ">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-3">
              <h2 className="capitalize text-3xl font-bold">Featured Cars</h2>
              <p className="text-black/60">Hand-picked premium vehicles</p>
            </div>
            <Link
              to="/browse-cars"
              className="capitalize text-[var(--primary-color)] font-semibold hover:underline hover:text-[var(--secondary-color)]"
            >
              view all cars
              <FontAwesomeIcon
                icon={faArrowRightLong}
                className="text-xs ps-3"
              />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 py-10">
            <CarsCard />
            <CarsCard />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
