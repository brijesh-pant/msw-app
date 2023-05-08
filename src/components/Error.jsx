import React from "react";
import { AppLayout } from "../layouts/AppLayout";

export const Error = ({ error }) => (
  <AppLayout>
    <h3 data-testid="error-container">{error}</h3>
  </AppLayout>
);
