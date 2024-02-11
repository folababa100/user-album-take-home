import useUsers from 'hooks/useUsers';
import Albums from 'components/Albums';

import './Users.scss';

const Users = () => {
  const { users, selectedUserId, setSelectedUserId, albums } = useUsers();

  return (
    <div>
      <h1 className="text-center">Users and Their Addresses</h1>
      <ul className="UserList">
        {users.map(({ id, name, address }) => (
          <li className="User" key={id} onClick={() => setSelectedUserId(id)}>
            {name} - {address.street}, {address.suite}, {address.city},{' '}
            {address.zipcode}
            {selectedUserId === id && <Albums albums={albums} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
