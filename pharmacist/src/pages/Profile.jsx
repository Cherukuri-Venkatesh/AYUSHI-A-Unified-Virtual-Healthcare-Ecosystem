import React from "react";

const Profile = () => {
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
        👤 My Profile
      </h1>

      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          padding: "30px 40px",
          width: "90%",
          maxWidth: "700px",
        }}
      >
        {/* Profile Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "25px",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #b45309, #f59e0b)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              color: "#fff",
              fontWeight: "700",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              marginBottom: "10px",
            }}
          >
            V
          </div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#222",
              marginBottom: "4px",
            }}
          >
            Venkatesh Cherukuri
          </h2>
          <p style={{ color: "#555", fontSize: "14px" }}>
            Pharmacist, KL University
          </p>
        </div>

        {/* Info Section */}
        <div style={{ fontSize: "15px", color: "#333" }}>
          <div style={styles.row}>
            <strong style={styles.label}>Email:</strong>
            <span style={styles.value}>venkapharma123@gmail.com</span>
          </div>
          <div style={styles.row}>
            <strong style={styles.label}>Phone:</strong>
            <span style={styles.value}>+91 9876543210</span>
          </div>
          <div style={styles.row}>
            <strong style={styles.label}>Hospital / Pharmacy:</strong>
            <span style={styles.value}>Apollo Pharmacy</span>
          </div>
          <div style={styles.row}>
            <strong style={styles.label}>Location:</strong>
            <span style={styles.value}>Vijayawada, Andhra Pradesh</span>
          </div>
          <div style={styles.row}>
            <strong style={styles.label}>Experience:</strong>
            <span style={styles.value}>2+ Years</span>
          </div>
          <div style={styles.row}>
            <strong style={styles.label}>Specialization:</strong>
            <span style={styles.value}>Clinical Pharmacology</span>
          </div>
        </div>

        {/* Buttons Section */}
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <button
            style={{
              backgroundColor: "#2563eb",
              color: "#fff",
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1e40af")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
          >
            Edit Profile
          </button>

          <button
            style={{
              backgroundColor: "#ef4444",
              color: "#fff",
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#b91c1c")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ef4444")}
          >
            Logout
          </button>
        </div>
      </div>

      <p
        style={{
          textAlign: "center",
          color: "#555",
          marginTop: "30px",
          fontSize: "14px",
        }}
      >
        Profile details are secure and private.
      </p>
    </div>
  );
};

// Inline row style
const styles = {
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #eee",
  },
  label: {
    color: "#444",
    fontWeight: "600",
  },
  value: {
    color: "#555",
  },
};

export default Profile;
