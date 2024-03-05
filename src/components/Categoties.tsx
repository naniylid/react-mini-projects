import React from 'react';

type CategoriesProps = {
  value: number;
  onClickFilter: (i: number) => void;
};

const categories = [' Все', ' Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClickFilter }) => {
  return (
    <div className='categories'>
      <ul>
        {categories.map((name, i) => (
          <li key={i} onClick={() => onClickFilter(i)} className={value === i ? 'active' : ''}>
            <button className={value === i ? 'active' : ''}>{name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
});
export default Categories;
