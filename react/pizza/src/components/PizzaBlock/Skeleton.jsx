import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={460}
    viewBox='0 0 280 460'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <rect x='5' y='298' rx='15' ry='15' width='255' height='88' />
    <rect x='107' y='400' rx='27' ry='27' width='152' height='40' />
    <rect x='9' y='253' rx='11' ry='11' width='246' height='28' />
    <circle cx='130' cy='128' r='112' />
    <rect x='4' y='401' rx='27' ry='27' width='88' height='40' />
  </ContentLoader>
);

export default Skeleton;
