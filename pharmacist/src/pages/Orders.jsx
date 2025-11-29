import React from "react";

const orders = [
  {
    id: 1,
    medicineName: "Paracetamol 650mg Tablets",
    quantity: 2,
    price: "₹120",
    hospitalName: "Apollo Hospitals",
    doctorName: "Dr. Ramesh Kumar",
    date: "2025-11-06",
    time: "10:30 AM",
    status: "Delivered",
  },
  {
    id: 2,
    medicineName: "Amoxicillin 500mg Capsules",
    quantity: 1,
    price: "₹240",
    hospitalName: "Rainbow Diagnostics",
    doctorName: "Dr. Sneha Reddy",
    date: "2025-11-05",
    time: "02:45 PM",
    status: "Pending",
  },
  {
    id: 3,
    medicineName: "Azithromycin 250mg Tablets",
    quantity: 1,
    price: "₹180",
    hospitalName: "KIMS Hospital",
    doctorName: "Dr. Arjun Mehta",
    date: "2025-11-04",
    time: "09:00 AM",
    status: "In Progress",
  },
  {
    id: 4,
    medicineName: "Vitamin C Chewable Tablets",
    quantity: 3,
    price: "₹150",
    hospitalName: "Yashoda Hospital",
    doctorName: "Dr. Priya Sharma",
    date: "2025-11-03",
    time: "11:15 AM",
    status: "Completed",
  },
];

const Orders = () => {
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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eaf4ff, #ffffff)",
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
          color: "#1e40af",
          marginBottom: "40px",
        }}
      >
        💊 My Medicine Orders
      </h1>

      <div style={{ width: "90%", maxWidth: "900px" }}>
        {orders.map((order) => (
          <div
            key={order.id}
            style={{
              background: "#fff",
              borderRadius: "16px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              padding: "20px 25px",
              marginBottom: "25px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
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
                {order.medicineName}
              </h2>
              <span
                style={{
                  ...getStatusColor(order.status),
                  padding: "4px 10px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: "600",
                  textTransform: "capitalize",
                }}
              >
                {order.status}
              </span>
            </div>

            <div style={{ fontSize: "14px", color: "#555" }}>
              <p><strong>Hospital:</strong> {order.hospitalName}</p>
              <p><strong>Doctor:</strong> {order.doctorName}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Price:</strong> {order.price}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Time:</strong> {order.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
