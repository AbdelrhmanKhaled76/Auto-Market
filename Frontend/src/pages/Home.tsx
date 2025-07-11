import {
  faArrowRightLong,
  faArrowTrendUp,
  faPeopleGroup,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CarsCard from "../components/ui/CarsCard";
import { getFeaturedCars, getRecentCars } from "../services/carsService";
import type { CarType } from "../interfaces/Cars/Car";
import type { ReviewType } from "../interfaces/review/review";
import { getAllReviews } from "../services/reviewsService";
import ReviewCard from "../components/ui/ReviewCard";
function Home() {
  const [featuredCars, setFeaturedCars] = useState<CarType[] | null>(null);
  const [RecentCars, setRecentCars] = useState<CarType[] | null>(null);
  const [allReviews, setAllReviews] = useState<ReviewType[] | null>(null);

  useEffect(() => {
    // fetching all data
    Promise.all([getFeaturedCars(), getRecentCars(), getAllReviews()])
      .then(([featuredCars, recentCars, reviews]) => {
        setFeaturedCars(featuredCars.data);
        setRecentCars(recentCars.data);
        setAllReviews(reviews.data);
      })
      .catch((error) => {
        console.error("One of the requests failed:", error);
      });
  }, []);

  return (
    <div>
      {/* Hero section */}
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
      {/* Why us section  */}
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
      {/* Featured cars  */}
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
            {featuredCars?.map((car) => (
              <CarsCard key={car._id} value={car} />
            )) || "no available cars at the moment"}
          </div>
        </div>
      </section>
      {/* Recent Cars  */}
      <section className="py-20">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-3">
              <h2 className="capitalize text-3xl font-bold">Recent Cars</h2>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
            {RecentCars?.map((car) => <CarsCard key={car._id} value={car} />) ||
              "no available cars at the moment"}
          </div>
        </div>
      </section>
      {/* our reviews  */}
      <section className="py-5 bg-[var(--secondary-bgColor)] ">
        <div className="container">
          <h2 className="text-3xl font-bold text-center capitalize py-10">
            what our customers say
          </h2>
          <p className="capitalize text-lg text-black/70 text-center">
            reak reviews from real customers
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
            {allReviews?.map((review) => (
              <ReviewCard key={review._id} review={review} />
            )) || "no available reviews"}
          </div>
        </div>
      </section>
      {/* Home footer */}
      <section className="bg-[var(--primary-color)] py-20 ">
        <div className="container">
          <h2 className="text-3xl font-bold text-white capitalize text-center">
            ready to find your next car?
          </h2>
          <p className="text-white py-5 text-xl  text-center">
            Join thousands of satisfied customers today
          </p>
          <div className="flex justify-center items-center">
            <Link
              to={"browse-cars"}
              className="px-6 py-3 me-2 capitalize bg-white rounded-xl text-[var(--primary-color)] font-semibold hover:bg-white/90"
            >
              browse cars
            </Link>
            <Link
              to={"sell-car"}
              className="px-6 py-3 ms-2 capitalize bg-orange-500 rounded-xl text-white font-semibold hover:bg-orange-500/90"
            >
              sell your car
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
