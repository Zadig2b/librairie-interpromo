// components/Footer.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" text-white py-4" style={{ backgroundColor: "#A79A9C" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 text-center mt-1">
            <img
              src="../../asset/logo/blanc/logo-transparent-png.png"
              alt="Logo de la librairie"
              className="footer-logo"
              style={{ width: "250px"}}
            />
            <div className="d-flex justify-content-md-center ">
              <Link
                href="https://twitter.com"
                target="_blank"
                className="navbar-brand d-flex align-items-center"
              >
                <Image
                  src="/asset/Icones/réseaux/x-twitter-brands-solid.svg"
                  alt="Logo"
                  width={30}
                  height={30}
                  className="me-2"
                  style={{ marginTop: "5px", color: "pink" }}
                />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="navbar-brand d-flex align-items-center"
              >
                <Image
                  src="/asset/Icones/réseaux/instagram-brands-solid.svg"
                  alt="Logo"
                  width={30}
                  height={30}
                  className="me-2"
                  style={{ marginTop: "5px", color: "pink" }}
                />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                className="navbar-brand d-flex align-items-center"
              >
                <Image
                  src="/asset/Icones/réseaux/facebook-brands-solid.svg"
                  alt="Logo"
                  width={30}
                  height={30}
                  className="me-2"
                />
              </Link>
            </div>
          </div>
          <div className="col-md-4 text-center mt-3 text-md-right">
            <h6>Contact</h6>
            <p>
              <a
                href="https://www.google.fr/maps/place/44+Rue+du+G%C3%A9n%C3%A9ral+de+Gaulle,+38520+Le+Bourg-d'Oisans/@45.0546229,6.0318106,17z/data=!4m6!3m5!1s0x478a6c1cef23ade9:0x7260d683bb170543!8m2!3d45.0546229!4d6.0318106!16s%2Fg%2F11c1z54pdn?entry=ttu&g_ep=EgoyMDI0MDgyMy4wIKXMDSoASAFQAw%3D%3D"
                className="text-white"
                style={{ textDecoration: "none" }}
                target="_blank">
                44 Rue du Général de Gaulle,
                <br />
                38520 Le Bourg-d'Oisans
                <br />
                04 76 80 08 47
              </a>
            </p>
          </div>
          <div className="col-md-4 text-center mt-4">
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white" style={{ textDecoration: "none" }}>
                  Accueil
                </a>
              </li>
              <li>
                <a href="/books" className="text-white" style={{ textDecoration: "none" }}>
                  Nos Livres
                </a>
              </li>
              <li>
                <a href="/about" className="text-white" style={{ textDecoration: "none" }}>
                  {" "}
                  À Propos
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white" style={{ textDecoration: "none" }}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
