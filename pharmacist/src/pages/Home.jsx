import React from "react";
import {
  FaPrescriptionBottleAlt,
  FaClipboardList,
  FaShippingFast,
  FaUserCircle,
} from "react-icons/fa";

const Home = () => {
  return (
    <div style={styles.container}>
      {/* Background Gradient */}
      <div style={styles.overlay}></div>

      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.title}>💊 Pharmacist Dashboard</h1>
        <p style={styles.subtitle}>
          Manage <strong>Prescriptions</strong>, <strong>Orders</strong>, and{" "}
          <strong>Deliveries</strong> — all in one organized workspace.
        </p>
      </div>

      {/* Features Section */}
      <div style={styles.featuresContainer}>
        <div
          style={{ ...styles.card, borderTop: "4px solid #3b82f6" }}
          onMouseOver={(e) => handleHover(e)}
          onMouseOut={(e) => handleLeave(e)}
        >
          <FaPrescriptionBottleAlt style={{ ...styles.icon, color: "#3b82f6" }} />
          <h3 style={styles.cardTitle}>E-Prescriptions</h3>
          <p style={styles.cardText}>
            View and verify doctor-issued prescriptions instantly.
          </p>
        </div>

        <div
          style={{ ...styles.card, borderTop: "4px solid #22c55e" }}
          onMouseOver={(e) => handleHover(e)}
          onMouseOut={(e) => handleLeave(e)}
        >
          <FaClipboardList style={{ ...styles.icon, color: "#22c55e" }} />
          <h3 style={styles.cardTitle}>Orders Management</h3>
          <p style={styles.cardText}>
            Track, prepare, and manage medicine orders efficiently.
          </p>
        </div>

        <div
          style={{ ...styles.card, borderTop: "4px solid #f97316" }}
          onMouseOver={(e) => handleHover(e)}
          onMouseOut={(e) => handleLeave(e)}
        >
          <FaShippingFast style={{ ...styles.icon, color: "#f97316" }} />
          <h3 style={styles.cardTitle}>Order Status</h3>
          <p style={styles.cardText}>
            Monitor live delivery progress and update order statuses.
          </p>
        </div>

        <div
          style={{ ...styles.card, borderTop: "4px solid #a855f7" }}
          onMouseOver={(e) => handleHover(e)}
          onMouseOut={(e) => handleLeave(e)}
        >
          <FaUserCircle style={{ ...styles.icon, color: "#a855f7" }} />
          <h3 style={styles.cardTitle}>Profile</h3>
          <p style={styles.cardText}>
            Manage your pharmacist profile and contact information.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={styles.footerText}>
          Empowering <strong>Healthcare Digitally</strong> 🚀
        </p>
      </div>
    </div>
  );
};

// Hover Handlers
const handleHover = (e) => {
  e.currentTarget.style.transform = "translateY(-6px)";
  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
};

const handleLeave = (e) => {
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.08)";
};

// Inline Styles
const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    overflowY: "auto",
    background: "linear-gradient(135deg, #fff9e6, #ffffff)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    color: "#0f172a",
    padding: "40px 20px",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at 20% 20%, rgba(255,223,186,0.25), transparent 50%), radial-gradient(circle at 80% 80%, rgba(186,230,253,0.25), transparent 50%)",
    zIndex: 0,
  },
  header: {
    zIndex: 2,
    marginBottom: "50px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#b45309",
    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#555",
    maxWidth: "700px",
    margin: "0 auto",
    lineHeight: "1.6",
  },
  featuresContainer: {
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "25px",
    maxWidth: "1000px",
  },
  card: {
    flex: "1 1 40%",
    minWidth: "250px",
    maxWidth: "280px",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    padding: "25px 20px",
    textAlign: "center",
    transition: "transform 0.4s ease, box-shadow 0.4s ease",
    cursor: "pointer",
  },
  icon: {
    fontSize: "55px",
    marginBottom: "10px",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "8px",
  },
  cardText: {
    fontSize: "14px",
    color: "#475569",
    lineHeight: "1.6",
  },
  footer: {
    zIndex: 2,
    marginTop: "50px",
  },
  footerText: {
    fontSize: "14px",
    color: "#555",
  },
};

export default Home;
