import React from 'react';
import { Container } from 'reactstrap';
const Structure = (props) => {
  //props.masterData.bannerImage
  return (
    <div className='structure-1'>
      <Container fluid='md'>
        <div className='structure-banner position-relative'>
          <img
            src={'assets/images/structure-banner-bg.png'}
            className='img-fluid'
            alt='banner'
          />
        </div>
      </Container>
    </div>
  );
};

export default Structure;
