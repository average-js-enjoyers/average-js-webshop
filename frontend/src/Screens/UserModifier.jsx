import React from "react";
import UserData from "../Components/Forms/UserData";
import Header from "../Components/Layout/Header";
import ProfileSidebar from "../Components/Layout/ProfileSidebar";

function UserModifier() {
  return (
    <>
      <UserData />
      <Header />
      <main>
        <ProfileSidebar />
        <h1>Edit Profile</h1>
        <p>Edit your profile here</p>
      </main>
    </>
  );
}

export default UserModifier;
