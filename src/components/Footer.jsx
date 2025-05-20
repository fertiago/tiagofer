import React from 'react';

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 w-full mt-auto">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by Tiago</p>
      </aside>
    </footer>
  );
};

export default Footer;
