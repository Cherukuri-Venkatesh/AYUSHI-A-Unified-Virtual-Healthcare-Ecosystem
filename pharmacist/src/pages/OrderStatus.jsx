import React from "react";

const orders = [
  {
    id: 1,
    orderName: "Paracetamol 650mg Tablets",
    patientName: "Ravi Kumar",
    hospitalName: "Apollo Hospitals",
    doctorName: "Dr. Ramesh Kumar",
    date: "2025-11-06",
    time: "10:30 AM",
    status: "Delivered",
  },
  {
    id: 2,
    orderName: "Vitamin D3 Capsules",
    patientName: "Sita Devi",
    hospitalName: "Rainbow Diagnostics",
    doctorName: "Dr. Sneha Reddy",
    date: "2025-11-05",
    time: "02:45 PM",
    status: "Pending",
  },
  {
    id: 3,
    orderName: "Diabetes Test Kit",
    patientName: "Arjun Mehta",
    hospitalName: "KIMS Hospital",
    doctorName: "Dr. Kavya Sharma",
    date: "2025-11-04",
    time: "09:00 AM",
    status: "In Progress",
  },
  {
    id: 4,
    orderName: "Cough Syrup 100ml",
    patientName: "Nikhil Raj",
    hospitalName: "Yashoda Hospital",
    doctorName: "Dr. Priya Sharma",
    date: "2025-11-03",
    time: "11:15 AM",
    status: "Completed",
  },
];

const OrderStatus = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
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

  const getProgressPercentage = (status) => {
    switch (status) {
      case "Pending":
        return 25;
      case "In Progress":
        return 60;
      case "Completed":
      case "Delivered":
        return 100;
      default:
        return 0;
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case "Pending":
        return "#facc15";
      case "In Progress":
        return "#3b82f6";
      case "Completed":
      case "Delivered":
        return "#16a34a";
      default:
        return "#9ca3af";
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e6f7ff, #ffffff)",
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
          color: "#075985",
          marginBottom: "40px",
        }}
      >
        🚚 Order Status
      </h1>

      <div style={{ width: "90%", maxWidth: "900px" }}>
        {orders.map((o) => (
          <div
            key={o.id}
            style={{
              background: "#fff",
              borderRadius: "16px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              padding: "20px 25px",
              marginBottom: "25px",
            }}
          >
            {/* Header Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#222",
                }}
              >
                {o.orderName}
              </h2>
              <span
                style={{
                  ...getStatusColor(o.status),
                  padding: "4px 10px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {o.status}
              </span>
            </div>

            {/* Details */}
            <div style={{ fontSize: "14px", color: "#555" }}>
              <p>
                <strong>Patient:</strong> {o.patientName}
              </p>
              <p>
                <strong>Hospital:</strong> {o.hospitalName}
              </p>
              <p>
                <strong>Doctor:</strong> {o.doctorName}
              </p>
              <p>
                <strong>Date:</strong> {o.date}
              </p>
              <p>
                <strong>Time:</strong> {o.time}
              </p>
            </div>

            {/* Progress Bar */}
            <div style={{ marginTop: "20px" }}>
              <p
                style={{
                  fontSize: "13px",
                  color: "#333",
                  marginBottom: "6px",
                  fontWeight: "600",
                }}
              >
                Order Progress
              </p>
              <div
                style={{
                  background: "#e5e7eb",
                  height: "8px",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${getProgressPercentage(o.status)}%`,
                    background: getProgressColor(o.status),
                    height: "100%",
                    transition: "width 0.5s ease",
                  }}
                ></div>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginTop: "6px",
                }}
              >
                {getProgressPercentage(o.status)}% completed
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatus;
