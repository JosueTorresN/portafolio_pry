// components/Card.jsx
import React from 'react';
import { CourseProps } from '@/props/types';

const Card: React.FC<CourseProps> = (props) => {
  return (
    <div className="primary mb-4 p-6 rounded-md shadow-sm">
      <h2 className="text-xl font-bold mb-2">{props.code} - {props.name}</h2>
      <span className="text-sm mb-4 block">{props.semster}</span>
      <p className="">{props.description}</p>
    </div>
  );
};

export default Card;