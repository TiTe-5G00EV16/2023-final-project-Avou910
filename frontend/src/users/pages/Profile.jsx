import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/loadingspinner/LoadingSpinner";
import { getUser } from "../api/users";

const Profile = () => {
  const auth = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUser(auth.token);
        setUserData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [auth.token]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="profile">
      <p>Email: {userData.email}</p>
      <p>Joined on: {new Date(userData.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default Profile;
