import { useEffect, useState } from "react";

function OrganiserDashboard() {
  const [events, setEvents] = useState([]);

  const [title, setTitle] = useState("");
  const [college, setCollege] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [participantLimit, setParticipantLimit] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        const myEvents = data.filter(
          (event) => event.organiser?._id === user.id
        );
        setEvents(myEvents);
      });
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:5000/api/events/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          college,
          description,
          date,
          participantLimit
        })
      }
    );

    const data = await response.json();
    alert(data.message);

    setTitle("");
    setCollege("");
    setDescription("");
    setDate("");
    setParticipantLimit("");

    fetchEvents();
  };

  const handleDelete = async (eventId) => {
    await fetch(
      `http://localhost:5000/api/events/delete/${eventId}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    fetchEvents();
  };

  const handleApprove = async (eventId, studentId) => {
    await fetch("http://localhost:5000/api/events/approve", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ eventId, studentId })
    });

    fetchEvents();
  };

  const handleReject = async (eventId, studentId) => {
    await fetch("http://localhost:5000/api/events/reject", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ eventId, studentId })
    });

    fetchEvents();
  };

  const getBadge = (status) => {
    if (status === "approved")
      return <span className="badge bg-success">Approved</span>;

    if (status === "pending")
      return <span className="badge bg-warning text-dark">Pending</span>;

    if (status === "rejected")
      return <span className="badge bg-danger">Rejected</span>;
  };

  return (
    <div className="container mt-5">

      {/* ADD EVENT SECTION */}
      <div className="card shadow mb-5">
        <div className="card-body">
          <h4 className="mb-3">Add New Event</h4>

          <form onSubmit={handleAddEvent}>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Event Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="College Name"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-12">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Participant Limit"
                  value={participantLimit}
                  onChange={(e) => setParticipantLimit(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Add Event
            </button>
          </form>
        </div>
      </div>

      {/* EVENT LIST */}
      <div className="row">
        {events.length === 0 ? (
          <p className="text-center">No events created yet.</p>
        ) : (
          events.map((event) => {
            const approvedCount =
              event.registrations?.filter(
                (r) => r.status === "approved"
              ).length || 0;

            const percentage =
              (approvedCount / event.participantLimit) * 100;

            return (
              <div key={event._id} className="col-md-6 mb-4">
                <div className="card shadow h-100">
                  <div className="card-body">

                    <h5>{event.title}</h5>
                    <p><strong>College:</strong> {event.college}</p>

                    {/* Progress Bar */}
                    <div className="progress mb-3">
                      <div
                        className="progress-bar bg-success"
                        style={{ width: `${percentage}%` }}
                      >
                        {approvedCount} / {event.participantLimit}
                      </div>
                    </div>

                    <button
                      className="btn btn-danger btn-sm mb-3"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete Event
                    </button>

                    <h6>Registrations</h6>

                    {event.registrations?.length === 0 ? (
                      <p>No registrations yet.</p>
                    ) : (
                      event.registrations.map((reg, index) => (
                        <div key={index} className="border p-2 mb-2 rounded">

                          <p className="mb-1">
                            <strong>{reg.student?.name}</strong>
                          </p>

                          {getBadge(reg.status)}

                          {reg.status === "pending" && (
                            <div className="mt-2">
                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() =>
                                  handleApprove(event._id, reg.student._id)
                                }
                              >
                                Approve
                              </button>

                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={() =>
                                  handleReject(event._id, reg.student._id)
                                }
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    )}

                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default OrganiserDashboard;