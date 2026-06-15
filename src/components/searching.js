import { createComparison, rules } from "../lib/compare.js";

export function initSearching(elements, searchField) {
  // @todo: #5.1 — настроить компаратор
  const searchCompare = createComparison(
    [rules.skipEmptyTargetValues], // Игнорируем пустые значения
    rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)
  );

  return (data, state, action) => {
    // @todo: #5.2 — применить компаратор
    const searchValue = state[searchField] || ''.trim(); // Получаем значение поиска из state

    // Если строка поиска пустая — возвращаем данные без изменений
    if (!searchValue) {
      return data;
    }

    // Применяем компаратор: фильтруем данные по значению поиска
    return data.filter(row => searchCompare(row, { [searchField]: searchValue }));
  };
}
