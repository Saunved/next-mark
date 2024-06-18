import React from "react";
import PropTypes from "prop-types";

function SectionTitle({ children }) {
    return (
        <h2 className="text-lg mb-4 uppercase tracking-widest font-semibold dark:text-gray-400 text-gray-600">
            {children}
        </h2>
    )
}

SectionTitle.propTypes = {
    children: PropTypes.string.isRequired
}

export default SectionTitle;