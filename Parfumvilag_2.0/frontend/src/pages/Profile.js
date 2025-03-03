import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../services/userService';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        setNewName(userData.name);
        setNewEmail(userData.email);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleEdit = async () => {
    try {
      const updatedUser = await updateUser({
        name: newName,
        email: newEmail,
        password: newPassword
      });
      setUser(updatedUser);
      setEditing(false);
      alert('Adatok frissítve!');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container">
      <h1>Profil</h1>
      {user && (
        <div>
          <p><strong>Név:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setEditing(true)}>Szerkesztés</button>
          {editing && (
            <form>
              <div className="mb-3">
                <label>Név</label>
                <input value={newName} onChange={(e) => setNewName(e.target.value)} />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label>Új jelszó</label>
                <input type="password" onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              <button onClick={handleEdit}>Mentés</button>
            </form>
          )}
          <button onClick={handleLogout}>Kilépés</button>
        </div>
      )}
    </div>
  );
};

export default Profile;