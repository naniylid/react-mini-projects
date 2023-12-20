import React from 'react';

function Categories({ value, onClickFilter }) {
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
}

export default Categories;
