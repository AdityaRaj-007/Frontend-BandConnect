import Navbar from "../../components/registrationPageComponents/registrationNavbar";
import Main from "../../components/registrationPageComponents/mainContent";

function RegistrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 text-white">
      <Navbar />
      <Main />
    </div>
  );
}

export default RegistrationPage;
