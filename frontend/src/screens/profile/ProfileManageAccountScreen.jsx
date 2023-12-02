import { useEffect, useState } from "react";
import { redirect, useLocation } from "react-router-dom";
import { splitAddressesByType } from "utils";
import { useModal } from "hooks";

import ProfileScreen from "screens/profile/ProfileScreen";
import {
  DeleteAccountForm,
  ManageAddressesForm,
  ManagePasswordForm,
  ManagePersonalInfoForm,
} from "components/forms/ManageAccountForms";
import StatusMessage from "components/common/StatusMessage";

import { useAuth } from "hooks";
import Modal from "components/common/Modal";
import AddressCRUDForm from "components/forms/AddressCRUDForm";

export default function ProfileEditScreen() {
  const { user, fetchUserAddresses } = useAuth();

  const location = useLocation();

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
      /*  console.log("shippingAddresses", shippingAddresses);
      console.log("billingAddresses", billingAddresses); */
    }
  }, [addresses]);

  useEffect(() => {
    const { scrollTo } = location.state || {};
    if (scrollTo) {
      const element = document.getElementById(scrollTo);
      if (element) {
        const offset = 200;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const targetPosition = elementPosition - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }
  }, [location]);

  let { updateSuccess } = location.state || {};
  if (updateSuccess) {
    setTimeout(() => {
      updateSuccess = false;
    }, 3000);
  }

  const { toggleModal, setModalChildren } = useModal();

  function handleAddAddress(type) {
    console.log("handleAddAddress", type);
    setModalChildren(<AddressCRUDForm type={type} />);
    toggleModal();
  }

  return (
    <ProfileScreen
      activeScreen="/profile/manage"
      title="Manage Account"
      subtitle="Manage your personal information, your password and your addresses."
    >
      {updateSuccess && (
        <StatusMessage
          type="success"
          message="Update successful!"
          cleanupFunction={() => (updateSuccess = false)}
        />
      )}
      <section className="profile-main__content profile-manage">
        <ManagePersonalInfoForm />
        <ManagePasswordForm />
        <ManageAddressesForm
          type="shipping"
          addresses={shippingAddresses}
          id="manageShipping"
          onAddAddress={handleAddAddress}
        />
        <ManageAddressesForm
          type="billing"
          addresses={billingAddresses}
          id="manageBilling"
          onAddAddress={handleAddAddress}
        />
        <DeleteAccountForm />
      </section>
    </ProfileScreen>
  );
}
