import ProfileScreen from "screens/profile/ProfileScreen";
import {
  DeleteAccountForm,
  ManageAddressesForm,
  ManagePasswordForm,
  ManagePersonalInfoForm,
} from "components/forms/ManageAccountForms";

import { useAuth } from "hooks";

export default function ProfileEditScreen() {
  const { shippingAddresses, billingAddresses } = useAuth();

  return (
    <ProfileScreen
      activeScreen="/profile/manage"
      title="Manage Account"
      subtitle="Manage your personal information, your password and your addresses."
    >
      <section className="profile-main__content profile-manage">
        <ManagePersonalInfoForm />
        <ManagePasswordForm />
        <ManageAddressesForm type="shipping" addresses={shippingAddresses} />
        <ManageAddressesForm type="billing" addresses={billingAddresses} />
        <DeleteAccountForm />
      </section>
    </ProfileScreen>
  );
}
