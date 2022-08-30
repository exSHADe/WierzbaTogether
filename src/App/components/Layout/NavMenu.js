import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {useSelector } from 'react-redux';

export default ()=>{
    const user = useSelector(state => state.authentication.user);
    //const dispatch = useDispatch();
    const navRef =useRef();

    const[isToggle, setToggle] = useState("false");

    function navButtonClick(){
        setToggle(!isToggle);
        console.log("toogle");
    }

    useEffect(() => {
        let MQL = 0;
        let mainNav = navRef.current;
        if (window.innerWidth > MQL) 
        {
            var headerHeight = mainNav.offsetHeight;
            window.addEventListener('scroll', navBarEffect);
        }

        function navBarEffect() {
            var currentTop = window.pageYOffset || document.documentElement.scrollTop;
            if (currentTop < this.previousTop) 
              if (currentTop > 0 && mainNav.classList.contains('is-fixed')) 
                mainNav.classList.add('is-visible');
              else 
                mainNav.classList.remove('is-visible','is-fixed');          
            else if (currentTop > this.previousTop) 
            {
              mainNav.classList.remove('is-visible');
              if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) mainNav.classList.add('is-fixed');
            }
            this.previousTop = currentTop;
        }

        return () => window.removeEventListener('scroll', navBarEffect);
      },[]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav" ref={navRef}>
            <div className="container">
                <Link className="navbar-brand" to="/">Wierzba2night</Link>
                <button className="navbar-toggler navbar-toggler-right" onClick={navButtonClick} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>

                <div className={"collapse navbar-collapse" + (isToggle ? "" : " show")} id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={{pathname:"/menage-post" , isEdited:false}} >Post</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Logout</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">{user?.firstName}</a>
                        </li>
                    </ul>
                </div>
                
            </div>
        </nav>
    );
}

