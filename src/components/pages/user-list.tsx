import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../../data/users.json'; 

interface User {
  id: number;

  firstName: string;
  lastName: string;
  email: string;
  skills: string[];
  registrationDate: string;
}
const UserList = () => {

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || 'null');
    if (storedUsers) {
      setUsers(storedUsers);
    } else {
      setUsers(data);
      localStorage.setItem('users', JSON.stringify(data)); 
    }
  }, []);

  const handleDelete = (id: number) => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = storedUsers.filter((user: any) => user.id !== id);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };


  return (
    <div className="p-16 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold mb-4">User List</h1>
    <Link to="/add-user" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4 inline-block">
      Add New User
    </Link>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
          <th className="p-2 border-b">№</th>
            <th className="p-2 border-b">Имя</th>
            <th className="p-2 border-b">Фамилия</th>
            <th className="p-2 border-b">Email</th>
            <th className="p-2 border-b">Навыки</th>
            <th className="p-2 border-b">Дата</th>
            <th className="p-2 border-b">Edit</th>
            <th className="p-2 border-b">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="hover:bg-gray-50">
            <td className="p-2 border-b">{index + 1}</td>
              <td className="p-2 border-b">{user.firstName}</td>
              <td className="p-2 border-b">{user.lastName}</td>
              <td className="p-2 border-b">{user.email}</td>
              <td className="p-2 border-b">{user.skills.join(', ')}</td>
              <td className="p-2 border-b">{user.registrationDate}</td>
              <td className="p-2 border-b">
                <Link to={`/edit-user/${user.id}`} className="text-blue-500 hover:underline">Edit</Link>
              </td>
              <td className="p-2 border-b">
                <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default UserList;
