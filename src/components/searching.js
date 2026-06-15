import { createComparison, rules } from "../lib/compare.js";

export function initSearching(elements, searchField) {
  // Создаём компаратор специально для поиска
  const searchCompare = createComparison(
    [rules.skipEmptyTargetValues], // Игнорируем пустые значения
    rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)
  );

  return (data, state, action) => {
    const searchValue = state[searchField] || ''; // Получаем значение поиска из state

    // Если строка поиска пустая — возвращаем данные без изменений
    if (!searchValue) {
      return data;
    }

    // Применяем компаратор: фильтруем данные по значению поиска
    return data.filter(row => searchCompare(row, { [searchField]: searchValue }));
  };
}
