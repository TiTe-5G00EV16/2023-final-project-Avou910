import React, { useState, useContext } from "react";
import "./UserProfile.css";
import Button from "../../shared/components/button/Button";
import { useMutation } from "react-query";
import { deleteUser } from "../api/users";
import Modal from "../../shared/components/modal/Modal";
import { AuthContext } from '../../shared/context/auth-context';

const UserProfile =  ({data})  => {
  const auth = useContext(AuthContext);


  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);


  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
        console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  
  const deleteConfirmedHandler = () => {
    deleteUserMutation.mutate({
        id: data.id,
        token: auth.token});
    setShowConfirmationModal(false);
    auth.logout();
  };

  return (
    <form className="profile-container">
      <h3 className="h3">Profile information</h3>
      <p className="p">Email: {data && auth.email}</p>
      <p className="p">
        Joined on:{" "}
        {data && new Date(data.created).toLocaleDateString()}
      </p>

      <Button danger onClick={(event) => {
          event.preventDefault();
          showConfirmationHandler();}}> 
            Delete Profile
      </Button>

      <Modal
        show={showConfirmationModal}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelConfirmationHandler}>
              Cancel
            </Button>
            <Button danger onClick={deleteConfirmedHandler}>
              Delete
            </Button>
          </>
        }
      >
        <p>When you delete your account you will be automatically logged out.</p>
        
      </Modal>
    </form>
  );
};

export default UserProfile;
