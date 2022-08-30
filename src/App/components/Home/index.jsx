import React from 'react';
import {useSelector } from 'react-redux';
import Posts from "./components/Posts"
import './Styles/style.css'

export default ()=>{
    const alert = useSelector(state => state.alert);

    return (
    <>
        <header className="masthead m-0">
            <div className="overlay"></div>
            <div className="container">
            <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                <div className="site-heading">
                    <h1 className="Montserrat">Wierzba Tonight</h1>
                    <span className="subheading">Some text</span>
                </div>
                </div>
            </div>
            </div>
        </header>

        <div className="container inner-wrap">
        {alert.message &&<><br></br><div className={`alert ${alert.type}`}>{alert.message}</div></>} 
            <div className="row p-4">
                
                    <Posts/>

            </div>
        </div>
        
        <hr></hr>

        <footer className="headerbar">
            <div className="container">
            <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                <p className="copyright Montserrat text-white">Copyright &copy; WierzbaTonight 2020</p>
                </div>
            </div>
            </div>
        </footer>
    </>
);

}