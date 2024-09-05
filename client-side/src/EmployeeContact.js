import React, { useState } from 'react';
import Header from "./header";
import EmployeeSideBar from './EmployeeSideBar';
import './EmployeeContact.css';

const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="accordion-item2">
            <button className="accordion-button" onClick={toggle}>
                {question}
            </button>
            {isOpen && <div className="accordion-content2">{answer}</div>}
        </div>
    );
};
const EmployeeContact = () => {
    const faqData = [
        {
            question: "Asset Management Department",
            answer: "AssetManagement@move.co.il, 03-7461940"
        },
        {
            question: "Maintenance Department",
            answer: "Maintenance@move.co.il, 03-7461941"
        },
        {
            question: "Finance Department",
            answer: "Finance@move.co.il, 03-7461942"
        },
        {
            question: "Rental department",
            answer: "Rental@move.co.il, 03-7461943"
        },
        {
            question: "Legal Department",
            answer: "Legal@move.co.il, 03-7461944"
        },
        {
            question: "Human Resources Department",
            answer: "HR@move.co.il, 03-7461945"
        },
        {
            question: "IT and HelpDesk Department",
            answer: "IT@move.co.il, 03-7461946"
        },
        {
            question: "Customer relations Department",
            answer: "CustomerRelations@move.co.il, 03-7461947"
        },
    ];

    return (
        <div className="accordion2">
            <div className="background6">
                <Header/>
                <EmployeeSideBar />
                <h1>Interested in contacting another department?<br />
                    Below is the corporate contact information for your use.</h1>
                    {faqData.map((faq, index) => (
                    <AccordionItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </div>
    );
};
export default EmployeeContact;