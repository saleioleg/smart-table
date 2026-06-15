import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  Object.keys(indexes).forEach((elementName) => {
    elements[elementName].append(
      ...Object.values(indexes[elementName]).map((name) => {
        // Создаём элемент <option>
        const option = document.createElement("option");

        // Устанавливаем значение атрибута value и текстовое содержимое
        option.value = name;
        option.textContent = name;

        // Возвращаем созданный элемент — он попадёт в append()
        return option;
      }),
    );
  });

  return (data, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    

    // @todo: #4.5 — отфильтровать данные используя компаратор
    return data.filter((row) => compare(row, state));
  };
}
