import ProfileNavigation from "components/navigation/ProfileNavigation";

export default function ProfileScreen({
  activeScreen,
  title,
  subtitle,
  children,
}) {
  return (
    <div className="profile">
      <section className="profile-header">
        <div className="profile-intro">
          <div className="profile-intro__photo-wrapper">
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/brade-profile.png`}
              alt="Brade Profile"
              className="profile-intro__photo"
            />
          </div>
          <div className="profile-intro__text-wrapper">
            <p className="profile-intro__welcome">Welcome,</p>
            <h2 className="profile-intro__name">Kiss G. Márton </h2>
            <hr className="profile-intro__rule" />
            <p className="profile-intro__email">theshade42@gmail.com</p>
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
