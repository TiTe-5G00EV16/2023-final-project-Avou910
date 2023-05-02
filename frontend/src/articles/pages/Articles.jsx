import React, { useContext, useState } from "react";
import { useQuery } from "react-query";

import ArticlesList from "../components/ArticlesList";
import LoadingSpinner from "../../shared/components/loadingspinner/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";

import { getArticles } from "../api/articles";
import SearchBar from "../../shared/components/searchbar/SearchBar";

const Articles = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, data } = useQuery("articlesData", getArticles);

  const [filteredArticles, setFilteredArticles] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const handleFilter = (articles) => {
    setFilteredArticles(articles);
    setNoResults(articles.length === 0);
  };

  if (isLoading) return (
    <div className="center">
      <LoadingSpinner />
    </div>
  );

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <SearchBar articles={data} onFilter={handleFilter} />
      {noResults && <p>No articles found</p>}
      {!noResults && <ArticlesList items={filteredArticles.length > 0 ? filteredArticles : data} />}
    </>
  );
};

export default Articles;
