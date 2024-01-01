import Home from './Home';
import Modal from './Modal';
import Sidebar from './Sidebar';

function Navbar() {
    return (
        <div className="navbar">
            <Home />
            <Modal />
            <Sidebar />
        </div>
    );
}

export default Navbar;
