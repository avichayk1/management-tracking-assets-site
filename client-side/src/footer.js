import React from 'react';
import "./footer.css";
import instegram from "./photos/Instegram.jpeg";
import Facebook from "./photos/Facebook.png";
import Twiter from ".//photos/Twiter.png";

const footer = () => {
    return (
        <footer>
            <div className="footer">
                <ul>
                    <p>© 2024 Move Site. All rights reserved.<br />
                        Email - help@move.co.il<br />
                        Phone- 03-7461940 <br /> </p>
                    <img className="instegram" src={instegram} alt="instegram Icon"/>
                    <img className="Facebook" src={Facebook} alt="Facebook Icon"/>
                    <img className="Twiter" src={Twiter} alt="Twiter Icon"/>
                </ul>
            </div>
        </footer>
    );
};
export default footer;
