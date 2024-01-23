import React from 'react';

type CategoriesProps = {
  value: number;
  onClickFilter: any;
};

const Categories: React.FC<CategoriesProps> = ({ value, onClickFilter }) => {
  const categories = [' Все', ' Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className='categories'>
      <ul>
        {categories.map((name, i) => (
          <li key={i} onClick={() => onClickFilter(i)} className={value === i ? 'active' : ''}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
