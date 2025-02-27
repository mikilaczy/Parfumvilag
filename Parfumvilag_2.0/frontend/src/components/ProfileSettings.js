import React from "react";

const ProfileSettings = () => {
  return (
    <div className="profile-settings">
      <form>
        <label>Name:</label>
        <input type="text" placeholder="Name" />
        <label>Email:</label>
        <input type="email" placeholder="Email" />
        <label>Password:</label>
        <input type="password" placeholder="Password" />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileSettings;
