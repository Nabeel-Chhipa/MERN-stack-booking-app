import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Movies from "./components/Movies/Movies";
import { adminAction, userAction } from "./store";

function App() {

  const dispatch = useDispatch()
  const isAdminLoggedIn = useSelector(state => state.admin.isLoggedIn)
  const isUserLoggedIn = useSelector(state => state.user.isLoggedIn)
  console.log('isAdminLoggedIn', isAdminLoggedIn)
  console.log('isUserLoggedIn', isUserLoggedIn)

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      dispatch(userAction.login())
    } else if(localStorage.getItem('adminId')) {
      dispatch(adminAction.login())
    }
  }, [])

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
