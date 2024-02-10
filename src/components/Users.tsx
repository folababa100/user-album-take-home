import { useEffect, useState } from 'react';
import axios from 'axios';

import './Users.scss';

interface User {
  id: number;
  name: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users',
        );
        setUsers(response.data);
      } catch (error) {
        console.error('There was an error fetching the users:', error);
      }
    })();
  }, []);

  return (
    <div>
      <h1 className="text-center">Users and Their Addresses</h1>
      <ul className="UserList">
        {users.map((user) => (
          <li className="User" key={user.id}>
            {user.name} - {user.address.street}, {user.address.suite},{' '}
            {user.address.city}, {user.address.zipcode}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
