import React from "react";

export const User = ({ name, email, phone }) => (
  <div className="user">
    <span className="user-name">{name}</span>
    <span className="user-email">{email}</span>
    <span className="user-email">{phone}</span>
  </div>
);
