// import { useUser } from "@clerk/clerk-react";
// import { Navigate, useLocation } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const { isSignedIn, isLoaded, user } = useUser();
//   const { pathname } = useLocation();

//   if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
//     return <Navigate to="/?sign-in=true" />;
//   }

//   if (
//     user !== undefined &&
//     !user?.unsafeMetadata?.role &&
//     pathname !== "/onboarding"
//   )
//     return <Navigate to="/onboarding" />;

//   return children;
// };

// export default ProtectedRoute;

import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { pathname } = useLocation();

  // Check if the user data is still loading
  if (!isLoaded) {
    return <div>Loading...</div>; // Or you can return a loader component
  }

  // Redirect to sign-in if the user is not signed in
  if (!isSignedIn) {
    return <Navigate to="/?sign-in=true" />;
  }

  // If the user is signed in but has no role and is not on the onboarding page, redirect to onboarding
  if (!user?.unsafeMetadata?.role && pathname !== "/onboarding") {
    return <Navigate to="/onboarding" />;
  }

  // Render the children if all checks pass
  return children;
};

export default ProtectedRoute;
