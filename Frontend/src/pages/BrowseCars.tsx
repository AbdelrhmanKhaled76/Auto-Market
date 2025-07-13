import { faGrip, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getAllCars } from "../services/carsService";
import type { CarType } from "../interfaces/Cars/Car";
import CarsCard from "../components/ui/CarsCard";

const BrowseCars = () => {
  const [isGrid, setIsGrid] = useState<boolean>(false);
  const [allCars, setAllCars] = useState<CarType[] | undefined>(undefined);
  const [filteredCollection, setFilteredCollection] = useState<
    CarType[] | undefined
  >(undefined);
  const [totalPages, setTotalPages] = useState(10);
  const [perPage, setPerPage] = useState(6);
  const [filtering, setFiltering] = useState<string>("default");
  const [searching, setSearching] = useState<string>();

  useEffect(() => {
    handlePageClick();
  }, []);

  // filtering search input
  useEffect(() => {
    if (allCars) {
      let filtered: CarType[] = [...allCars];
      filtered = filtered.filter((car) =>
        car.make.toLowerCase().includes(searching?.toLowerCase() as string)
      );
      setFilteredCollection(filtered);
    }
  }, [searching, allCars]);

  // filtering drop menu
  useEffect(() => {
    if (filtering && allCars) {
      const filtered: CarType[] = [...allCars];
      if (filtering === "ascending") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (filtering === "descending") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (filtering === "mileage") {
        filtered.sort((a, b) => a.mileage - b.mileage);
      }
      setFilteredCollection(filtered);
    }
  }, [filtering, allCars]);

  // pagination handling
  async function handlePageClick(event?: { selected: number }): Promise<void> {
    const newPage: number = event ? event.selected + 1 : 1;
    try {
      const data = await getAllCars(newPage, perPage);
      setAllCars(data.data);
      setTotalPages(data.totalPages);
      setPerPage(data.perPage);
      setFilteredCollection(data.data);

      // Apply current filter to the new data
      const filtered: CarType[] = [...data.data];
      if (filtering === "ascending") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (filtering === "descending") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (filtering === "mileage") {
        filtered.sort((a, b) => a.mileage - b.mileage);
      }
      // else "default": keep as is
      setFilteredCollection(filtered);
    } catch (error) {
      console.error("Failed to fetch cars for page:", newPage, error);
    }
  }
  return (
    <div>
      <section className="shadow py-10">
        <div className="container">
          <h2 className="font-bold capitalize text-2xl">browse cars</h2>
          <p className="text-black/70">
            {filteredCollection?.length || allCars?.length || 0} cars found
          </p>
          <div className="flex justify-between items-center  mt-5 w-fit gap-5">
            <input
              onChange={(e) => {
                setSearching(e.target.value);
              }}
              type="search"
              className="border border-black/20 rounded-md px-10 py-2"
              placeholder="Search cars..."
            />
            <select
              title="filter drop menu"
              name="filter"
              className="border border-black/20 rounded-md px-7 py-2"
              onChange={(e) => {
                setFiltering(e.target.value);
              }}
            >
              <option value="default">Newest First</option>
              <option value="ascending">Price: Low to High</option>
              <option value="descending">Price: High to Low</option>
              <option value="mileage">Lowest Mileage</option>
            </select>
            <div className="flex">
              <button
                title="no grid view"
                onClick={() => setIsGrid(false)}
                className={`${
                  !isGrid ? "bg-[var(--primary-color)] text-white " : ""
                } cursor-pointer p-2 border border-black/30 rounded-l-xl`}
              >
                <FontAwesomeIcon icon={faTableCells} />
              </button>
              <button
                title="grid view"
                onClick={() => setIsGrid(true)}
                className={`${
                  isGrid ? "bg-[var(--primary-color)] text-white " : ""
                } cursor-pointer p-2 border border-black/30 rounded-r-xl`}
              >
                <FontAwesomeIcon icon={faGrip} />
              </button>
            </div>
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={perPage}
            pageCount={totalPages}
            previousLabel="previous"
            renderOnZeroPageCount={null}
            className="flex justify-between items-center pt-5 w-fit"
            activeClassName="bg-[var(--primary-color)] text-white border"
            pageClassName="px-3 py-1 text-[var(--primary-color)] border"
            previousClassName="px-3 py-1 rounded-l-md text-[var(--primary-color)] border"
            nextClassName="px-3 py-1 rounded-r-md text-[var(--primary-color)] border"
            pageLinkClassName="cursor-pointer w-full h-full block"
            previousLinkClassName="cursor-pointer w-full h-full block"
            nextLinkClassName="cursor-pointer w-full h-full block"
            breakClassName="cursor-pointer"
          />
        </div>
      </section>
      <section>
        <div
          className={`container py-10 ${
            !isGrid ? "md:grid-cols-2 lg:grid-cols-3" : ""
          } grid  gap-10`}
        >
          {filteredCollection
            ? filteredCollection?.map((car) => (
                <CarsCard key={car._id} value={car} />
              ))
            : allCars
            ? allCars?.map((car) => <CarsCard key={car._id} value={car} />)
            : "no cars available"}
        </div>
      </section>
    </div>
  );
};

export default BrowseCars;
