import ProfileScreen from "screens/profile/ProfileScreen";
import {
  DeleteAccountForm,
  ManageAddressesForm,
  ManagePasswordForm,
  ManagePersonalInfoForm,
} from "components/forms/ManageAccountForms";
import { useEffect, useState } from "react";
import { splitAddressesByType } from "utils";

import { useAuth } from "hooks";

export default function ProfileEditScreen() {
  const { user, fetchUserAddresses } = useAuth();

  const [addresses, setAddresses] = useState(null);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [billingAddresses, setBillingAddresses] = useState([]);

  useEffect(() => {
    async function fetchAddresses() {
      try {
        const fetchedAddresses = await fetchUserAddresses();
        setAddresses(fetchedAddresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        // Handle errors as needed
      }
    }

    fetchAddresses();
  }, []);

  useEffect(() => {
    if (addresses) {
      const { shippingAddresses, billingAddresses } =
        splitAddressesByType(addresses);
      setShippingAddresses(shippingAddresses);
      setBillingAddresses(billingAddresses);
      console.log("shippingAddresses", shippingAddresses);
      console.log("billingAddresses", billingAddresses);
    }
  }, [addresses]);

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
