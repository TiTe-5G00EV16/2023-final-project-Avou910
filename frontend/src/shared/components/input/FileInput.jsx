import React, { useState } from 'react';
import './FileInput.css';


const FileInput = React.forwardRef((props, ref) => {
    const handleFileInputChange = (event) => {
      const file = event.target.files[0];
      props.onChange(file);
    };
  
    return (
      <div className="form-control">
        <label>{props.label}</label>
        <input type="file" accept=".jpg,.jpeg,.png" ref={ref} onChange={handleFileInputChange} />
        {props.errorMessage && <p>{props.errorMessage}</p>}
      </div>
    );
  });

export default FileInput;