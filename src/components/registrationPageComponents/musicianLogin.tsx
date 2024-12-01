import { User } from "lucide-react";

function Musician() {
  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-8 hover:transform hover:scale-105 transition duration-300 border border-white/10">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mb-6">
          <User size={40} />
        </div>
        <h2 className="text-2xl font-bold mb-4">Musician</h2>
        <p className="text-gray-300 mb-6">
          Join bands, showcase your talent, and connect with other musicians
        </p>
        <ul className="text-sm text-gray-300 mb-8 text-left">
          <li className="mb-2">✓ Create your musician profile</li>
          <li className="mb-2">✓ Upload performance samples</li>
          <li className="mb-2">✓ Find bands to join</li>
          <li className="mb-2">✓ Connect with other musicians</li>
        </ul>
        <button className="w-full bg-purple-600 hover:bg-red-500 text-white py-3 rounded-full transition duration-300 font-semibold">
          Register as Musician
        </button>
      </div>
    </div>
  );
}

export default Musician;
