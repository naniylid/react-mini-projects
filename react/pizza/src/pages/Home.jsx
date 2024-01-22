import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

//Components
import Categories from '../components/Categoties';
import Sort from '../components/Sort';
import { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector((state) => state.filterSlice);
  const { items, status } = useSelector((state) => state.pizzaSlice);

  const sortType = sort.sortProperty;

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(
      //Бизнес логика получения пицц
      fetchPizzas({
        currentPage,
        category,
        sortBy,
        order,
        search,
      }),
    );
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ params, sort }));
      isSearch.current = true;
    }
  }, []);

  //Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  //Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj) => (
    <Link key={obj.id} to={`/pizza/${obj.id}`}>
      <PizzaBlock {...obj} />
    </Link>
  ));

  const skeletons = [...new Array(12)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onClickFilter={onClickCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div>
          <h2>Ошибка загрузки. Попробуйте повторить попытку позже </h2>
        </div>
      ) : (
        <div className='content__items'>{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
