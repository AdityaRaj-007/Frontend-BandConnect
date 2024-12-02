import React from "react";
import { Bell, MessageCircle, User } from "lucide-react";
// import SearchBar from '../shared/SearchBar';
// import NotificationIcons from '../icons/NotificationIcons';

const HomeNavbar = () => {
  return (
    <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-white">BAND</span>
              <span className="text-purple-500">CONNECT</span>
            </span>
          </div>

          {/* <SearchBar />
          <NotificationIcons /> */}
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
