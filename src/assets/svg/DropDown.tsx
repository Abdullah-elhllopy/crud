import React, { ReactElement } from 'react';

const Dropdown: React.FC<React.SVGProps<SVGSVGElement>> = (props): ReactElement => (
    <svg
        {...props}
        width={18}
        height={18}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g id="angle-down">
            <path
                id="angle-down_2"
                d="M9.00003 12.75C8.80803 12.75 8.616 12.6765 8.46975 12.5302L3.21975 7.28024C2.9265 6.98699 2.9265 6.51294 3.21975 6.21969C3.513 5.92644 3.98705 5.92644 4.2803 6.21969L9.00003 10.9394L13.7198 6.21969C14.013 5.92644 14.4871 5.92644 14.7803 6.21969C15.0736 6.51294 15.0736 6.98699 14.7803 7.28024L9.5303 12.5302C9.38405 12.6765 9.19203 12.75 9.00003 12.75Z"
                fill="#475467"
            />
        </g>
    </svg>


);

export default Dropdown;