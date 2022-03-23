import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Rating from '@material-ui/lab/Rating';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

export default class Gallery extends React.Component {
    render() {
        return (
            <>
                {
                    this.props.team.length &&
                    <Carousel
                        additionalTransfrom={0}
                        arrows
                        responsive={responsive}
                        autoPlay={true}
                        autoPlaySpeed={3000}
                        centerMode={false}
                        className=""
                        containerClass="container-with-dots"
                        dotListClass=""
                        draggable
                        focusOnSelect={true}
                        infinite
                        itemClass=""
                        keyBoardControl
                        minimumTouchDrag={80}
                        renderButtonGroupOutside={true}
                        renderDotsOutside={false}
                    >
                        {
                            this.props.team.map((member, index) => (
                                <div key={index} className='card' style={{width: '95%', margin:'20px auto',minHeight:'500px'}}>
                                    <img
                                        style={{ maxWidth: '100%','borderRadius': '5px 5px 0 0' }}
                                        alt={member._id}
                                        src={`/${member.image}`}
                                    />
                                    <div className="card-body">
                                        <div className="card-title">
                                            {member.name}
                                        </div >
                                        <div className="card-text">
                                            <div>
                                                <Rating name='rating' value={member.rating} precision={0.5} readOnly={true} />
                                            </div>
                                            {member.description}
                                        </div >
                                    </div>
                                </div>
                            ))
                        }
                    </Carousel>
                }

            </>
        )
    }
}