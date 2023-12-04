const alphabetInput = document.querySelector(".form_alphabet");
const mainContainer = document.querySelector(".main");
const addButton = document.querySelector(".addState");

const createAlphabetColumn = () => {
  if (alphabetInput.value === 0) return;

  const alphabetChars = [
    "Q",
    "Φ",
    ...alphabetInput.value
      .replace(/,/g, "")
      .split("")
      .filter((char) => char !== ""),
  ];

  const alphabetColumn = alphabetChars
    .map((item) => {
      return `<tr class="turingColumn">
                <td>${item}</td>
            </tr>`;
    })
    .join("");

  mainContainer.innerHTML = alphabetColumn;
};

let q = 0;

const createNewState = () => {
  const turingColumns = document.querySelectorAll(".turingColumn");
  turingColumns.forEach((column, index) => {
    if (index === 0) {
      column.innerHTML += `<td>q${q}</td>`;
    } else {
      column.innerHTML += "<td><input type='text' maxlength='5'></td>";
    }
  });

  q++;
};

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (mainContainer.innerHTML === "") return false;

  createNewState();
});

alphabetInput.addEventListener("input", () => {
  createAlphabetColumn();
});
