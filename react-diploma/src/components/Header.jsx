// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import SearchWidget from "./SearchWidget";

// const Header = () => {
//   const [cartItemsCount, setCartItemsCount] = useState(0);

//   useEffect(() => {
//     const updateCartCount = () => {
//       const cart = JSON.parse(localStorage.getItem("cart")) || [];
//       const count = cart.reduce((sum, item) => sum + item.quantity, 0);
//       setCartItemsCount(count);
//     };

//     updateCartCount();

//     window.addEventListener("storage", updateCartCount);
//     return () => {
//       window.removeEventListener("storage", updateCartCount);
//     };
//   }, []);

//   return (
//     <header className="container">
//       <div className="row">
//         <div className="col">
//           <nav className="navbar navbar-expand-sm navbar-light bg-light">
//             <Link className="navbar-brand" to="/">
//               <img src="/img/header-logo.png" alt="Bosa Noga" />
//             </Link>
//             <div className="collapse navbar-collapse" id="navbarMain">
//               <ul className="navbar-nav mr-auto">
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/">
//                     Главная
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/catalog">
//                     Каталог
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/about">
//                     О магазине
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/contacts">
//                     Контакты
//                   </Link>
//                 </li>
//               </ul>
//               <div className="header-controls-pics">
//                 <SearchWidget />
//                 <div className="header-controls-pic header-controls-cart">
//                   <Link to="/cart">
//                     {cartItemsCount > 0 && (
//                       <div className="header-controls-cart-full">{cartItemsCount}</div>
//                     )}
//                     <div className="header-controls-cart-menu"></div>
//                   </Link>
//                 </div>
//                 {/* другие элементы header-controls */}
//               </div>
//             </div>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import SearchWidget from "./SearchWidget";

// const Header = () => {
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     const updateCartCount = () => {
//       const cart = JSON.parse(localStorage.getItem('cart')) || [];
//       const count = cart.reduce((sum, item) => sum + item.quantity, 0);
//       setCartCount(count);
//     };

//     window.addEventListener('storage', updateCartCount);

//     updateCartCount(); // Initialize cart count on component mount

//     return () => {
//       window.removeEventListener('storage', updateCartCount);
//     };
//   }, []);

//   return (
//     <header className="container">
//       <div className="row">
//         <div className="col">
//           <nav className="navbar navbar-expand-sm navbar-light bg-light">
//             <Link className="navbar-brand" to="/">
//               <img src="/img/header-logo.png" alt="Bosa Noga" />
//             </Link>
//             <div className="collapse navbar-collapse" id="navbarMain">
//               <ul className="navbar-nav mr-auto">
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/">
//                     Главная
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/catalog">
//                     Каталог
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/about">
//                     О магазине
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/contacts">
//                     Контакты
//                   </Link>
//                 </li>
//               </ul>
//               <div className="header-controls">
//                 <SearchWidget />
//                 <div className="header-controls-pic header-controls-cart">
//                   <Link to="/cart">
//                     {cartCount > 0 && (
//                       <div className="header-controls-cart-full">{cartCount}</div>
//                     )}
//                     <div className="header-controls-cart-menu"></div>
//                   </Link>
//                 </div>
//                 {/* другие элементы header-controls */}
//               </div>
//             </div>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchWidget from "./SearchWidget";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              <img src="/img/header-logo.png" alt="Bosa Noga" />
            </Link>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Главная
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/catalog">
                    Каталог
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    О магазине
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contacts">
                    Контакты
                  </Link>
                </li>
              </ul>
              <div className="row">
                <SearchWidget />
                <div className="header-controls-pic header-controls-cart">
                  <Link to="/cart">
                    {cartCount > 0 && (
                      <div className="header-controls-cart-full">
                        {cartCount}
                      </div>
                    )}
                    <div className="header-controls-cart-menu"></div>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
