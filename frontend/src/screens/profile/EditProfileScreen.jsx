import EditProfileForm from "components/forms/EditProfileForm";
import ProfileSidebar from "components/layout/ProfileSidebar";

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
