import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routing/Routes";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster
        toastOptions={{
          style: {
            borderRadius: "12px",
            background: "#183286",
            color: "#fff",
            padding: "12px 16px",
            fontSize: "0.95rem",
          },
          success: {
            style: {
              background: "#2563eb",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#2563eb",
            },
          },
          error: {
            style: {
              background: "#e11d48",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#e11d48",
            },
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
