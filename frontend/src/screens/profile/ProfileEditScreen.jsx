import ProfileScreen from "screens/profile/ProfileScreen";
import EditProfileForm from "components/forms/EditProfileForm";

export default function ProfileEditScreen() {
  return (
    <ProfileScreen
      activeScreen="/profile/edit"
      title="Edit Account"
      subtitle="Change your account details, update your password and edit your list of addresses."
    >
      <EditProfileForm />
    </ProfileScreen>
  );
}
