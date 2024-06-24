import React from "react";
import PropTypes from "prop-types";

function SectionTitle({ children }) {
    return (
        <h2 className="text-xl mb-4 uppercase tracking-wide font-semibold dark:text-gray-100 text-gray-700">
            {children}
        </h2>
    )
}

SectionTitle.propTypes = {
    children: PropTypes.string.isRequired
}

export default SectionTitle;