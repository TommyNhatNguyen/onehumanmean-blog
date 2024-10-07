import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-[32px] flex flex-col items-center gap-[14px] bg-gray-200 px-container py-[30px] mobile:flex-row dark:bg-gray-100">
      <span className="text-lg text-black-100 dark:text-white">
        © 2024 Tommy nguyen
      </span>
      <ul className="flex flex-col items-center gap-[14px] mobile:flex-row">
        <li>
          <Link
            target="_blank"
            className="text-lg text-black-100 dark:text-white"
            to="https://www.linkedin.com/in/nhat-nguyen-683970188/"
          >
            LinkedIn
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            className="text-lg text-black-100 dark:text-white"
            to="https://github.com/TommyNhatNguyen"
          >
            Github
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
