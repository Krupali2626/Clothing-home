import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhoneAlt,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebookF,
  FaCheckCircle,
} from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [mode, setMode] = useState("login"); // "login" | "register" | "forgot"
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [regForm, setRegForm] = useState({ name: "", email: "", phone: "", password: "", agree: false });
  const [forgotEmail, setForgotEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!loginForm.email.trim()) errs.email = "Email is required";
    if (!loginForm.password) errs.password = "Password is required";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const handleRegSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!regForm.name.trim()) errs.name = "Name is required";
    if (!regForm.email.trim()) errs.email = "Email is required";
    if (!regForm.password || regForm.password.length < 8) errs.password = "Min 8 characters";
    if (!regForm.agree) errs.agree = "You must agree to the terms";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setSubmitted(false);
    setErrors({});
    setForgotEmail("");
    setShowPassword(false);
    setLoginForm({ email: "", password: "" });
    setRegForm({ name: "", email: "", phone: "", password: "", agree: false })
    setForgotEmail("");
  }

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) { setErrors({ forgot: "Enter your email" }); return; }
    setSubmitted(true);
  };

  return (
    <div className="d_login_page">
      <Row className="g-0 min-vh-100">
        {/* Left panel — brand visual */}
        <Col lg={6} className="d-none d-lg-block">
          <div
            className="d_login_visual"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&h=1200&fit=crop&auto=format)",
            }}
          >
            <div className="d_login_visual_overlay" />
            <div className="d_login_visual_content">
              <Link to="/" className="d_logo d_login_logo">
                <span className="d_logo_mark">D</span>
                <span className="d_logo_text">.Store</span>
              </Link>
              <h2>Welcome to D.Store</h2>
              <p>
                Premium clothing and home appliances curated for modern living.
                Log in to access your orders, wishlist and exclusive deals.
              </p>
              <div className="d_login_perks">
                {["Exclusive member discounts", "Early access to sales", "Track orders in real time", "Easy 7-day returns"].map((p) => (
                  <span key={p}><FaCheckCircle /> {p}</span>
                ))}
              </div>
            </div>
          </div>
        </Col>

        {/* Right panel — form */}
        <Col lg={6} className="d_login_form_col">
          <div className="d_login_form_wrap">
            {/* Mobile logo */}
            <Link to="/" className="d_logo d-flex d-lg-none mb-4">
              <span className="d_logo_mark">D</span>
              <span className="d_logo_text">.Store</span>
            </Link>

            {/* Tab switcher (login / register) */}
            {mode !== "forgot" && (
              <div className="d_login_tabs">
                <button
                  className={mode === "login" ? "active" : ""}
                  onClick={() => { setMode("login"); setSubmitted(false); setErrors({}); }}
                >
                  Sign In
                </button>
                <button
                  className={mode === "register" ? "active" : ""}
                  onClick={() => { setMode("register"); setSubmitted(false); setErrors({}); }}
                >
                  Create Account
                </button>
              </div>
            )}

            {/* ===== LOGIN ===== */}
            {mode === "login" && (
              <>
                <h2 className="d_login_heading">Sign in to your account</h2>
                {submitted ? (
                  <div className="d_auth_success">
                    <FaCheckCircle />
                    <div>
                      <h4>Welcome back!</h4>
                      <p>You have been signed in successfully.</p>
                      <Link to="/" className="d_btn_primary mt-3">Go to Home</Link>
                    </div>
                  </div>
                ) : (
                  <Form onSubmit={handleLoginSubmit} noValidate>
                    <Form.Group className="d_form_group">
                      <Form.Label>Email Address</Form.Label>
                      <div className="d_input_icon_wrap">
                        <FaEnvelope className="d_input_icon" />
                        <Form.Control
                          type="email"
                          placeholder="you@example.com"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          isInvalid={!!errors.email}
                          className="d_auth_input"
                        />
                      </div>
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="d_form_group">
                      <div className="d_pw_label_row">
                        <Form.Label>Password</Form.Label>
                        <button type="button" className="d_forgot_link" onClick={() => { setMode("forgot"); setSubmitted(false); setErrors({}); }}>
                          Forgot Password?
                        </button>
                      </div>
                      <div className="d_input_icon_wrap">
                        <FaLock className="d_input_icon" />
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          isInvalid={!!errors.password}
                          className="d_auth_input"
                        />
                        <button type="button" className="d_pw_toggle" onClick={() => setShowPassword((s) => !s)} aria-label="Toggle password">
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>

                    <button type="submit" className="d_btn_primary d_auth_submit">
                      Sign In
                    </button>

                    <div className="d_auth_divider"><span>or continue with</span></div>
                    <div className="d_social_btns">
                      <button type="button" className="d_social_btn d_google_btn"><FaGoogle /> Google</button>
                      <button type="button" className="d_social_btn d_fb_btn"><FaFacebookF /> Facebook</button>
                    </div>
                  </Form>
                )}
              </>
            )}

            {/* ===== REGISTER ===== */}
            {mode === "register" && (
              <>
                <h2 className="d_login_heading">Create your account</h2>
                {submitted ? (
                  <div className="d_auth_success">
                    <FaCheckCircle />
                    <div>
                      <h4>Account Created!</h4>
                      <p>Welcome to D.Store. You can now sign in and start shopping.</p>
                      <button className="d_btn_primary mt-3" onClick={() => { setMode("login"); setSubmitted(false); }}>
                        Sign In Now
                      </button>
                    </div>
                  </div>
                ) : (
                  <Form onSubmit={handleRegSubmit} noValidate>
                    <Row className="g-3">
                      <Col sm={6}>
                        <Form.Group className="d_form_group">
                          <Form.Label>Full Name</Form.Label>
                          <div className="d_input_icon_wrap">
                            <FaUser className="d_input_icon" />
                            <Form.Control
                              type="text"
                              placeholder="Arjun Kapoor"
                              value={regForm.name}
                              onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                              isInvalid={!!errors.name}
                              className="d_auth_input"
                            />
                          </div>
                          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="d_form_group">
                          <Form.Label>Phone</Form.Label>
                          <div className="d_input_icon_wrap">
                            <FaPhoneAlt className="d_input_icon" />
                            <Form.Control
                              type="tel"
                              placeholder="+91 98765 43210"
                              value={regForm.phone}
                              onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                              className="d_auth_input"
                            />
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="d_form_group">
                      <Form.Label>Email Address</Form.Label>
                      <div className="d_input_icon_wrap">
                        <FaEnvelope className="d_input_icon" />
                        <Form.Control
                          type="email"
                          placeholder="you@example.com"
                          value={regForm.email}
                          onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                          isInvalid={!!errors.email}
                          className="d_auth_input"
                        />
                      </div>
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="d_form_group">
                      <Form.Label>Password</Form.Label>
                      <div className="d_input_icon_wrap">
                        <FaLock className="d_input_icon" />
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Min. 8 characters"
                          value={regForm.password}
                          onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                          isInvalid={!!errors.password}
                          className="d_auth_input"
                        />
                        <button type="button" className="d_pw_toggle" onClick={() => setShowPassword((s) => !s)} aria-label="Toggle password">
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="d_form_group">
                      <label className="d_checkbox_label">
                        <input
                          type="checkbox"
                          checked={regForm.agree}
                          onChange={(e) => setRegForm({ ...regForm, agree: e.target.checked })}
                        />
                        <span>
                          I agree to the{" "}
                          <Link to="/terms-conditions">Terms & Conditions</Link>{" "}
                          and{" "}
                          <Link to="/privacy-policy">Privacy Policy</Link>
                        </span>
                      </label>
                      {errors.agree && <p className="d_field_error">{errors.agree}</p>}
                    </Form.Group>

                    <button type="submit" className="d_btn_primary d_auth_submit">
                      Create Account
                    </button>

                    <div className="d_auth_divider"><span>or sign up with</span></div>
                    <div className="d_social_btns">
                      <button type="button" className="d_social_btn d_google_btn"><FaGoogle /> Google</button>
                      <button type="button" className="d_social_btn d_fb_btn"><FaFacebookF /> Facebook</button>
                    </div>
                  </Form>
                )}
              </>
            )}

            {/* ===== FORGOT PASSWORD ===== */}
            {mode === "forgot" && (
              <>
                <button className="d_back_link" onClick={() => { setMode("login"); setSubmitted(false); setErrors({}); }}>
                  ← Back to Sign In
                </button>
                <h2 className="d_login_heading">Reset your password</h2>
                <p className="d_login_sub">
                  Enter the email associated with your account and we'll send you a reset link.
                </p>
                {submitted ? (
                  <div className="d_auth_success">
                    <FaCheckCircle />
                    <div>
                      <h4>Check Your Email</h4>
                      <p>A password reset link has been sent to <strong>{forgotEmail}</strong>.</p>
                    </div>
                  </div>
                ) : (
                  <Form onSubmit={handleForgotSubmit} noValidate>
                    <Form.Group className="d_form_group">
                      <Form.Label>Email Address</Form.Label>
                      <div className="d_input_icon_wrap">
                        <FaEnvelope className="d_input_icon" />
                        <Form.Control
                          type="email"
                          placeholder="you@example.com"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          isInvalid={!!errors.forgot}
                          className="d_auth_input"
                        />
                      </div>
                      <Form.Control.Feedback type="invalid">{errors.forgot}</Form.Control.Feedback>
                    </Form.Group>
                    <button type="submit" className="d_btn_primary d_auth_submit">
                      Send Reset Link
                    </button>
                  </Form>
                )}
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
