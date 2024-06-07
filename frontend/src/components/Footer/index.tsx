function Footer() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 fixed-bottom footer-config bg-body-tertiary">
      <p className="col-md-4 mb-0 text-body-secondary">
        &copy; 2024 Keep Coding, Inc
      </p>

      <a
        href="/"
        className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <img className="bi me-2" height="25" src="/logo_dark.png" />
      </a>

      <ul className="nav col-md-4 justify-content-end">
        <li className="nav-item">
          <a href="/" className="nav-link px-2 text-body-secondary">
            Incio
          </a>
        </li>
        <li className="nav-item">
          <a href="/Courses" className="nav-link px-2 text-body-secondary">
            Cursos
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
