import React from 'react';


interface LinkProps {
    onClick: React.MouseEventHandler<HTMLParagraphElement>;
    children?: any;
}


const Link = (props: LinkProps): JSX.Element => {
    return (
        <p 
            className="mb-6 info-color text-base cursor-pointer text-center"
            onClick={props.onClick}
        >
            {props.children}
        </p>
    );
}


export default Link;
