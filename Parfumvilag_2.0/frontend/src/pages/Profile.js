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
  const [profileImage, setProfileImage] = useState(''); // URL vagy base64 a megjelenítéshez
  const [imageFile, setImageFile] = useState(null); // Fájl a feltöltéshez
  const [imageSource, setImageSource] = useState('url'); // 'url' vagy 'file'
  const [imageUrl, setImageUrl] = useState(''); // URL tárolására
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const fetchUser = async () => {
    setLoading(true);
    setError('');
    try {
      const userData = await getUser();
      setUser(userData);
      setNewName(userData.name || '');
      setNewEmail(userData.email || '');
      setLastUpdated(userData.updated_at ? new Date(userData.updated_at).toLocaleString('hu-HU') : null);
      const initialImage = userData.profileImage || '';
      setProfileImage(initialImage);
      setImageUrl(initialImage);
      setPhoneNumber(userData.phoneNumber || '');
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
    // URL érvényesítése, ha URL-t választottak
    if (imageSource === 'url' && imageUrl) {
      if (!/^https?:\/\/.*/i.test(imageUrl)) {
        errors.imageUrl = 'Érvénytelen URL! (Pl. https://example.com/image)';
      }
    }
    // Fájl érvényesítése, ha fájlt választottak
    if (imageSource === 'file' && imageFile) {
      if (!imageFile.type.startsWith('image/')) {
        errors.imageFile = 'Csak képfájlokat lehet feltölteni!';
      }
      if (imageFile.size > 5 * 1024 * 1024) { // 5MB limit
        errors.imageFile = 'A kép mérete nem lehet nagyobb 5 MB-nál!';
      }
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [newName, newEmail, newPassword, phoneNumber, imageSource, imageUrl, imageFile]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Csak képfájlokat lehet feltölteni!');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('A kép mérete nem lehet nagyobb 5 MB-nál!');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Base64 a megjelenítéshez
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    try {
      if (imageSource === 'file' && imageFile) {
        // Fájlfeltöltés esetén FormData használata
        const formData = new FormData();
        formData.append('name', newName.trim());
        formData.append('email', newEmail.trim());
        if (newPassword.trim()) formData.append('password', newPassword.trim());
        formData.append('phoneNumber', phoneNumber.trim());
        formData.append('profileImage', imageFile); // Fájl küldése

        const updatedUser = await updateUser(formData, true); // true: FormData küldése
        setUser(updatedUser);
        setProfileImage(updatedUser.profileImage); // A backend által visszaadott URL vagy base64
        setImageUrl(updatedUser.profileImage); // URL frissítése
      } else {
        // URL esetén JSON küldése
        const updatedData = {
          name: newName.trim(),
          email: newEmail.trim(),
          phoneNumber: phoneNumber.trim(),
          profileImage: imageUrl || '',
        };
        if (newPassword.trim()) {
          updatedData.password = newPassword.trim();
        }

        const updatedUser = await updateUser(updatedData, false); // false: JSON küldése
        setUser(updatedUser);
        setProfileImage(updatedUser.profileImage); // URL vagy base64
        setImageUrl(updatedUser.profileImage);
      }

      setEditing(false);
      setNewPassword('');
      setImageFile(null);
      setLastUpdated(new Date().toLocaleString('hu-HU'));
      setError('');
      alert('Adatok sikeresen frissítve!');
    } catch (err) {
      // Részletesebb hibakezelés
      const errorMessage = err.response?.data?.error || 'Hiba történt az adatok mentése közben. Kérjük, próbálja újra!';
      setError(errorMessage);
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
              />
              {editing && (
                <div className="mt-2">
                  <div className="mb-3">
                    <label className="form-label">Profilkép forrása</label>
                    <div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="imageSourceUrl"
                          value="url"
                          checked={imageSource === 'url'}
                          onChange={() => {
                            setImageSource('url');
                            setImageFile(null);
                            setProfileImage(imageUrl || '');
                          }}
                        />
                        <label className="form-check-label" htmlFor="imageSourceUrl">
                          URL
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="imageSourceFile"
                          value="file"
                          checked={imageSource === 'file'}
                          onChange={() => {
                            setImageSource('file');
                            setProfileImage(imageFile ? profileImage : '');
                          }}
                        />
                        <label className="form-check-label" htmlFor="imageSourceFile">
                          Fájl feltöltése
                        </label>
                      </div>
                    </div>
                  </div>

                  {imageSource === 'url' && (
                    <div className="mb-3">
                      <label htmlFor="profileImageUrl" className="form-label">Profilkép URL</label>
                      <input
                        type="text"
                        className={`form-control ${validationErrors.imageUrl ? 'is-invalid' : ''}`}
                        id="profileImageUrl"
                        value={imageUrl}
                        onChange={(e) => {
                          setImageUrl(e.target.value);
                          setProfileImage(e.target.value);
                        }}
                        placeholder="https://example.com/image"
                        aria-describedby="imageUrlError"
                      />
                      {validationErrors.imageUrl && (
                        <div id="imageUrlError" className="invalid-feedback">
                          {validationErrors.imageUrl}
                        </div>
                      )}
                    </div>
                  )}

                  {imageSource === 'file' && (
                    <div className="mb-3">
                      <label htmlFor="profileImageFile" className="form-label">Profilkép feltöltése</label>
                      <input
                        type="file"
                        className={`form-control ${validationErrors.imageFile ? 'is-invalid' : ''}`}
                        id="profileImageFile"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        aria-describedby="imageFileError"
                      />
                      {validationErrors.imageFile && (
                        <div id="imageFileError" className="invalid-feedback">
                          {validationErrors.imageFile}
                        </div>
                      )}
                      <p className="text-muted mt-1">Max. 5 MB</p>
                    </div>
                  )}
                </div>
              )}
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