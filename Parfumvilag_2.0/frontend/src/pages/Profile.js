import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../services/userService';
import { AuthContext } from '../App';
import placeholderImage from '../assets/placeholder.png'; // <<< Biztosítsd, hogy ez az útvonal helyes!

const Profile = () => {
    const { isLoggedIn, user: contextUser, login: contextLogin, logout: contextLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    // --- State Definitions ---
    const [user, setUser] = useState(contextUser || null);
    const [loading, setLoading] = useState(!contextUser);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(''); // General/Fetch error
    const [updateError, setUpdateError] = useState(''); // Update specific error
    const [validationErrors, setValidationErrors] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState('');

    // Form state
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // For the input field during edit
    const [profileImage, setProfileImage] = useState(''); // For the displayed image

    // --- Initialize Form ---
    const initializeForm = useCallback((userData) => {
        if (!userData) return;
        console.log("[initializeForm] Initializing form. Image URL:", userData.profile_picture_url);
        setNewName(userData.name || '');
        setNewEmail(userData.email || '');
        setPhoneNumber(userData.phone || '');
        const currentImageUrl = userData.profile_picture_url || '';
        setImageUrl(currentImageUrl); // Sync input field
        setProfileImage(currentImageUrl); // Sync display image
        setNewPassword('');
        setValidationErrors({});
        setUpdateError('');
        setUpdateSuccess('');
    }, []);

    // --- Fetch User ---
    const fetchUser = useCallback(async (force = false) => {
        if (!isLoggedIn) return null;
        if (loading && !force) return user;

        console.log(`[fetchUser] Attempting fetch... Force: ${force}`);
        if(!force) setLoading(true);
        setError('');
        try {
            const userData = await getUser();
            if (!userData) throw new Error("Nem érkeztek felhasználói adatok.");
            console.log("[fetchUser] Data received. Image URL:", userData.profile_picture_url);

            setUser(userData);
            contextLogin(userData, localStorage.getItem('token'));
            // Initialize form only if NOT editing or if forced (after update)
            if (!editing || force) {
                initializeForm(userData);
            }

             if (!force) setLoading(false);
            return userData;

        } catch (err) {
            console.error("[fetchUser] Error:", err);
            setError(err.message || 'Profil betöltési hiba.');
            setUser(null);
            if (err.message.includes('hitelesít') || err.response?.status === 401) {
                 contextLogout(); navigate('/bejelentkezes');
            }
             if (!force) setLoading(false);
            return null;
        }
    }, [isLoggedIn, user, loading, editing, contextLogin, contextLogout, navigate, initializeForm]);

    // --- Initial Load Effect ---
     useEffect(() => {
         if (isLoggedIn) {
             if (!user && !loading) { // Fetch only if no user and not already loading
                 fetchUser();
             } else if (user && !editing) { // Sync form if user exists and not editing
                  initializeForm(user);
                  if(loading) setLoading(false); // Ensure loading stops
             }
         } else if (!loading) { // If not logged in and not loading
            // Optional: redirect to login if profile is protected
             navigate('/bejelentkezes');
         }
     }, [isLoggedIn, user, editing, loading, fetchUser, initializeForm, navigate]);

    // --- Validation ---
    const validateForm = useCallback(() => {
        // ... validation logic ...
        const errors = {};
        if (!newName.trim()) errors.name = 'Név megadása kötelező!';
        if (!newEmail.trim()) {
          errors.email = 'Email cím megadása kötelező!';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
          errors.email = 'Érvénytelen email cím formátum!';
        }
        if (newPassword && newPassword.length < 6) {
          errors.password = 'Jelszó min. 6 karakter!';
        }
        if (phoneNumber && phoneNumber.trim() && !/^\+?[0-9\s-()]{7,}$/.test(phoneNumber)) {
          errors.phoneNumber = 'Érvénytelen telefonszám!';
        }
        const trimmedImageUrl = imageUrl.trim();
        if (trimmedImageUrl && !/^https?:\/\/.+\..+/i.test(trimmedImageUrl)) {
          errors.imageUrl = 'Érvénytelen URL (http(s)://...)!';
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    }, [newName, newEmail, newPassword, phoneNumber, imageUrl]);

    // --- Handle Update ---
    const handleEdit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setUpdateLoading(true);
        setUpdateError('');
        setUpdateSuccess('');

        const dataToUpdate = {
            name: newName.trim(),
            email: newEmail.trim(),
            phone: phoneNumber.trim() || null,
            profile_picture_url: imageUrl.trim() || null, // Send trimmed URL or null
        };
        if (newPassword.trim()) {
            dataToUpdate.password = newPassword.trim();
        }

        try {
            console.log("[handleEdit] Calling updateUser with:", dataToUpdate);
            await updateUser(dataToUpdate);
            console.log("[handleEdit] updateUser successful. Forcing re-fetch...");

            const freshUserData = await fetchUser(true); // Force re-fetch

            if (freshUserData) {
                console.log("[handleEdit] Re-fetch successful.");
                setEditing(false); // Exit edit mode AFTER successful re-fetch
                setUpdateSuccess('Adatok sikeresen frissítve!');
                setTimeout(() => setUpdateSuccess(''), 4000);
            } else {
                throw new Error("Adatok mentve, de a profil frissítése sikertelen.");
            }

        } catch (err) {
            console.error("[handleEdit] Error:", err);
            setUpdateError(err.message || 'Hiba történt a mentés során.');
        } finally {
            console.log("[handleEdit] Entering finally block...");
            setUpdateLoading(false); // <<< STOP Loading GUARANTEED
            console.log("[handleEdit] updateLoading set to false.");
        }
    };

    // --- Logout ---
    const handleLogout = () => { /* ... */ };
    // --- Cancel Edit ---
    const handleCancelEdit = () => {
        setEditing(false);
        if (user) { initializeForm(user); } // Reset form
        setUpdateError('');
        setValidationErrors({});
        setUpdateSuccess('');
        setError('');
    };

    // --- Render Logic ---
    if (loading) { /* ... Spinner ... */ }
    if (!user) { /* ... Error/Login prompt ... */ }

    // --- Main Profile Render ---
    return (
        <div className="container py-5">
            <div className="profile-card">
                <h1 className="profile-title mb-4">Profil</h1>
                {/* Messages */}
                {updateSuccess && <div className="alert alert-success">{updateSuccess}</div>}
                {updateError && <div className="alert alert-danger">{updateError}</div>}
                {error && !editing && <div className="alert alert-warning">{error}</div>}

                <div className="profile-content">
                    {/* Image Section */}
                    <div className="profile-image-section">
                        <img
                            // Itt a 'profileImage' state-et használjuk, amit az initializeForm frissít
                            src={profileImage || placeholderImage}
                            alt={`${user?.name || 'Felhasználó'} profilképe`}
                            className="profile-image"
                            key={profileImage} // Segít a frissítésben
                            onError={(e) => {
                                console.warn("Image onError triggered for src:", e.target.src);
                                e.target.onerror = null;
                                e.target.src = placeholderImage;
                            }}
                        />
                        {/* A KÉP URL INPUT MEZŐ CSAK SZERKESZTÉSKOR LÁTSZIK */}
                        {/* Ez már a form tagen BELÜL van lejjebb */}
                    </div>

                    {/* Details / Form Section */}
                    <h3 className="profile-subtitle mb-3">Felhasználói adatok</h3>
                    {!editing ? (
                        // --- Display Mode ---
                        <div className="profile-details">
                            {/* ... user data display ... */}
                            <p><strong>Név:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Telefonszám:</strong> {user.phone || 'Nincs megadva'}</p>
                            <p><strong>Regisztráció:</strong> {user.created_at ? new Date(user.created_at).toLocaleDateString('hu-HU') : 'Ismeretlen'}</p>
                            <div className="profile-actions mt-4">
                                <button className="btn btn-outline-primary" onClick={() => setEditing(true)} disabled={updateLoading}>Adatok szerkesztése</button>
                                <button className="btn btn-outline-danger ms-2" onClick={handleLogout} disabled={updateLoading}>Kilépés</button>
                            </div>
                        </div>
                    ) : (
                        // --- Editing Mode ---
                        <form id="profileForm" onSubmit={handleEdit}>
                            {/* Name */}
                            <div className="mb-3">
                                <label htmlFor="editName" className="form-label">Név</label>
                                <input type="text" className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`} id="editName" value={newName} onChange={(e) => setNewName(e.target.value)} required disabled={updateLoading}/>
                                {validationErrors.name && <div className="invalid-feedback">{validationErrors.name}</div>}
                            </div>
                            {/* Email */}
                            <div className="mb-3">
                                <label htmlFor="editEmail" className="form-label">Email cím</label>
                                <input type="email" className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`} id="editEmail" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required disabled={updateLoading}/>
                                {validationErrors.email && <div className="invalid-feedback">{validationErrors.email}</div>}
                            </div>
                            {/* Phone */}
                            <div className="mb-3">
                                <label htmlFor="editPhoneNumber" className="form-label">Telefonszám</label>
                                <input type="tel" className={`form-control ${validationErrors.phoneNumber ? 'is-invalid' : ''}`} id="editPhoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Opcionális" disabled={updateLoading}/>
                                {validationErrors.phoneNumber && <div className="invalid-feedback">{validationErrors.phoneNumber}</div>}
                            </div>
                            {/* === JAVÍTOTT KÉP URL INPUT HELYE === */}
                            <div className="mb-3">
                                <label htmlFor="profileImageUrl" className="form-label">Profilkép URL</label>
                                <input
                                    type="text"
                                    className={`form-control ${validationErrors.imageUrl ? 'is-invalid' : ''}`}
                                    id="profileImageUrl"
                                    value={imageUrl} // Input state-et használ
                                    // Csak az input state-et frissíti, a megjelenített képet nem!
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="Kép URL-je (pl. https://...)"
                                    aria-describedby="imageUrlError"
                                    disabled={updateLoading}
                                />
                                {validationErrors.imageUrl && <div id="imageUrlError" className="invalid-feedback">{validationErrors.imageUrl}</div>}
                            </div>
                            {/* Password */}
                            <div className="mb-3">
                                <label htmlFor="editPassword" className="form-label">Új jelszó</label>
                                <input type="password" className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`} id="editPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Üresen hagyva nem változik" disabled={updateLoading}/>
                                {validationErrors.password && <div className="invalid-feedback">{validationErrors.password}</div>}
                            </div>

                            {/* Buttons */}
                            <div className="profile-actions mt-4">
                                <button type="submit" className="btn btn-primary" disabled={updateLoading}>
                                    {updateLoading ? <><span className="spinner-border spinner-border-sm me-2"></span>Mentés...</> : 'Mentés'}
                                </button>
                                <button type="button" className="btn btn-outline-secondary ms-2" onClick={handleCancelEdit} disabled={updateLoading}>
                                    Mégse
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;