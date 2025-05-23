import './Header.css';

function Header() {
  return (
    <header className="main-header">
      <nav className='content-nav'>
        <img className='logo' src="/logo.png" alt="Logo" />
        <a href="/">Dashmoney</a>
      </nav>
    </header>
  );
}

export default Header;