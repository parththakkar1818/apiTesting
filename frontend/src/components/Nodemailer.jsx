import React, { useState } from "react";

const SendMailNodemailer = () => {
  const [email, setEmail] = useState("thakkarjinal123@gmail.com");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const sendMail = async () => {
    try {
      const response = await fetch("https://api-testing-backend.vercel.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: email }),
      });

      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.error("Error sending email:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="enter your email"
        value={email}
        onChange={handleEmailChange}
      />
      <button onClick={sendMail}>Send Mail</button>
    </div>
  );
};

export default SendMailNodemailer;
