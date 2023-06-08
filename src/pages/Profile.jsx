import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h1>{user.displayName}</h1>
    </div>
  );
}

export default Profile;
