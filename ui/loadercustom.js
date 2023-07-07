import React from 'react';
import { Col, Row } from 'reactstrap';
const Loader1 = () => {

  return (
    <>
      <div className="min-vh-100 loader-custom">
        <div className="centerlogo">
          <div>
              <p className="navbar-brand-text-new mb-2">Umami <span>Recipe</span></p>
          </div>
          <div>
            <img src="/assets/images/loader.svg" width="32" height="32" className="img-fluid rotate-img" alt="cap" />  
          </div>
        </div>
      </div>
    </>
  );
}

export default Loader1;