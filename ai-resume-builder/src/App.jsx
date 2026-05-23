import { Navigate, Outlet } from "react-router-dom"
import { Button } from "./components/ui/button"
import { useUser } from "@clerk/react"
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/sonner";

function App() {
 
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-sm">
        Loading…
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return (
    <>
   <Header/>
   
   <Outlet/>
    <Toaster />
    </>
  )
}

export default App
