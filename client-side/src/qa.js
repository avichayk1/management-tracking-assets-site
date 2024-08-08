import React, { useState } from 'react';
import Header from "./header";
import Footer from "./footer";
import './qa.css';
import EmployeeSideBar from "./EmployeeSideBar";

const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="accordion-item">
            <button className="accordion-button" onClick={toggle}>
                {question}
            </button>
            {isOpen && <div className="accordion-content">{answer}</div>}
        </div>
    );
};
const qa = () => {
    const faqData = [
        {
            question: "How can I start using your services?",
            answer: "To start using our services, you must create a user account and log in..."
        },
        {
            question: "How can a new property be added to the system?",
            answer: "To add a new property, log in to your user account and click on the \"Add a new property\" button or ask to be contacted by phone.\n" +
                "                After that, fill in the property details and save it in the system"
        },
        {
            question: "How can I contact your support?",
            answer: "To contact our support team, you can send an email to our email address or use the contact form on the website."
        },
        {
            question: "Is it possible to change or update details on an existing property?",
            answer: "Yes, you can change or update details about an existing property through the user's control panel. You can edit\n" +
                "                Details such as address, phone number, case details and more."
        },
    ];

    return (
        <div className="accordion56">
            <div className="background">
                <Header/>
                <div className="lines">
                    {faqData.map((faq, index) => (
                        <AccordionItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                    <Footer/>
                </div>
            </div>
        </div>
    );
};
export default qa;
