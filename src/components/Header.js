import logo from './logo192.png';

const Header = () => {
  return (
    <div className="d-flex align-items-center mb-4">
      <img src={logo} alt="logo" className="me-3" style={{ height: '50px' }} />
      <h2 className="mb-0">The React Quiz</h2>
    </div>
  );
};

export default Header;
