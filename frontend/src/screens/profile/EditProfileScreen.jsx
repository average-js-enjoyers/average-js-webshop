import React from "react";
import EditProfileForm from "components/forms/EditProfileForm";
import Header from "components/layout/Header";
import Footer from "components/layout/Footer";
import ProfileSidebar from "components/layout/ProfileSidebar";

/* function EditProfileScreen() {
  return (
    <>
      <Header />
      <main>
        <ProfileSidebar />
        <h1>Edit Profile</h1>
        <p>Edit your profile here</p>
        <EditProfileForm />
      </main>
      <Footer />
    </>
  );
} */

function EditProfileScreen() {
  return (
    <>
      <ProfileSidebar />
      <h1>Edit Profile</h1>
      <p>Edit your profile here</p>
      <EditProfileForm />
    </>
  );
}

export default EditProfileScreen;
