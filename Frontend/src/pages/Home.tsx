function Home() {
  return (
    <div className="text-white">
      <section className="bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] py-20">
        <h1 className="text-center text-6xl font-bold py-4">
          Find Your Perfect Car
        </h1>
        <h2 className="text-center text-2xl py-2">
          Discover thousands of quality used cars from trusted sellers
        </h2>
        <div className="flex justify-between items-center py-10 px-20 w-full">
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
      </section>
    </div>
  );
}

export default Home;
