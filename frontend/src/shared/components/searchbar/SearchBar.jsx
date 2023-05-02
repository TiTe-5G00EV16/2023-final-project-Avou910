import React, { useState } from "react";
import { searchArticles, getArticles } from "../../../articles/api/articles";
import './SearchBar.css';


const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onSearch = async (event) => {
    event.preventDefault();
    const articles = props.articles;
    const filteredArticles = articles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    props.onFilter(filteredArticles);
  };

  /*const onClear = () => {
    setSearchTerm("");
    props.onFilter(props.articles);
    if (filteredArticles.length === 0) {
      props.onNoResults();
    }
  };*/

  const onClear = () => {
    setSearchTerm("");
    const articles = props.articles;
    const filteredArticles = articles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(filteredArticles);
    if (filteredArticles.length === 0) {
      props.onNoResults();
    } else {
      props.onFilter(filteredArticles);
    }
  };
  

  return (
    <form className="search-bar-form" onSubmit={onSearch}>
      <input
        className="search-bar-input"
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search by keyword"
      />
      <button className="search-bar-button" type="submit">
        Search
      </button>
      <button className="search-bar-clear-button" type="button" onClick={onClear}>
          Clear
        </button>
    </form>
  );
};

export default SearchBar;
