import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  }, []);

  const handleRegister = async (eventId) => {
    if (!token) {
      alert("Please login first.");
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/events/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          eventId,
          teamName,
          teamMembers,
          collegeName,
          yearOfStudy
        })
      }
    );

    const data = await response.json();
    alert(data.message);

    setSelectedEventId(null);
    setTeamName("");
    setTeamMembers("");
    setCollegeName("");
    setYearOfStudy("");
  };

  return (
    <div>

      {/* COMPACT HERO SECTION */}
      <div className="bg-light py-4 mb-4">
        <div className="container text-center">
          <h2 className="fw-bold mb-2">Campus Connect</h2>

          <p className="text-muted mb-3">
            Discover hackathons, workshops & tech events.
          </p>

          {!token ? (
            <Link to="/login" className="btn btn-primary btn-sm">
              Get Started
            </Link>
          ) : (
            <Link to="/" className="btn btn-outline-primary btn-sm">
              Explore Events
            </Link>
          )}
        </div>
      </div>

      {/* EVENTS SECTION */}
      <div className="container">
        <h4 className="text-center mb-4">Available Events</h4>

        <div className="row">
          {events.length === 0 ? (
            <p className="text-center">No events available.</p>
          ) : (
            events.map((event) => {
              const approvedCount =
                event.registrations?.filter(
                  (r) => r.status === "approved"
                ).length || 0;

              return (
                <div key={event._id} className="col-md-4 mb-4">
                  <div className="card shadow h-100">
                    <div className="card-body d-flex flex-column">

                      <h5 className="card-title">{event.title}</h5>

                      <p className="card-text">
                        <strong>College:</strong> {event.college}
                      </p>

                      <p className="card-text">
                        <strong>Date:</strong>{" "}
                        {new Date(event.date).toLocaleDateString()}
                      </p>

                      <span className="badge bg-success mb-3">
                        {approvedCount} / {event.participantLimit} Approved
                      </span>

                      {/* REGISTER SECTION */}

                      {!token && (
                        <div className="alert alert-warning text-center mt-auto p-2">
                          🔐 Login to register
                        </div>
                      )}

                      {user?.role === "student" && (
                        <>
                          {selectedEventId === event._id ? (
                            <div className="mt-auto">

                              <input
                                className="form-control mb-2"
                                placeholder="Team Name"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                              />

                              <input
                                className="form-control mb-2"
                                placeholder="Team Members"
                                value={teamMembers}
                                onChange={(e) => setTeamMembers(e.target.value)}
                              />

                              <input
                                className="form-control mb-2"
                                placeholder="College Name"
                                value={collegeName}
                                onChange={(e) => setCollegeName(e.target.value)}
                              />

                              <input
                                className="form-control mb-2"
                                placeholder="Year of Study"
                                value={yearOfStudy}
                                onChange={(e) => setYearOfStudy(e.target.value)}
                              />

                              <button
                                className="btn btn-primary w-100"
                                onClick={() => handleRegister(event._id)}
                              >
                                Submit Registration
                              </button>
                            </div>
                          ) : (
                            <button
                              className="btn btn-outline-primary w-100 mt-auto"
                              onClick={() => setSelectedEventId(event._id)}
                            >
                              Register
                            </button>
                          )}
                        </>
                      )}

                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}

export default Home;