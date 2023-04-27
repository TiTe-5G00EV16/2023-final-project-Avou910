import React, { useContext, useState } from "react";
import { useMutation } from 'react-query';

import Card from '../../shared/components/card/Card';
import Button from '../../shared/components/button/Button';
import Modal from '../../shared/components/modal/Modal';
//import  sendemail  from '../../shared/components/sendemail/sendemail';






import { AuthContext } from '../../shared/context/auth-context';
import { deleteArticle } from "../api/articles";

import './ArticleItem.css';

const ArticleItem = props => {

  const auth = useContext(AuthContext);


  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  

  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);

  const showEmailHandler = () => setShowEmailModal(true);
  const cancelEmailHandler = () => setShowEmailModal(false);



  
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
    console.log("Do we get here?");
    deleteArticleMutation.mutate({
      id: props.id,
      token: auth.token
    })
  }


  return (
    <>
      <Modal 
        show={showConfirmationModal}
        header="Are you sure?" 
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelConfirmationHandler}>Cancel</Button>
            <Button delete onClick={deleteConfirmedHandler}>Delete</Button>
          </>
        }
      >
        <p>Are you sure? Once it's gone, it's gone!</p>
      </Modal>

      <Modal 
        show={showEmailModal}
        header="Send Email" 
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelEmailHandler}>Cancel</Button>
            <Button>Send</Button>
          </>
        }
      >
        <div className="modal-email">
          <label htmlFor="subject">Subject:</label>
          <input className="modal-email-subject" type="text" id="subject" defaultValue={props.title}/>  

          <label htmlFor="message">Message:</label>
          <textarea className="modal-email-message" id="message">
            Hey, is this still available?
            </textarea>

        </div>
      </Modal>

      <li className="article-item">
        <Card className="article-item__content">
          <div className="article-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="article-item__info">
            <h3>Article: {props.title}</h3>
            <h3>Price: {props.price}</h3>
            <h3>Description: {props.description}</h3>
            <h3>Email: {props.email}</h3>
          </div>

          <div className="article-item_actions">
            {auth.isLoggedIn && auth.email === props.email && (
              <Button danger onClick={showConfirmationHandler}>Delete</Button>
            )}

             <Button onClick={showEmailHandler}>BUY</Button>

          </div>
        </Card>
      </li>
    </>
  )
};

export default ArticleItem;

