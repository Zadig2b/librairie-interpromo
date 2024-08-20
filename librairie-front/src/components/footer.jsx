// components/Footer.jsx
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 text-center text-md-left">
            <h5>About Us</h5>
            <p>
              We are a small bookstore dedicated to bringing you the best books at great prices.
            </p>
          </div>
          <div className="col-md-4 text-center">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/books" className="text-white">Books</a></li>
              <li><a href="/about" className="text-white">About</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-4 text-center text-md-right">
            <h5>Contact Us</h5>
            <p>
              Email: <a href="mailto:info@example.com" className="text-white">info@example.com</a>
            </p>
            <p>
              Phone: <a href="tel:+1234567890" className="text-white">+123 456 7890</a>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col text-center mt-4">
            <p>&copy; {new Date().getFullYear()} My Bookstore. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
