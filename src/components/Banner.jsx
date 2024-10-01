import React from 'react';

export const Banner = (props) => {
  return (
    <section className="banner banner__hero">
      <img src={props.imageSource} alt="" />
      <div className="banner__content">{props.children && props.children}</div>
    </section>
  );
};
