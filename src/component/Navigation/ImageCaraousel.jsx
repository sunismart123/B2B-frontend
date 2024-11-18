import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import image1 from '../../Images/cara1.png';
import image2 from '../../Images/cara2.png';

const ImageCarousel = () => {
  return (
    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
      <div className="h-[34rem] ">
        <img
          src={image1}
          className="h-full w-full object-cover"
          alt="Slide 1"
        />
      </div>
      <div className="h-[34rem] ">
        <img
          src={image2}
          className="h-full w-full object-cover"
          alt="Slide 2"
        />
      </div>
     
      {/* <div className="h-[34rem]">
        <img className="h-full w-full object-cover" src="https://s.alicdn.com/@img/imgextra/i1/O1CN01AAmzwV1GWaIkhRPMg_!!6000000000630-2-tps-990-400.png" alt="Slide 2" />
      </div> */}
      <div className="h-[34rem]">
        <img className="h-full w-full object-cover" src="https://s.alicdn.com/@img/imgextra/i2/O1CN01h0dgp222Y38Xa2asS_!!6000000007131-2-tps-990-400.png" alt="Slide 3" />
      </div>
    
      <div className="h-[34rem]">
        <img className="h-full w-full object-cover" src="https://s.alicdn.com/@img/imgextra/i3/O1CN01M9x0R41VzdeRW8FYF_!!6000000002724-0-tps-990-400.jpg" alt="Slide 4" />
      </div>
      <div className="h-[34rem]">
        <img className="h-full w-full object-cover" src="https://s.alicdn.com/@img/imgextra/i3/O1CN01vwlV6Z20upbopOZbO_!!6000000006910-2-tps-990-400.png" alt="Slide 5" />
      </div>
      <div className="h-[34rem]">
        <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1674027392851-7b34f21b07ee?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 3" />
      </div> 
    </Carousel>
  );
};

export default ImageCarousel;
