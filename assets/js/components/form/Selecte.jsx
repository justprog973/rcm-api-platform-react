import React from 'react';

const Select = ({name, label, value, error="", onChange, children}) => {
    return ( 
        <>
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <select onChange={onChange} value={value} name={name} id={name} className={`form-control ${error &&  " is-invalid"}`} >
                    {children}
                </select>
            </div>
            <p className="invalid-feedback">{error}</p>
        </>
     );
}
 
export default Select;