import React from "react";

import Loading from './Loading.gif'

const Spinner = () => {
    return(
        <div className="loading">
            <img src={Loading} alt="loading" />
        </div>
    )
}

export default Spinner