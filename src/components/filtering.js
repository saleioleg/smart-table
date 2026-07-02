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
    if (action?.name === "clear") {
      const fieldName = action.dataset?.field;
      if (fieldName) {
        const input = Object.values(elements).find(
          (el) => el?.name === fieldName,
        );
        if (input) input.value = "";
      }
      return query;
    }

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
  };

  return {
    updateIndexes,
    applyFiltering,
    clearField,
    clearAllFilters,
  };
}
