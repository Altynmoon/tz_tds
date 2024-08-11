import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  skills: string[];
  id: number;
  registrationDate: string;
}

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, reset } = useForm<UserFormData>();
  const [user, setUser] = useState<UserFormData | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = storedUsers.find((user: UserFormData) => user.id === Number(id));

    if (currentUser) {
      setUser(currentUser);
      setSkills(currentUser.skills);
      reset({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        skills: currentUser.skills,
        id: currentUser.id,
        registrationDate: currentUser.registrationDate
      });
    }
  }, [id, reset]);

  const onSubmit: SubmitHandler<UserFormData> = (data) => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = storedUsers.map((user: UserFormData) =>
      user.id === Number(id) ? { ...data, skills, id: user.id, registrationDate: user.registrationDate } : user
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    navigate('/');
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  if (!user) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="p-16 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Edit User</h1>
      <div className="py-4"  >
<button
      type="button"
      onClick={() => navigate('/')}
      className="bg-green-500 p-8 text-white  py-2 rounded hover:bg-green-600"
      >
      Назад
    </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            First Name
            <input {...register('firstName', { required: true })} className="mt-1 block w-full p-2 border border-gray-300 rounded" />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Last Name
            <input {...register('lastName', { required: true })} className="mt-1 block w-full p-2 border border-gray-300 rounded" />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
            <input type="email" {...register('email', { required: true })} className="mt-1 block w-full p-2 border border-gray-300 rounded" />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Skills</label>
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
              Add Skill
            </button>
          </div>
          <ul className="list-decimal pl-5">
            {skills.map((skill, index) => (
              <li key={index} className="flex items-center justify-between mb-1">
                <span>{`${index + 1}) ${skill}`}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
