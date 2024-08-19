// src/app/page.js
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

export default function Home() {
  return (
    <div className="container mt-5">
      <header className="text-center mb-5">
        <h1>Welcome to Our Online Bookstore</h1>
        <p className="lead">Find and reserve your favorite books online</p>
      </header>

      <div id="carouselExampleIndicators" className="carousel slide mb-5" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Image src="/carousel1.jpg" className="d-block w-100" alt="First slide" width={800} height={400} />
          </div>
          <div className="carousel-item">
            <Image src="/carousel2.jpg" className="d-block w-100" alt="Second slide" width={800} height={400} />
          </div>
          <div className="carousel-item">
            <Image src="/carousel3.jpg" className="d-block w-100" alt="Third slide" width={800} height={400} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <section className="mb-5">
        <h2 className="mb-4">New Arrivals</h2>
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <Image src="/book1.jpg" className="card-img-top" alt="Book 1" width={200} height={300} />
              <div className="card-body">
                <h5 className="card-title">Book Title 1</h5>
                <p className="card-text">Author 1</p>
                <a href="#" className="btn btn-primary">View Details</a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <Image src="/book2.jpg" className="card-img-top" alt="Book 2" width={200} height={300} />
              <div className="card-body">
                <h5 className="card-title">Book Title 2</h5>
                <p className="card-text">Author 2</p>
                <a href="#" className="btn btn-primary">View Details</a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <Image src="/book3.jpg" className="card-img-top" alt="Book 3" width={200} height={300} />
              <div className="card-body">
                <h5 className="card-title">Book Title 3</h5>
                <p className="card-text">Author 3</p>
                <a href="#" className="btn btn-primary">View Details</a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <Image src="/book4.jpg" className="card-img-top" alt="Book 4" width={200} height={300} />
              <div className="card-body">
                <h5 className="card-title">Book Title 4</h5>
                <p className="card-text">Author 4</p>
                <a href="#" className="btn btn-primary">View Details</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4">Categories</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card bg-light text-center p-3">
              <h5 className="card-title">Fantasy</h5>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-light text-center p-3">
              <h5 className="card-title">Science Fiction</h5>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-light text-center p-3">
              <h5 className="card-title">Mystery</h5>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
