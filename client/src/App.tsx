import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import FoodsPage from "./pages/FoodsPage";
import LoginPage from "./pages/LoginPage";
import AdminFoodsPage from "./pages/AdminFoodsPage";

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/foods" element={<FoodsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/foods" element={<AdminFoodsPage />} />
          <Route
            path="*"
            element={
              <section className="container">
                <h1>Page not found</h1>
              </section>
            }
          />
        </Routes>
      </main>
    </>
  );
}
export default App;