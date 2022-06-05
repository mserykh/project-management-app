import rss_logo from '../../assets/images/rss_logo.svg';
import github from '../../assets/images/github.svg';

function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer-container">
        <span>© {new Date().getFullYear()} Copyright</span>
        <ul className="flex flex-col items-center l:flex-row gap-x-6 gap-y-4">
          <li className="filter-hover filter-hover--violet">
            <a href="https://github.com/ssmangilev" className="flex items-center gap-3">
              <img src={github} alt="" />
              <span className="sr-only">GitHub</span>
              <span className="whitespace-nowrap">Sergei Mangilev</span>
            </a>
          </li>
          <li className="filter-hover filter-hover--violet">
            <a href="https://github.com/mserykh" className="flex items-center gap-3">
              <img src={github} alt="" />
              <span className="sr-only">GitHub</span>
              <span className="whitespace-nowrap">Marie Serykh</span>
            </a>
          </li>
          <li className="filter-hover filter-hover--violet">
            <a href="https://github.com/muhammed03" className="flex items-center gap-3">
              <img src={github} alt="" />
              <span className="sr-only">GitHub</span>
              <span className="xs:whitespace-nowrap">Muhammed Abdrahman</span>
            </a>
          </li>
        </ul>
        <div className="filter-hover filter-hover--violet">
          <a href="https://rs.school/react">
            <img src={rss_logo} alt="Rolling Scopes School logo" />
          </a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
