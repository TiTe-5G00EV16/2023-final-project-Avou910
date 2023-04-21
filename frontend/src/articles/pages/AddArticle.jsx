import { useState, useRef, useContext } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import './AddArticle.css';

import Input from '../../shared/components/input/Input';
import Button from '../../shared/components/button/Button';

import { AuthContext } from '../../shared/context/auth-context';

import { createArticle } from '../api/articles';


const AddArticle = () => {
  const titleRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();

  const auth = useContext(AuthContext);
  const history = useHistory();

  const createArticleMutation = useMutation((article) => createArticle(article));

  const articleSubmitHandler = (event) => {
    event.preventDefault();
    createArticleMutation.mutate({
      title: titleRef.current.value,
      price: priceRef.current.value,
      image: imageRef.current.value,
      email: auth.email,
      token: auth.token,
      userId: auth.userId


    });
    history.push('/');
  }

  return (
    <form className='article-form' onSubmit={articleSubmitHandler}>
      <Input id="title" ref={titleRef} type="text" label="Title" />
      <Input id="price" ref={priceRef} type="text" label="Price" />
      <Input id="image" ref={imageRef} type="text" label="Image Link" />
      

      <Button id="add-article">
        Add Article
      </Button>
    </form>
  )
};

export default AddArticle;
