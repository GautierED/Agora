import React, { useState, useEffect } from "react";

const Inventory = () => {

    const [message, setMessage] = useState('hello')

    useEffect(() => {

        const init = async () => {

        };    
        init();
    }, []);    


    return (
        <div>
            {message}
        </div>
    );
};

export default Inventory;