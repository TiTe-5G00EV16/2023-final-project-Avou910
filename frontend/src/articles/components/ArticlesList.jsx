import React from "react";

import ArticleItem from './ArticleItem';

import './ArticlesList.css';

const ArticlesList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No articles found.</h2>
      </div>
    );
  }

  return <ul className="articles-list">
  {props.items.map(item => 
      <ArticleItem
        key={item.id} 
        id={item.id}
        title={item.title}
        price={item.price}
        description={item.description}
        image={item.image}
        email={item.email}
        userId={item.userId}
      />
    
  )}
</ul>
};

export default ArticlesList;

