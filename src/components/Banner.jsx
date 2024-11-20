import React from 'react';

export const Banner = ({
  imageSource,
  children,
  contentPosition,
  textPosition,
  blur,
}) => {
  return (
    <section className="banner banner__hero">
      <img src={imageSource} alt="" />
      <div
        className={`
          banner__layer 
          ${contentPosition ? 'banner__position--' + contentPosition : ''}
          ${blur ? 'banner__blur' : ''}
        `}
      >
        <div
          className={`
          banner__content
          ${textPosition ? `banner__text__position--${textPosition}` : ''}
          `}
        >
          {children && children}
        </div>
      </div>
    </section>
  );
};
