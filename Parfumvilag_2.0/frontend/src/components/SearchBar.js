import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/search-logs", {
        search_term: searchTerm,
      });
      console.log(response.data);
      onSearch(searchTerm);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for perfumes..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
