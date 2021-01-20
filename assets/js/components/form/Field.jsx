import React from 'react';

const Field = ({name, label, value, onChange, type='text', placeholder="", className="", error=""}) => (  
        <div className={`form-group ${className}`}>
             <label htmlFor={name}>{label}</label>
             <input 
             value={value} 
             onChange={onChange} 
             placeholder={placeholder || label} 
             type={type} 
             className={`form-control ${ error && "is-invalid"}`} name={name}/>
             {error && <p className="invalid-feedback">{error}</p>}
        </div>
);

export default Field;