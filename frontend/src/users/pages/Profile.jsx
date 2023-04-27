import React, { useContext } from "react";
import { useQuery } from 'react-query';
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/loadingspinner/LoadingSpinner";
import { getUser } from "../api/users";

import './Profile.css'

const Profile = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, data } = useQuery('userData', () => getUser({ token: auth.token, id: auth.userId }));

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p>An error has occurred: {error.message}</p>;
  }

  if (!data) {
    return <div className="center">
    <LoadingSpinner />
  </div>
  }

  return (
    <div className="profile">
      <p>Email: {data && data.email}</p>
      <p>Joined on: {data && new Date(data.created).toLocaleDateString()}</p>
    </div>
  );
};

export default Profile;
