import Albums from 'components/Albums';
import Pagination from 'components/Pagination';

import { usePagination, useUsers } from 'hooks';

import './Users.scss';

const Users = () => {
  const { users, selectedUserId, setSelectedUserId, albums } = useUsers();

  const usersLength = users.length;

  const { items, page, nextPage, prevPage, startItem, endItem } =
    usePagination(usersLength);

  const currentUsers = users.slice(startItem, endItem);

  return (
    <div>
      <h1 className="text-center">Users and Their Addresses</h1>
      <ul className="UserList">
        {currentUsers.map(({ id, name, address }) => (
          <li className="User" key={id} onClick={() => setSelectedUserId(id)}>
            {name} - {address.street}, {address.suite}, {address.city},{' '}
            {address.zipcode}
            {selectedUserId === id && <Albums albums={albums} />}
          </li>
        ))}
      </ul>

      {usersLength > items && (
        <Pagination
          prevPage={prevPage}
          page={page}
          nextPage={nextPage}
          usersLength={usersLength}
          items={items}
        />
      )}
    </div>
  );
};

export default Users;
