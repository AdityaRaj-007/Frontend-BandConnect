import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer>
      <p>&copy; 2024 BandConnect. All rights reserved.</p>
      <ul className="footer-links">
        <li>
          <a href="#">Privacy Policy</a>
        </li>
        <li>
          <a href="#">Terms of Service</a>
        </li>
        <li>
          <a href="#">Contact Us</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
