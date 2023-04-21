import React, { useContext } from 'react';
import { useQuery } from 'react-query';

import UsersList from '../components/UsersList';
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { getUser } from '../api/users';

const Users = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, data } = useQuery('usersData', getUser);

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

  return <UsersList items={data} />;
};

export default Users;
