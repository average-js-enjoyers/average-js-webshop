import ProfileNavigation from "components/navigation/ProfileNavigation";

function ProfileScreen({ activeScreen, title, subtitle, children }) {
  return (
    <div className="profile-screen">
      <div className="profile-header">
        <div className="profile-header__user-box">
          <div className="user-box__avatar-wrapper">
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/brade-profile.png`}
              alt="Brade Profile"
              className="user-box__avatar"
            />
          </div>
          <div className="user-box__user-info">
            <p className="user-box__user-welcome">Welcome,</p>
            <h2 className="user-box__user-name">Kiss G. Márton </h2>
            <hr className="user-box__user-rule" />
            <p className="user-box__user-email">theshade42@gmail.com</p>
          </div>
        </div>
        <div className="profile-header__title">
          <h1 className="profile-header__heading">{title}</h1>
          <p className="lead">{subtitle}</p>
        </div>
      </div>
      <div className="profile-main">
        <ProfileNavigation activeScreen={activeScreen} />
        {children}
      </div>
    </div>
  );
}

export default ProfileScreen;
