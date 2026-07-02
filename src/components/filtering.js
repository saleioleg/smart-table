export function initFiltering(elements) {
  const updateIndexes = (elements, indexes) => {
    Object.keys(indexes).forEach((elementName) => {
      elements[elementName].append(
        ...Object.values(indexes[elementName]).map((name) => {
          const el = document.createElement("option");
          el.textContent = name;
          el.value = name;
          return el;
        }),
      );
    });
  };

  // Очищает конкретное поле по имени
  const clearField = (fieldName) => {
    const element = elements[fieldName];
    if (element && ["INPUT", "SELECT"].includes(element.tagName)) {
      element.value = '';
    }
  };

  // Очищает все поля фильтров
  const clearAllFilters = () => {
    Object.keys(elements).forEach((key) => {
      const element = elements[key];
      if (element && ["INPUT", "SELECT"].includes(element.tagName)) {
        element.value = '';
      }
    });
  };

  const applyFiltering = (query, state, action) => {
    // Если пришло действие очистки конкретного поля
    if (action && action.name) {
      clearField(action.name); // очищаем указанное поле
      return query; // возвращаем чистый query — сбрасываем фильтрацию
    }

    // Если пришла общая очистка всех фильтров
    if (action && action.type === 'CLEAR_ALL_FILTERS') {
      clearAllFilters(); // очищаем все поля
      return query; // возвращаем чистый query
    }

    // Обычная логика фильтрации
    const filter = {};
    Object.keys(elements).forEach((key) => {
      if (elements[key]) {
        if (
          ["INPUT", "SELECT"].includes(elements[key].tagName) &&
          elements[key].value
        ) {
          filter[`filter[${elements[key].name}]`] = elements[key].value;
        }
      }
    });

    return Object.keys(filter).length
      ? Object.assign({}, query, filter)
      : query;
  };

  return {
    updateIndexes,
    applyFiltering,
    clearField,
    clearAllFilters,
  };
}
