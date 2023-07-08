import { cityData } from "./data/cityData";
import "./styles.css";

document.getElementById("app").innerHTML = `
<main>
<input id="search" id="search" placeholder="Enter text here"/>
<div id="suggestionBox"></div>
</main>
`;
//Vikash
(function () {
  const input = document.getElementById("search");
  const suggestionBox = document.getElementById("suggestionBox");

  const onFocus = (e) => {
    suggestionBox.style.display = "block";
    const div = document.createElement("div");
    div.innerText = "Please type something to see suggestions";
    suggestionBox.appendChild(div);
  };

  const onBlur = (e) => {
    if (e.target === input || e.target === suggestionBox) return;
    suggestionBox.style.display = "none";
  };

  const processSuggestions = (value, suggestionsArray) => {
    if (!value) {
      return;
    }
    const text = value.trim().replace(/\s/g, "");
    const filteredSuggestions = suggestionsArray.filter((name) =>
      name.toLowerCase().includes(text)
    );
    if (filteredSuggestions?.length > 0) {
      const list = document.createElement("div");
      filteredSuggestions.forEach((city) => {
        const listItems = document.createElement("p");
        listItems.style.cursor = "pointer";
        listItems.style.paddingLeft = "10px";
        listItems.innerText = city;
        list.appendChild(listItems);
      });

      suggestionBox.innerHTML = "";
      suggestionBox.appendChild(list);
    }
  };

  const onChange = (e) => {
    suggestionBox.innerHTML = "";
    const { value } = e.target;
    processSuggestions(value, cityData);
  };

  const onClick = (e) => {
    if (e.target === suggestionBox) return;
    const text = e.target.innerText;
    input.value = text;
    input.focus();
  };

  input.addEventListener("focus", onFocus);
  window.addEventListener("click", onBlur);
  input.addEventListener("keyup", onChange);
  suggestionBox.addEventListener("click", onClick);
})();
