import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Form from "./Form";
import TextInput from "./TextInput";

export default function SignupForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handelSubmit(e) {
    e.preventDefault();
    // do validation
    if (password !== confirmPassword) {
      return setError("Password don't match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, userName);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Faled to create an account");
    }
  }

  return (
    <Form style={{ height: "500px" }} onSubmit={handelSubmit}>
      <TextInput
        type="text"
        required
        placeholder="Enter name"
        icon="person"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <TextInput
        type="text"
        required
        placeholder="Enter email"
        icon="alternate_email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextInput
        type="password"
        required
        placeholder="Enter password"
        icon="lock"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <TextInput
        type="password"
        required
        placeholder="Confirm password"
        icon="lock_clock"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {error && <p className="error">{error}</p>}

      <Checkbox
        text="I agree to the Terms &amp; Conditions"
        required
        value={agree}
        onChange={(e) => setAgree(e.target.value)}
      />

      <Button disable={loading} type="submit">
        <span>Submit Now</span>
      </Button>

      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
}
