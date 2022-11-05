import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import { Icon } from 'react-icons-kit'
import {
    facebook,
    mail,
    whatsapp
} from 'react-icons-kit/icomoon'

const Index = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-4 mb-4 mb-lg-0 pr-lg-4">
                        <div className="text-center text-lg-left">
                            <ul>
                                <li>
                                    <p><h2><span>Med</span>Aid</h2></p>
                                </li>
                            </ul>
                            <br />
                            <p>MedAid is a website that Finds doctors based on symptoms, Book appointments, Buy medicines & see test prices</p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 mb-4 mb-lg-0 text-center text-lg-left pr-lg-4">
                        <h5>Need Help?</h5>
                        <br></br>
                        <Link to="/">support</Link>
                        <Link to="/">terms & conditions</Link>
                    </div>
                    <div className="col-12 col-lg-4 mb-4 mb-lg-0 text-center text-lg-left">
                        <h5>Contacts</h5>
                        <br></br>
                        <ul>
                            <li>
                                <a href="https://www.facebook.com/">
                                    <Icon icon={facebook} size={18} />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.gmail.com/">
                                    <Icon icon={mail} size={18} />
                                </a>
                            </li>
                            <li>
                                <a href="https://whatsapp.com">
                                    <Icon icon={whatsapp} size={18} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;