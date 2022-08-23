import React, { useState } from "react";

function Category({ handleChoice }) {
  const [categories, setCategories] = useState([
    { id: "all", named: "Всі" },
    { id: "house", named: "Будинки" },
    { id: "flat", named: "Квартири" },
    { id: "room", named: "Кімнати" },
    { id: "apartment", named: "Апартаменти" },
    { id: "commercial", named: "Комерційна нерухомість" },
  ]);

  return (
    <>
      {categories.map((category) => (
        <li key={category.id}>
          <a id={category.id} onClick={() => handleChoice(category.id)}>
            {category.named}
          </a>
        </li>
      ))}
    </>
  );
}

export default Category;
