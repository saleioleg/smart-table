import { rules, createComparison } from "../lib/compare.js";


export function initSearching(searchField) {
  // Создаём компаратор для поиска — используем только skipEmptyTargetValues
  const searchCompare = createComparison([rules.skipEmptyTargetValues], rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false));

  return (data, state, action) => {
    // Получаем значение из поля поиска (например, из input с name="search")
    const searchValue = state[searchField] || '';

    // Если строка поиска пустая, возвращаем данные без изменений
    if (!searchValue) {
      return data;
    }

    // Фильтруем данные с помощью компаратора
    return data.filter(row => searchCompare(row, { [searchField]: searchValue }));
  };
}
