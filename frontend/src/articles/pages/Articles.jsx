import React, {useContext,useState} from "react";
import { useQuery } from 'react-query'

import ArticlesList from '../components/ArticlesList';
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner'
import { AuthContext } from "../../shared/context/auth-context";

import { getArticles } from "../api/articles";
import SearchBar from "../../shared/components/searchbar/SearchBar";

const Articles = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, data } = useQuery("articlesData", getArticles);

  const [filteredArticles, setFilteredArticles] = useState([]);

  const handleFilter = (articles) => {
    setFilteredArticles(articles);
  };

  if (isLoading) return (
    <div className="center">
      <LoadingSpinner />;
    </div>
  );

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <SearchBar articles={data} onFilter={handleFilter} />
      <ArticlesList items={filteredArticles.length > 0 ? filteredArticles : data} />
    </>
  );
};

export default Articles;
