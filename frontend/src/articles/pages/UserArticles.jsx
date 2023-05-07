import React, { useContext } from "react";
import { useQuery } from 'react-query'

import ArticlesList from '../components/ArticlesList';
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner'
import { AuthContext } from "../../shared/context/auth-context";

import { getArticles } from "../api/articles";

const UserArticles = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, data } = useQuery(
    "articlesData", 
    getArticles
  );

  if (isLoading) return (
    <div className="center">
      <LoadingSpinner />;
    </div>
  );

  if (error) return "An error has occurred: " + error.message;

  const userArticles = data.filter(article => article.email === auth.email);

  return (
    <ArticlesList items={userArticles} />
  )
};

export default UserArticles;
