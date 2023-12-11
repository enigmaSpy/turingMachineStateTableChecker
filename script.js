const alphabetInput = document.querySelector(".form_alphabet");
const mainContainer = document.querySelector(".main");
const addButton = document.querySelector(".addState");
const tape = document.querySelector(".tape");

const turing = {
  alphabet: [],
  states: [],
};

const updateAlphabet = () => {
  const alphabet = alphabetInput.value.replace(",", "").split("");
  const alphabetSet = new Set(["#", ...alphabet]);
  turing.alphabet = [...alphabetSet];
};

const renderTable = () => {
  mainContainer.innerHTML = "";
  let tableHTML = "<thead><tr><th></th>";

  turing.states.forEach((state) => {
    tableHTML += `<th>${state.name}</th>`;
  });

  tableHTML += "</tr></thead><tbody>";

  turing.alphabet.forEach((symbol) => {
    tableHTML += `<tr><td>${symbol}</td>`;
    turing.states.forEach((state) => {
      tableHTML += `<td><input type="text" class="transitionInput" data-state="${state.name}" data-symbol="${symbol}"></td>`;
    });
    tableHTML += "</tr>";
  });

  tableHTML += "</tbody>";
  mainContainer.innerHTML = tableHTML;

  // Add event listeners after rendering the table
  const transitionInputs = document.querySelectorAll(".transitionInput");
  transitionInputs.forEach((input) => {
    input.addEventListener("input", () => {
      const value = input.value.split(",");
      const stateName = input.dataset.state;
      const symbol = input.dataset.symbol;

      const state = turing.states.find((s) => s.name === stateName);

      if (state) {
        const existingTransitionIndex = state.transitions.findIndex(
          (t) => t[symbol]
        );

        if (existingTransitionIndex !== -1) {
          state.transitions[existingTransitionIndex][symbol] = [...value];
        } else {
          state.transitions.push({
            [symbol]: [...value],
          });
        }

        console.log(turing.states);
      }
    });
  });
};


const addState = () => {
  const state = {
    name: `q${turing.states.length}`,
    transitions: [],
  };
  turing.states.push(state);
  renderTable();
};


alphabetInput.addEventListener("input", () => {
  updateAlphabet();
  renderTable();
});

addButton.addEventListener("click", addState);

// Initial rendering
updateAlphabet();
renderTable();
updateState();