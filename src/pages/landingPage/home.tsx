import React from "react";
import Header from "../../components/landingPageComponents/header";
import Main from "../../components/landingPageComponents/main";
import Footer from "../../components/landingPageComponents/footer";

const Home: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;
