import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Movies from "./components/Movies/Movies";

function App() {

  const isAdminLoggedIn = useSelector(state => state.admin.isLoggedIn)
  const isUserLoggedIn = useSelector(state => state.user.isLoggedIn)
  console.log('isAdminLoggedIn', isAdminLoggedIn)
  console.log('isUserLoggedIn', isUserLoggedIn)

  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/movies' element={<Movies />}></Route>
          <Route path='/auth' element={<Auth />}></Route>
        </Routes>
      </section>
    </div>
  );
}

export default App;
