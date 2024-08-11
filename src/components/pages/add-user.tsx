import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  skills: string[];
  id: number;
}

const AddUser = () => {
  const { register, handleSubmit, reset } = useForm<UserFormData>();
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const navigate = useNavigate(); 

  const onSubmit: SubmitHandler<UserFormData> = (data) => {
    if (skills.length === 0) {
      alert('нужно добавить хотя бы один навык!');
      return;
    }
    const newUser = {
      ...data,
      skills,
      registrationDate: new Date().toISOString().split('T')[0],
    };
    
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    newUser.id = storedUsers.length ? Math.max(...storedUsers.map((user: any) => user.id)) + 1 : 1;

    localStorage.setItem('users', JSON.stringify([...storedUsers, newUser]));
    reset();
    setSkills([]);
    navigate('/');
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  return (
    <div className="p-16 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Add New User</h1>
      <div className="py-4"  >
      <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-green-500 p-8 text-white  py-2 rounded hover:bg-green-600">
            Назад
          </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Имя
            <input
              type="text"
              {...register('firstName')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Фамилия
            <input
              type="text"
              {...register('lastName')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
            <input
              type="email"
              id="email"
              {...register('email')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Навыки</label>
          <div className="flex mb-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Add skill"
              className="border border-gray-300 p-2 rounded-l"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
            >
              Добавить навыки
            </button>
          </div>
          <ul className="list-decimal pl-5">
            {skills.map((skill, index) => (
              <li key={index} className="flex items-center justify-between mb-1">
                <span>{`${index + 1}) ${skill}`}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUser;
