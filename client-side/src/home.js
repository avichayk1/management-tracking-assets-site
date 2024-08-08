import React from 'react';
import "./home.css";
import "./App.css";
import Header from "./header";
import Footer from "./footer";

const home = () => {
    return (
        <div className="background-image"> {/* Added a class to use for setting the background */}
            <Header/>
            <div className="home"> {/* Corrected the class assignment to className */}
                <h77>Welcome to MOVE website</h77>
                <p>"Move" - which helps you manage and monitor personal assets. <br />
                    Our services include tracking and maintaining properties and displaying data and reports that will help you remotely.<br />
                    As part of our service, it is possible to view the information in a centralized and convenient way and even perform.<br />
                    an analysis of the data that will assist him in making decisions.<br />
                    an effective presentation of the state of the assets to the users of the system.<br />
                    Our customers are owners of unused real estate assets. Such as relocation, real estate investors,<br />
                    Business owners and entrepreneurs as well as a private customer.<br />
                    We unify all the functions needed by the client, and we can help in terms of time, money and resources.<br />
                </p>
            </div>
            <Footer/>
        </div>
    );
};

export default home;
