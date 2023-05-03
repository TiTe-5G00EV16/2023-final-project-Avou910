import React, { useState, useContext } from "react";
import { useMutation } from 'react-query';
import Modal from '../modal/Modal';
import Button from '../button/Button';
import { AuthContext } from '../../context/auth-context';
import { sendEmail } from "../../api/email";


const Email = props => {

  const auth = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const [emailTo, setEmailTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("Hey, is this still available?");

  const sendEmailMutation = useMutation({
    mutationFn: sendEmail,
    onSuccess: (data) => {
      console.log(data);
      setShowModal(false);
    },
    onError: (error) => {
      console.log(error)
    }
  });

  const showModalHandler = () => setShowModal(true);
  const hideModalHandler = () => setShowModal(false);

  const submitHandler = (event) => {
    event.preventDefault();
    sendEmailMutation.mutate({
      emailTo: props.emailTo,
      subject: `from Marketplace "${props.title}"`,
      message: `${message} \n\n\nTHIS IS JUST A NOTICE! \nPlease reply to directly to: ${props.emailFrom}`
    });
  }

  return (
    <>

    <div className="article-item-actions">{auth.isLoggedIn &&
      <Button onClick={showModalHandler}>BUY</Button>
    }
      </div>

      <Modal 
        show={showModal}
        header="Send Email" 
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={hideModalHandler}>Cancel</Button>
            <Button onClick={submitHandler}>Send</Button>
          </>
        }
      >
        <div className="modal-email">
        <label htmlFor="emailTo">Send email to:</label>
          <input 
            className="modal-email-emailTo" 
            type="text" 
            id="emailTo" 
            onChange={(event) => setEmailTo(event.target.value)} 
            value={props.emailTo}
          />  
          <label htmlFor="subject">Subject:</label>
          <input 
            className="modal-email-subject" 
            type="text" 
            id="subject" 
            defaultValue={`from Marketplace "${props.title}"`}
          />  

          <label htmlFor="message">Message:</label>
          <textarea 
            className="modal-email-message" 
            id="message"
            onChange={(event) => setMessage(event.target.value)}
            value={message}
          >
          </textarea>
        </div>
      </Modal>
    </>
  );
  };

export default Email;
