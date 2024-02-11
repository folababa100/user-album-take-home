import { useEffect, useState } from 'react';
import axios from 'axios';

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

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [albums, setAlbums] = useState([]);

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

  useEffect(() => {
    (async () => {
      if (selectedUserId) {
        try {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/albums?userId=${selectedUserId}`,
          );
          setAlbums(response.data);
        } catch (error) {
          console.error('Error fetching albums:', error);
        }
      }
    })();
  }, [selectedUserId]);

  return { users, selectedUserId, setSelectedUserId, albums };
};
