import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerAssetsDetails.css';
import Header from "./header";
import CustomerSideBar from "./CustomerSideBar";
import { useParams,useLocation } from 'react-router-dom';

const CustomerAssetsDetails = () => {
    const location = useLocation(); // Access the location object
    
    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const customer_id = queryParams.get('customer_id'); 
    const [properties, setProperties] = useState([
        // {
        //     // asset_ID: "",
        //     // asset_adress: "",
        //     // asset_district: "",
        //     // asset_path:"",
        //     // sset_cost: "",
        //     // starting_date: "",
        //     // ending_date: "",
        //     // asset_registration:"",
        //     // team: "",
        //     // summaries: "",
        //     // size: "",
        //     // budget: "",
        //     // customerId: ""
        //     // asset_ID: 3,
        //     // address: "The Iros 97, Haifa",
        //     // district: "North",
        //     // tenants: "The Levy Family",
        //     // responsibleTeam: "Team 7",
        //     // treatmentType: "passive",
        //     // estimatedCost: "15,000$",
        //     // registrationDate: "2024-05-07",
        //     // endDate: "2035-05-07",
        //     // size: "4 rooms",
        //     // summaries: "Renovated property, near a kindergarten and a school, fourth floor without elevator.",
        //     // customerId: "206617417"
        // }
    ]);
    const [expandedRow, setExpandedRow] = useState(null);
    const [{id},setId]=useState(useParams())
    // setId(customerId);
    useEffect(() => {
        console.log("I am in CustomerAssetDetails");
        // const id = 1; // replace this with actual id from useParams or other source
        console.log("ID from params: " + id);
        console.log(`http://localhost:3001/customer-assets/${customer_id}`);
        
        const fetchAssets = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/customer-assets/${customer_id}`);
                console.log(response.data);
                const newAssets = response.data.customer_assets ? [response.data.customer_assets] : [];
                console.log("newAssets", newAssets);
                setProperties(prevState => [...prevState, ...newAssets[0]]);
            } catch (error) {
                console.error('Error fetching assets:', error);
            }
        };

        fetchAssets();
    }, []);

    useEffect(() => {
        console.log("Properties updated", properties);
    }, [properties]);


    const toggleRow = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    return (
        <div className="CustomerAssetsDetails">
            <Header />
            <CustomerSideBar />
            <div className="table-container">
                <h1>Details - Assets under management:</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Assets Address:</th>
                    </tr>
                    </thead>
                    <tbody>
                    {properties.map((property, index) => (
                        <React.Fragment key={index}>
                            <tr onClick={() => toggleRow(index)}>
                                <td>{property.address}</td>
                            </tr>
                            {expandedRow === index && (
                                <tr>
                                    <td>
                                        <div className="details-container">
                                            ID: {property.asset_id}<br />
                                            Address: {property.asset_adress}<br />
                                            District: {property.asset_district}<br />
                                            Path: {property.asset_path}<br />
                                            Estimated Cost: {property.sset_cost}<br />
                                            Starting Date: {property.starting_date}<br />
                                            Ending Date: {property.ending_date}<br />
                                            Registration Date: {property.asset_registration}<br />
                                            Responsible Team: {property.team}<br />
                                            Summaries: {property.summaries}<br />
                                            Size: {property.size}<br />
                                            Budget:{properties.budget} <br />
                                            {/* Treatment Type: {property.treatmentType}<br />
                                            Estimated Cost: {property.estimatedCost}<br />
                                            End Date: {property.endDate}<br /> */}


                                            Customer ID: {property.customerId}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerAssetsDetails;
