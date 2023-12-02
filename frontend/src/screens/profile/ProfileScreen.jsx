import ProfileNavigation from "components/navigation/ProfileNavigation";
import { useAuth } from "hooks";
import { useEffect, useState } from "react";
import StatusMessage from "components/common/StatusMessage";

export default function ProfileScreen({
  activeScreen,
  title,
  subtitle,
  children,
}) {
  const { user: authUser, responseData, clearResponseData } = useAuth();
  const [user, setUser] = useState(authUser);

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    }
    // This effect should run whenever `authUser` changes
  }, [authUser]);

  return (
    <div className="profile">
      {responseData?.error?.statusCode === 401 && (
        <StatusMessage
          type="danger"
          message="Your email or password is incorrect. Please try again."
          cleanupFunction={() => clearResponseData()}
        />
      )}
      {responseData?.error?.statusCode !== 401 &&
        responseData?.error &&
        responseData !== null && (
          <StatusMessage
            type="danger"
            message={
              "Something went wrong. We are working on it! (Error code " +
              responseData?.error?.statusCode +
              ")"
            }
            cleanupFunction={() => clearResponseData()}
          />
        )}
      <section className="profile-header">
        <div className="profile-intro">
          <div className="profile-intro__photo-wrapper">
            <img
              /* src={`${process.env.PUBLIC_URL}/assets/img/brade-profile.png`} */
              src={user.profilePhoto}
              alt="Brade Profile"
              className="profile-intro__photo"
            />
          </div>
          <div className="profile-intro__text-wrapper">
            <p className="profile-intro__welcome">Welcome,</p>
            <h2 className="profile-intro__name">
              {user.firstName} {user.lastName}
            </h2>
            <hr className="profile-intro__rule" />
            <p className="profile-intro__email">{user.emailAddress}</p>
          </div>
        </div>
        <div className="profile-title-wrapper">
          <h1 className="profile-title">{title}</h1>
          <p className="profile-subtitle">{subtitle}</p>
        </div>
      </section>
      <section className="profile-main">
        <ProfileNavigation activeScreen={activeScreen} />
        {children}
      </section>
    </div>
  );
}
