const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4">
      <div className="text-2xl font-bold">
        <span className="text-white">BAND</span>
        <span className="text-red-500">CONNECT</span>
      </div>
      <div className="flex gap-4">
        <button className="px-4 py-2 rounded-full border border-white/30 hover:bg-white/10 transition">
          Back to Home
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
