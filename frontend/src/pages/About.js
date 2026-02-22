import React from "react";

function About() {
  return (
    <div>

      {/* HERO SECTION */}
      <div className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="fw-bold">About Campus Connect</h1>
          <p className="lead">
            Connecting students with opportunities across colleges 🚀
          </p>
        </div>
      </div>

      <div className="container py-5">

        {/* INTRO */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-10">
            <div className="card shadow border-0 bg-light">
              <div className="card-body text-center">
                <p className="mb-0 fs-5">
                  Campus Connect is a platform designed to connect students with
                  hackathons, workshops, and technical events across colleges.
                  It simplifies event discovery, registration, and approval
                  for both students and organisers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <h3 className="text-center text-success mb-4">✨ Key Features</h3>

        <div className="row mb-5">

          <div className="col-md-4 mb-3">
            <div className="card h-100 shadow border-0 bg-warning-subtle">
              <div className="card-body text-center">
                <h5 className="card-title">🔐 Role-Based Access</h5>
                <p className="card-text">
                  Separate dashboards for students and organisers with secure authentication.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card h-100 shadow border-0 bg-info-subtle">
              <div className="card-body text-center">
                <h5 className="card-title">📝 Event Management</h5>
                <p className="card-text">
                  Organisers can create, approve, and manage events efficiently.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card h-100 shadow border-0 bg-success-subtle">
              <div className="card-body text-center">
                <h5 className="card-title">✅ Approval Workflow</h5>
                <p className="card-text">
                  Students register for events and organisers control approvals.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* TECH STACK */}
        <h3 className="text-center text-primary mb-4">🛠 Technologies Used</h3>

        <ul className="list-group mb-5 shadow">
          <li className="list-group-item list-group-item-primary">⚛ React.js (Frontend)</li>
          <li className="list-group-item list-group-item-success">🟢 Node.js & Express.js (Backend)</li>
          <li className="list-group-item list-group-item-warning">🍃 MongoDB Atlas (Database)</li>
          <li className="list-group-item list-group-item-info">🔑 JWT Authentication</li>
          <li className="list-group-item list-group-item-danger">🎨 Bootstrap (UI Styling)</li>
        </ul>

        {/* FUTURE SCOPE */}
        <h3 className="text-center text-danger mb-4">🚀 Future Enhancements</h3>

        <div className="card shadow border-0 bg-light">
          <div className="card-body">
            <ul className="mb-0">
              <li>Event image uploads</li>
              <li>Email notifications</li>
              <li>Search and filter system</li>
              <li>Admin analytics dashboard</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;