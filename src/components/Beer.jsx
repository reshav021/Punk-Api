import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

function Beer() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const isLoading = useRef(false);

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        isLoading.current = true;
        const response = await axios.get(
          `https://api.punkapi.com/v2/beers?page=${page}&per_page=9`
        );
        setBeers((prevBeers) => [...prevBeers, ...response.data]);
        isLoading.current = false;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBeers();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 100 &&
      !isLoading.current
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const debouncedSearch = useRef(
    debounce((searchTerm) => {
      setSearchTerm(searchTerm);
    }, 1000)
  ).current;

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    debouncedSearch(newSearchTerm);
  };

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Beer">
      <h1>Punk API Beers</h1>
      <input id="searchBeer" type="text" placeholder="Search beers" onChange={handleSearchChange} />

      <div className="beer-list">
        {filteredBeers.map((beer, index) => (
          <div className="beer-card" key={index}>
            <img id="beerImg" src={beer.image_url} alt={beer.name} />
            <h2>{beer.name}</h2>
            <p>{beer.tagline}</p>
            <p>First Brewed: {beer.first_brewed}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Beer;