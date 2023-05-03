import React, { useContext, useState } from "react";
import { useMutation } from 'react-query';

import Card from '../../shared/components/card/Card';
import Button from '../../shared/components/button/Button';
import Modal from '../../shared/components/modal/Modal';
import Email from '../../shared/components/email/Email';

import { AuthContext } from '../../shared/context/auth-context';
import { deleteArticle } from "../api/articles";

import './ArticleItem.css';

const ArticleItem = props => {

  const auth = useContext(AuthContext);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  
  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);

  const deleteArticleMutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const deleteConfirmedHandler = () => {
    setShowConfirmationModal(false);
    deleteArticleMutation.mutate({
      id: props.id,
      token: auth.token
    })
  }

  return (
    <>
      <Modal 
        show={showConfirmationModal}
        header="Delete article" 
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelConfirmationHandler}>Cancel</Button>
            <Button delete onClick={deleteConfirmedHandler}>Delete</Button>
          </>
        }
      >
     <p>Are you sure? </p>
      </Modal>
      <li className="article-item">
        <Card className="article-item__content">
          <div className="article-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="article-item__info">
            <h1>{props.title}</h1>
            <h2>Price: {props.price}</h2>
            <p>Description: {props.description}</p>
            <h3>Email: {props.email}</h3>
          </div>

          <Email 
            emailTo={props.email} 
            title={props.title}
            emailFrom={auth.email}
          />

          <div className="article-item_actions">
            {auth.isLoggedIn && auth.email === props.email && (
              <Button danger onClick={showConfirmationHandler}>Delete</Button>
            )}
         
          </div>
        </Card>
      </li>
    </>
  )
};

export default ArticleItem;

