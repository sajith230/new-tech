import React from "react";

import AuthRouteGuard from "@/components/AuthRouteGuard";
import VerifyEmailForm from "@/components/user/verify-email-page/VerifyEmailForm";

const VerifyEmailPage = () => {
  return (
    <AuthRouteGuard>
      <VerifyEmailForm />
    </AuthRouteGuard>
  );
};

export default VerifyEmailPage;
