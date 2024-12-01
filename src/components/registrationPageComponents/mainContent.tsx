import Musician from "./musicianLogin";
import Band from "./bandContent";
import Venue from "./venueContent";
import Login from "./loginSection";

const Main = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Join BandConnect</h1>
        <p className="text-xl text-gray-300">
          Choose how you want to be part of our music community
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <Musician />
        <Band />
        <Venue />
      </div>

      <Login />
    </div>
  );
};

export default Main;
