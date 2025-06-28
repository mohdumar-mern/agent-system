import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 border-t w-full">
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} MERN Agent System. All rights reserved.
      </p>
      <div className="flex gap-4 mt-4 md:mt-0 text-sm">
        <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
        <a href="#" className="hover:text-blue-600 transition">Terms of Use</a>
        <a href="mailto:support@example.com" className="hover:text-blue-600 transition">Contact</a>
      </div>
    </div>
  </footer>
  
  );
};

export default Footer;
