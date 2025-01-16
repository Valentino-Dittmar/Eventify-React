import React from "react";

const Unauthorized = () => {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://via.placeholder.com/1920x1080?text=Unauthorized+Access')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
        <div className="max-w-5xl text-center px-10 py-16 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-2xl">
          <h1 className="text-7xl font-extrabold text-red-500 mb-6 drop-shadow-md">
            403 - Access Denied
          </h1>
          <p className="text-2xl font-light text-gray-300 mb-8">
            You are not authorized to view this page. This area is restricted
            and requires special permissions. If you believe you should have
            access, please contact the administrator.
          </p>

          <div className="text-lg mb-10 text-gray-300">
            <p>Possible Reasons:</p>
            <ul className="list-disc list-inside mt-4 space-y-3">
              <li>
                <strong>Insufficient Permissions:</strong> Your account lacks
                the necessary privileges.
              </li>
              <li>
                <strong>Session Timeout:</strong> Your session has expired.
                Please log in again.
              </li>
              <li>
                <strong>Role Restrictions:</strong> Your role does not grant
                access to this resource.
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold shadow-lg transition duration-300"
              onClick={() => (window.location.href = "/home")}
            >
              Go to Homepage
            </button>
            {/* <button
              className="px-8 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg text-lg font-semibold shadow-lg transition duration-300"
              onClick={() => window.history.back()}
            >
              Previous Page
            </button> */}
          </div>

          <p className="mt-12 text-gray-400 text-sm">
            Need assistance? Contact our support team at{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-400 hover:underline"
            >
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;