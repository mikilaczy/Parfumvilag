// Parfumvilag_2.0\frontend\src\pages\Profile.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../services/userService';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // For profile image (base64 or URL)
  const [imageFile, setImageFile] = useState(null); // For the actual file to send to backend
  const [phoneNumber, setPhoneNumber] = useState(''); // For phone number
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Ref for file input

  const fetchUser = async () => {
    setLoading(true);
    setError('');
    try {
      const userData = await getUser();
      setUser(userData);
      setNewName(userData.name || '');
      setNewEmail(userData.email || '');
      setLastUpdated(userData.updated_at ? new Date(userData.updated_at).toLocaleString('hu-HU') : null);
      setProfileImage(userData.profileImage || null); // Assuming profileImage is a URL or base64 string
      setPhoneNumber(userData.phoneNumber || ''); // Assuming phoneNumber is in userData
    } catch (err) {
      setError('Hiba történt a profil betöltése közben. Kérjük, próbálja újra!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const validateForm = useCallback(() => {
    const errors = {};
    if (!newName.trim()) errors.name = 'Név megadása kötelező!';
    if (!newEmail.trim()) {
      errors.email = 'Email cím megadása kötelező!';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      errors.email = 'Érvénytelen email cím formátum!';
    }
    if (newPassword && newPassword.length < 6) {
      errors.password = 'A jelszónak legalább 6 karakter hosszúnak kell lennie!';
    }
    if (phoneNumber && !/^\+?\d{9,14}$/.test(phoneNumber)) {
      errors.phoneNumber = 'Érvénytelen telefonszám formátum! (Például: +36123456789)';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [newName, newEmail, newPassword, phoneNumber]);

  const handleEdit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('name', newName.trim());
      formData.append('email', newEmail.trim());
      if (newPassword.trim()) formData.append('password', newPassword.trim());
      if (imageFile) formData.append('profileImage', imageFile); // Send the file if updated
      formData.append('phoneNumber', phoneNumber.trim()); // Send phone number

      const updatedUser = await updateUser(formData);
      setUser(updatedUser);
      setEditing(false);
      setNewPassword(''); // Clear password after saving
      setLastUpdated(new Date().toLocaleString('hu-HU'));
      setError('');
      alert('Adatok sikeresen frissítve!');
    } catch (err) {
      setError('Hiba történt az adatok mentése közben. Kérjük, próbálja újra!');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Biztosan ki szeretne lépni?')) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  const handleRetry = () => {
    setError('');
    fetchUser();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Csak képfájlokat lehet feltölteni!');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('A kép mérete nem lehet nagyobb 5 MB-nál!');
        return;
      }
      setImageFile(file); // Store the file for backend upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Store base64 for preview
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: '50%' }}></div>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="container">
        <div className="alert alert-danger" role="alert">
          {error}
          <button className="btn btn-outline-primary mt-2" onClick={handleRetry}>Újrapróbálás</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="profile-card">
        <h1 className="profile-title">Profil</h1>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {user && (
          <div className="profile-content">
            <div className="profile-image-section">
              <img 
                src={profileImage || 'https://via.placeholder.com/150?text=Profilkép'} 
                alt={`${user.name} profilképe`} 
                className="profile-image" 
                onClick={() => editing && fileInputRef.current.click()}
                style={{ cursor: editing ? 'pointer' : 'default' }}
              />
              {editing && (
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="d-none" 
                  aria-label="Profilkép feltöltése"
                />
              )}
              {editing && <p className="text-muted mt-1">Kattintson a képére a feltöltéshez (max. 5 MB)</p>}
            </div>
            <h3 className="profile-subtitle">Felhasználói adatok</h3>
            {!editing ? (
              <div className="profile-details">
                <p><strong>Név:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Telefonszám:</strong> {phoneNumber || 'Nincs megadva'}</p>
                <p><strong>Regisztráció dátuma:</strong> {new Date(user.created_at).toLocaleDateString('hu-HU')}</p>
                {lastUpdated && <p><strong>Utolsó frissítés:</strong> {lastUpdated}</p>}
                <div className="profile-actions">
                  <button className="btn btn-outline-peach" onClick={() => setEditing(true)}>Adatok szerkesztése</button>
                  <button className="btn btn-outline-secondary ms-2" onClick={handleLogout}>Kilépés</button>
                </div>
              </div>
            ) : (
              <form id="profileForm" onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
                <div className="mb-3">
                  <label htmlFor="editName" className="form-label">Név</label>
                  <input 
                    type="text" 
                    className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`} 
                    id="editName" 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)} 
                    required 
                    aria-describedby="nameError"
                  />
                  {validationErrors.name && <div id="nameError" className="invalid-feedback">{validationErrors.name}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="editEmail" className="form-label">Email cím</label>
                  <input 
                    type="email" 
                    className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`} 
                    id="editEmail" 
                    value={newEmail} 
                    onChange={(e) => setNewEmail(e.target.value)} 
                    required 
                    aria-describedby="emailError"
                  />
                  {validationErrors.email && <div id="emailError" className="invalid-feedback">{validationErrors.email}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="editPassword" className="form-label">Új jelszó (opcionális)</label>
                  <input 
                    type="password" 
                    className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`} 
                    id="editPassword" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    aria-describedby="passwordError"
                  />
                  {validationErrors.password && <div id="passwordError" className="invalid-feedback">{validationErrors.password}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="editPhoneNumber" className="form-label">Telefonszám (opcionális)</label>
                  <input 
                    type="tel" 
                    className={`form-control ${validationErrors.phoneNumber ? 'is-invalid' : ''}`} 
                    id="editPhoneNumber" 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    placeholder="+36123456789" 
                    aria-describedby="phoneNumberError"
                  />
                  {validationErrors.phoneNumber && <div id="phoneNumberError" className="invalid-feedback">{validationErrors.phoneNumber}</div>}
                </div>
                <div className="profile-actions">
                  <button type="submit" className="btn btn-peach" disabled={loading}>
                    {loading ? 'Mentés...' : 'Mentés'}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-peach ms-2" 
                    onClick={() => setEditing(false)}
                    disabled={loading}
                  >
                    Mégse
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;