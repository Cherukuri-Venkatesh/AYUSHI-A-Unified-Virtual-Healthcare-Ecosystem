import React from "react";

const prescriptions = [
  {
    id: 1,
    prescriptionName: "General Checkup Prescription",
    patientName: "Ravi Kumar",
    hospitalName: "Apollo Hospitals",
    doctorName: "Dr. Ramesh Kumar",
    date: "2025-11-06",
    medicines: 3,
    status: "Reviewed",
  },
  {
    id: 2,
    prescriptionName: "Fever & Cold Prescription",
    patientName: "Sita Devi",
    hospitalName: "Rainbow Diagnostics",
    doctorName: "Dr. Sneha Reddy",
    date: "2025-11-05",
    medicines: 5,
    status: "Pending",
  },
  {
    id: 3,
    prescriptionName: "Diabetes Control Plan",
    patientName: "Arjun Mehta",
    hospitalName: "KIMS Hospital",
    doctorName: "Dr. Kavya Sharma",
    date: "2025-11-04",
    medicines: 2,
    status: "In Progress",
  },
  {
    id: 4,
    prescriptionName: "Vitamin Deficiency Prescription",
    patientName: "Nikhil Raj",
    hospitalName: "Yashoda Hospital",
    doctorName: "Dr. Priya Sharma",
    date: "2025-11-03",
    medicines: 4,
    status: "Completed",
  },
];

const Prescriptions = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Reviewed":
      case "Completed":
        return { backgroundColor: "#dcfce7", color: "#166534" };
      case "Pending":
        return { backgroundColor: "#fef9c3", color: "#854d0e" };
      case "In Progress":
        return { backgroundColor: "#dbeafe", color: "#1e3a8a" };
      default:
        return { backgroundColor: "#f3f4f6", color: "#111827" };
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff9e6, #ffffff)",
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "auto",
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "700",
          color: "#b45309",
          marginBottom: "40px",
        }}
      >
        📜 My Prescriptions
      </h1>

      <div style={{ width: "90%", maxWidth: "900px" }}>
        {prescriptions.map((p) => (
          <div
            key={p.id}
            style={{
              background: "#fff",
              borderRadius: "16px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              padding: "20px 25px",
              marginBottom: "25px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#222" }}>
                {p.prescriptionName}
              </h2>
              <span
                style={{
                  ...getStatusColor(p.status),
                  padding: "4px 10px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {p.status}
              </span>
            </div>

            <div style={{ fontSize: "14px", color: "#555" }}>
              <p><strong>Patient:</strong> {p.patientName}</p>
              <p><strong>Hospital:</strong> {p.hospitalName}</p>
              <p><strong>Doctor:</strong> {p.doctorName}</p>
              <p><strong>Date:</strong> {p.date}</p>
              <p><strong>Medicines:</strong> {p.medicines}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prescriptions;
