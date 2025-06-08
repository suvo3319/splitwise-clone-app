import logo from '../assets/logo.png'

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
        <div className="flex items-center gap-3">
            <img src={logo} alt='logo' className='w-8 h-8' />
            <span className='text-xl font-semibold italic'>Splitwise</span>
        </div>
        <ul className="flex space-x-4">
            <li>
                <a href="/" className="hover:text-blue-300">Home</a>
            </li>
            <li>
                <a href="/" className="hover:text-blue-300">About</a>
            </li>
            <li>
                <a href="/" className="hover:text-blue-300">Contact</a>
            </li>
            <li>
                <a href="/" className="hover:text-blue-300">Login</a>
            </li>
            <li>
                <a href="/" className="hover:text-blue-300">Sign Up</a>
            </li>
        </ul>
    </nav>
  );
}