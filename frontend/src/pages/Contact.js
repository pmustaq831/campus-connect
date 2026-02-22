import React from "react";

function Contact() {
  return (
    <div>

      {/* HERO SECTION */}
      <div className="bg-dark text-white py-5">
        <div className="container text-center">
          <h1 className="fw-bold">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="mt-3">
            Have questions or suggestions? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="container py-5">

        <div className="row g-5">

          {/* CONTACT FORM */}
          <div className="col-md-7">
            <div className="card shadow border-0">
              <div className="card-body">
                <h4 className="mb-4 text-dark">Send a Message</h4>

                <form>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="col-md-5">
            <div className="card shadow border-0 bg-light">
              <div className="card-body">
                <h4 className="mb-4 text-dark">Contact Information</h4>

                <p>
                  <strong className="text-primary">Email:</strong><br />
                  support@campusconnect.com
                </p>

                <p>
                  <strong className="text-primary">Phone:</strong><br />
                  +91 98765 43210
                </p>

                <p>
                  <strong className="text-danger">Location:</strong><br />
                  Hyderabad, Telangana, India
                </p>

                <hr />

                <p className="text-muted">
                  Our team typically responds within 24 hours.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Contact;