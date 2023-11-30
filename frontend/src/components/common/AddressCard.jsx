import Button from "components/common/Button";
import { PencilSquare } from "react-bootstrap-icons";
import { formatPhoneNumber } from "utils";

export default function AddressCard({
  isEditable = false,
  isActive = false,
  type = "shipping",
  name,
  company = "",
  vatID = "",
  zip,
  street,
  city,
  country,
  phoneNumber,
}) {
  return (
    <div className="address-card__wrapper">
      {isActive && <div className="badge badge--success">Active</div>}
      <p className="address-card__address-name">{name}</p>
      {type === "billing" && (
        <>
          <p className="address-card__company">{company}</p>
          <p className="address-card__tax-no">
            Tax: <span>{vatID}</span>
          </p>
        </>
      )}
      <p className="address-card__street">{street}</p>
      <p className="address-card__city">
        {zip && `${zip}, `}
        {city}, {country && country.toUpperCase()}
      </p>
      <p className="address-card__phone-number">
        {formatPhoneNumber(phoneNumber)}
      </p>
      {isEditable && (
        <Button
          variant="outline-light btn--compact btn--muted"
          className="address-card__edit-button"
        >
          <PencilSquare />
        </Button>
      )}
    </div>
  );
}
