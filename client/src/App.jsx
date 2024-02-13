import { useState, useEffect } from 'react'
// import { Link, useNavigate} from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Components/pages/Home.jsx'
import Shop from './Components/pages/Shop.jsx'
import OrderById from './Components/pages/OrderbyId.jsx'
import Cart from './Components/pages/Cart.jsx'
import Checkout from './Components/pages/Checkout.jsx'
import Product from './Components/pages/Products.jsx'
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import ProfileDetails from './Components/pages/Userprofile.jsx'
import ProcessUser from './Components/pages/Login-Signup.jsx'
import Context from './Components/Context.jsx'
import EditProfile from './Components/pages/EditProfile.jsx'
import HairGrowth from './Components/pages/HairGrowth.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import './stylesheet/index.css'
import LoadingAnimation from './Components/LoadingAnimation';

function App() {
const [user, setUser] = useState(null)
const [isLoading, setLoading] = useState(true);

useEffect(() => {
  if (user === null) {
    fetch('/api/check_session').then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user);
        });
      }
    });
  }
  setTimeout(() => {
    setLoading(false);
  }, 2000);
}, []);

  return (
    <Context.Provider value={{user, setUser}}>
    <div className="app-container ">
    <Router>
      <Header />
      {isLoading ? (
            <LoadingAnimation />
          ) : (
      <div className="content-container">
          <Routes >
            <Route path="/" index element={<Home />} />
            <Route path="/login" element={<ProcessUser />} />
            <Route path="/profile" element={<ProfileDetails />} />
            <Route path="/product/:id" element={<Product />}/>
            <Route path='/shop' element={<Shop />}/>
            <Route path='/order/:order_id' element={<OrderById />}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/checkout' element={<Checkout />}/>
            <Route path='/editprofile' element={<EditProfile/>}/>
            <Route path='/HairGrowth' element={<HairGrowth />} />
          </Routes>
      </div>
      )}
      <Footer />
    </Router>
    </div>
    </Context.Provider>
  )
}

export default App
