// frontend/src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../services/userService';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        setNewName(userData.name);
        setNewEmail(userData.email);
      } catch (err) {
        setError(err);
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
      setError('');
      alert('Adatok frissítve!');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="container">
      <h1>Profil</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {user && (
        <div>
          <h3>Felhasználói adatok</h3>
          {!editing ? (
            <div>
              <p><strong>Név:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Regisztráció dátuma:</strong> {new Date(user.created_at).toLocaleDateString('hu-HU')}</p>
              <button className="btn btn-outline-primary" onClick={() => setEditing(true)}>Adatok szerkesztése</button>
              <button className="btn btn-outline-secondary ms-2" onClick={handleLogout}>Kilépés</button>
            </div>
          ) : (
            <form id="profileForm">
              <div className="mb-3">
                <label htmlFor="editName" className="form-label">Név</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="editName" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editEmail" className="form-label">Email cím</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="editEmail" 
                  value={newEmail} 
                  onChange={(e) => setNewEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editPassword" className="form-label">Új jelszó</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="editPassword" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                />
              </div>
              <button type="button" className="btn btn-primary" onClick={handleEdit}>Mentés</button>
              <button type="button" className="btn btn-outline-secondary ms-2" onClick={() => setEditing(false)}>Mégse</button>
            </form>
          )}
        </div>
      )}
  
    </div>
  );
};

export default Profile;