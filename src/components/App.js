import React, { Component, useEffect, useState } from "react";
import '../styles/App.css';
import Input from "./Input";
import Message from "./Message";
import Select from "./Select";

const App = () => {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [formEvent, setFormEvent] = useState();
  const [submit, setSubmit] = useState(false);

  const [values, setValues] = useState({
    username: "",
    email: "dfgdf",
    phone: "123",
    password: "",
  })

  const inputs = [
    {
      id: 1,
      name: "username",
      testId: "name",
      type: "text",
      placeholderText: "Username",
      valueText: values.username,
    },

    {
      id: 2,
      name: "email",
      testId: "email",
      type: "text",
      placeholderText: "Email",
      valueText: values.email,
    },

    {
      id: 3,
      name: "phone",
      testId: "phoneNumber",
      type: "tel",
      placeholderText: "Phone",
      valueText: values.phone,
    },

    {
      id: 4,
      name: "password",
      testId: "password",
      type: "password",
      placeholderText: "Password",
      valueText: values.password,
    },
  ]

  const gender = [
    { valueText: "male", text: "Male" },
    { valueText: "female", text: "Female" },
    { valueText: "other", text: "Others" },
  ]

  const validation = {
    isFieldEmpty: () => {
      for (const item of Object.entries(values)) {
        if (!item[1]) {
          return true;
        }
      }
      return false;
    },

    isAlphanumericName: () => {
      const pattern = /^([a-z]+[\s]*[0-9]+[\s]*)+$/;
      return pattern.test(values.username);
    },

    isValidEmail: () => {
      return values.email.includes("@");
    },

    isValidPhone: () => {
      const pattern = /^[0-9]*$/;
      return pattern.test(values.phone);
    },

    isValidPassword: () => {
      return values.password.length >= 6;
    },
  }

  const getUserName = () => {
    return values.email.split("@")[0];
  }

  const clearForm = (formData) => {
    Array.from(formData.target).forEach((e) => (e.value = ""))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    e.persist()
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());
    setValues({ ...formData });
    setFormEvent(e);
    setSubmit(true);
  }

  const validateForm = () => {
    if (validation.isFieldEmpty()) {
      setIsValid(false);
      setError("All fields are mandatory");
      setSubmit(!submit);
      return;
    }
    if (!validation.isAlphanumericName()) {
      setIsValid(false);
      setError("Name is not alphanumeric");
      setSubmit(!submit);
      return;
    }
    if (!validation.isValidEmail()) {
      setIsValid(false);
      setError("Email must contain @");
      setSubmit(!submit);
      return;
    }
    if (!validation.isValidPhone()) {
      setIsValid(false);
      setError("Phone Number must contain only numbers");
      setSubmit(!submit);
      return;
    }
    if (!validation.isValidPassword()) {
      setIsValid(false);
      setError("Password must contain atleast 6 letters");
      setSubmit(!submit);
      return;
    }

    setIsValid(true);
    setUsername(getUserName());
    setSubmit(!submit);
  }

  useEffect(() => {
    if (submit) {
      validateForm();
    }
  }, [submit])

  useEffect(() => {
    if (isValid) {
      clearForm(formEvent);
    }
  }, [isValid]);

  return (
    <div id="main">
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => {
          return (
            <Input key={input.id}  {...input} />
          )
        })}
        <Select options={gender} />
        <div>
          <button type="submit" data-testid='submit'>Submit</button>
        </div>
      </form>

      {isValid ? (
        <Message message={"Hello" + " " + username} />
      ) : (
        <Message message={error} />
      )}
    </div>
  )
}


export default App;