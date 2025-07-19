import { useState } from "react";
import axios from "axios";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a BVN or Phone Number");
      return;
    }

    setLoading(true);

    try {
      let params = {};

      if (/^\d{11}$/.test(query)) {
        if (query.startsWith("0")) {
          params = { phone: query };
        } else {
          params = { bvn: query };
        }
      } else if (/^\d{10}$/.test(query)) {
        params = { phone: query };
      } else if (/^\d+$/.test(query)) {
        params = { phone: query };
      } else {
        setError("Please enter a valid BVN (11 digits) or Phone Number");
        setLoading(false);
        return;
      }

      const res = await axios.get(`http://localhost:8080/customer/search`, {
        params,
      });

      if (res.data) {
        setCustomer(res.data);
        setError("");
      } else {
        setCustomer(null);
        setError("Customer not found");
      }
    } catch (err) {
      console.error("Error:", err);
      setCustomer(null);

      if (err.response) {
        setError(
          err.response.data?.message ||
            "Customer not found. Please check your BVN or Phone Number and try again."
        );
      } else if (err.request) {
        setError("Server not responding. Please try again later.");
      } else {
        setError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            {/* Header Card */}
            <div
              className="card border-0 shadow-lg mb-4"
              style={{
                borderRadius: "20px",
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="card-body text-center py-5">
                <div className="mb-4">
                  <div
                    className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle shadow-lg"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <svg
                      width="40"
                      height="40"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                </div>
                <h6 className="fw-bold text-dark mb-2">
                  Welcome to Bank Insight
                </h6>
                <h2 className="fw-bold text-dark mb-2">Customer Search</h2>
                <p className="text-muted mb-0">
                  Enter BVN or Phone Number to find customer details
                </p>
              </div>
            </div>

            {/* Search Card */}
            <div
              className="card border-0 shadow-lg mb-4"
              style={{
                borderRadius: "20px",
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="card-body p-4">
                <div className="row g-3">
                  <div className="col-12">
                    <div className="position-relative">
                      <input
                        className="form-control form-control-lg border-0 shadow-sm"
                        style={{
                          borderRadius: "15px",
                          paddingLeft: "50px",
                          paddingRight: "20px",
                          background: "#f8f9fa",
                          fontSize: "16px",
                        }}
                        type="text"
                        placeholder="Enter BVN (11 digits) or Phone Number"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                      <div className="position-absolute top-50 start-0 translate-middle-y ms-3">
                        <svg
                          width="20"
                          height="20"
                          fill="#6c757d"
                          viewBox="0 0 24 24"
                        >
                          <path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary btn-lg w-100 shadow-sm"
                      style={{ borderRadius: "15px", padding: "12px" }}
                      onClick={handleSearch}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Searching...
                        </>
                      ) : (
                        <>
                          <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="me-2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                          </svg>
                          Search Customer
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <div
                className="alert alert-danger border-0 shadow-sm mb-4"
                style={{
                  borderRadius: "15px",
                  background: "rgba(220, 53, 69, 0.1)",
                  border: "1px solid rgba(220, 53, 69, 0.2)",
                }}
              >
                <div className="d-flex align-items-center">
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="me-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {/* Customer Details Card */}
            {customer && (
              <div
                className="card border-0 shadow-lg"
                style={{
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                  animation: "fadeIn 0.5s ease-in",
                }}
              >
                <div className="card-body p-4">
                  {/* Customer Header */}
                  <div
                    className="text-center mb-4 pb-4"
                    style={{ borderBottom: "2px solid #f8f9fa" }}
                  >
                    <div
                      className="d-inline-flex align-items-center justify-content-center bg-success rounded-circle shadow mb-3"
                      style={{ width: "60px", height: "60px" }}
                    >
                      <svg
                        width="30"
                        height="30"
                        fill="white"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <h4 className="fw-bold text-dark mb-1">
                      {customer.firstName} {customer.lastName}
                    </h4>
                    <span
                      className={`badge ${
                        customer.status === "Active"
                          ? "bg-success"
                          : "bg-warning"
                      } px-3 py-2`}
                      style={{ borderRadius: "10px" }}
                    >
                      {customer.status}
                    </span>
                  </div>

                  {/* Customer Details Grid */}
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div
                        className="p-3 rounded-3"
                        style={{ background: "#f8f9fa" }}
                      >
                        <div className="d-flex align-items-center mb-2">
                          <svg
                            width="18"
                            height="18"
                            fill="#6c757d"
                            className="me-2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                          </svg>
                          <small className="text-muted fw-semibold">BVN</small>
                        </div>
                        <p className="mb-0 fw-bold text-dark">{customer.bvn}</p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div
                        className="p-3 rounded-3"
                        style={{ background: "#f8f9fa" }}
                      >
                        <div className="d-flex align-items-center mb-2">
                          <svg
                            width="18"
                            height="18"
                            fill="#6c757d"
                            className="me-2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                          </svg>
                          <small className="text-muted fw-semibold">
                            Phone
                          </small>
                        </div>
                        <p className="mb-0 fw-bold text-dark">
                          {customer.phoneNumber}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div
                        className="p-3 rounded-3"
                        style={{ background: "#f8f9fa" }}
                      >
                        <div className="d-flex align-items-center mb-2">
                          <svg
                            width="18"
                            height="18"
                            fill="#6c757d"
                            className="me-2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                          </svg>
                          <small className="text-muted fw-semibold">
                            Email
                          </small>
                        </div>
                        <p
                          className="mb-0 fw-bold text-dark"
                          style={{ fontSize: "14px" }}
                        >
                          {customer.email}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div
                        className="p-3 rounded-3"
                        style={{ background: "#f8f9fa" }}
                      >
                        <div className="d-flex align-items-center mb-2">
                          <svg
                            width="18"
                            height="18"
                            fill="#6c757d"
                            className="me-2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
                          </svg>
                          <small className="text-muted fw-semibold">
                            Gender
                          </small>
                        </div>
                        <p className="mb-0 fw-bold text-dark">
                          {customer.gender}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div
                        className="p-3 rounded-3"
                        style={{ background: "#f8f9fa" }}
                      >
                        <div className="d-flex align-items-center mb-2">
                          <svg
                            width="18"
                            height="18"
                            fill="#6c757d"
                            className="me-2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                          </svg>
                          <small className="text-muted fw-semibold">
                            Date of Birth
                          </small>
                        </div>
                        <p className="mb-0 fw-bold text-dark">
                          {customer.dateOfBirth}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div
                        className="p-3 rounded-3"
                        style={{ background: "#f8f9fa" }}
                      >
                        <div className="d-flex align-items-center mb-2">
                          <svg
                            width="18"
                            height="18"
                            fill="#6c757d"
                            className="me-2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                          <small className="text-muted fw-semibold">
                            Account Type
                          </small>
                        </div>
                        <p className="mb-0 fw-bold text-dark">
                          {customer.accountType}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="p-3 rounded-3"
                        style={{ background: "#f8f9fa" }}
                      >
                        <div className="d-flex align-items-center mb-2">
                          <svg
                            width="18"
                            height="18"
                            fill="#6c757d"
                            className="me-2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                          </svg>
                          <small className="text-muted fw-semibold">
                            Address
                          </small>
                        </div>
                        <p className="mb-0 fw-bold text-dark">
                          {customer.address}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="p-3 rounded-3"
                        style={{ background: "#f8f9fa" }}
                      >
                        <div className="d-flex align-items-center mb-2">
                          <svg
                            width="18"
                            height="18"
                            fill="#6c757d"
                            className="me-2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                          </svg>
                          <small className="text-muted fw-semibold">
                            Account Opened
                          </small>
                        </div>
                        <p className="mb-0 fw-bold text-dark">
                          {new Date(customer.accountOpenedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Balance Section */}
                  <div
                    className="mt-4 pt-4"
                    style={{ borderTop: "2px solid #f8f9fa" }}
                  >
                    <div
                      className="p-4 rounded-3 text-center"
                      style={{
                        background:
                          "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                      }}
                    >
                      <h6 className="text-white mb-2 fw-semibold">
                        Account Balance
                      </h6>
                      <h3 className="text-white fw-bold mb-0">
                        ₦{customer.balance.toLocaleString()}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card:hover {
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }

        .btn:hover {
          transform: translateY(-1px);
          transition: all 0.2s ease;
        }

        input:focus {
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25) !important;
          border-color: #667eea !important;
        }

        @media (max-width: 768px) {
          .container {
            padding-left: 15px;
            padding-right: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchForm;
