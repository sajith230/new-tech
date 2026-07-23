import React from "react";

import AuthRouteGuard from "@/components/AuthRouteGuard";
import PasswordResetForm from "@/components/user/password-reset-page/PasswordResetForm";

const PasswordResetPage = () => {
  return (
    <AuthRouteGuard>
      <PasswordResetForm />
    </AuthRouteGuard>
  );
};

export default PasswordResetPage;
