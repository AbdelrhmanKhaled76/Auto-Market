import { useEffect, useState } from "react";
import { getProfile } from "../services/profileService";
import { handleError } from "../util/functions/errorHandler";
import type { UserType } from "../interfaces/profile/user";
import { useAuth } from "../util/hooks/authHook";
import { Navigate } from "react-router-dom";

function Profile() {
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const { token, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  } else {
    getProfile()
      .then((res) => {
        console.log(res);
        setUserInfo(res?.data);
      })
      .catch((err) => handleError(err));
  }

  return (
    <div>
      <h1>Profile</h1>
      {userInfo ? (
        <>
          <p>Username: {userInfo.username}</p>
          <p>Email: {userInfo.email}</p>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;
