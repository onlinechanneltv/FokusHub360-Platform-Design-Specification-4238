import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  padding = 'default',
  shadow = 'soft',
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl border border-gray-200';
  
  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };

  const shadows = {
    none: '',
    soft: 'shadow-soft',
    medium: 'shadow-medium',
    large: 'shadow-large',
  };

  const hoverClasses = hover ? 'hover:shadow-medium transition-shadow duration-200 cursor-pointer' : '';

  const classes = clsx(
    baseClasses,
    paddings[padding],
    shadows[shadow],
    hoverClasses,
    className
  );

  const CardComponent = hover ? motion.div : 'div';

  const motionProps = hover ? {
    whileHover: { y: -2 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <CardComponent 
      className={classes} 
      {...motionProps}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

export default Card;