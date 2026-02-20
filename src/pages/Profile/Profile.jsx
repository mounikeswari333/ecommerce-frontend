import { useAuth } from "../../context/AuthContext";
import PageTransition from "../../components/PageTransition/PageTransition";
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth();

  return (
    <PageTransition>
      <div className="profile-page">
        <h2>Profile</h2>
        <div className="profile-card">
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Role:</strong> {user?.role}
          </p>
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;
