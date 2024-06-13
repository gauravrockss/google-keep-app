import React from 'react';
import BSImage from 'react-bootstrap/Image';
function Image(props) {
    const { name, ...rest } = props;
    return (
        <>
            <BSImage
                src={`${process.env.PUBLIC_URL}/images/${name}`}
                {...rest}
            />
        </>
    );
}
export default Image;
