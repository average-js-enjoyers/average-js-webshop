import { Link } from "react-router-dom";
import { Card } from "components/common/Card";
import {
  BoxArrowUpRight,
  ClockHistory,
  Hearts,
  HouseFill,
  PencilSquare,
  ShieldFillCheck,
} from "react-bootstrap-icons";

function ProfileNavigation({ activeScreen }) {
  const screens = [
    {
      name: "Dashboard",
      icon: <HouseFill className="profile-navigation__icon" />,
      path: "/profile",
    },
    {
      name: "Edit Account & Addresses",
      icon: <PencilSquare className="profile-navigation__icon" />,
      path: "/profile/edit",
    },
    {
      name: "My Order History",
      icon: <ClockHistory className="profile-navigation__icon" />,
      path: "/profile/orders",
    },
    {
      name: "My Favorites",
      icon: <Hearts className="profile-navigation__icon" />,
      path: "/profile/favorites",
    },
    {
      name: "Warranty Information",
      icon: <ShieldFillCheck className="profile-navigation__icon" />,
      path: "/profile/warranty",
    },
    {
      name: "Sign Out",
      icon: <BoxArrowUpRight className="profile-navigation__icon" />,
      path: "/signout",
    },
  ];

  return (
    <div className="profile-navigation-wrapper">
      <Card className={"profile-navigation"}>
        <ul className="profile-navigation__list">
          {screens.map((screen) => (
            <li className="profile-navigation__item">
              <Link
                to={screen.path}
                className={`profile-navigation__link ${
                  activeScreen === screen.path
                    ? "profile-navigation__link--active"
                    : ""
                }`}
              >
                {screen.icon}
                <span className="profile-navigation__text">{screen.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default ProfileNavigation;