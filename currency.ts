document.addEventListener("DOMContentLoaded", function () {
  const select = document.querySelectorAll<HTMLSelectElement>(".ii");
  const amountInput = document.getElementById('amount') as HTMLInputElement;
  const resultInput = document.getElementById('result') as HTMLInputElement;
  const btn = document.getElementById('btn');

  fetch("https://api.frankfurter.app/currencies")
      .then((res) => {
          if (!res.ok) {
              throw new Error("Network response was not ok");
          }
          return res.json();
      })
      .then((res) => {
          console.log(res); // Check the response
          displayDropdown(res);
      })
      .catch((error) => {
          console.error("Error fetching data:", error);
      });

  function displayDropdown(res: any): void {
      if (!res) {
          console.error("Response is undefined or null");
          return;
      }

      let curr = Object.entries(res);

      for (let i = 0; i < curr.length; i++) {
          let option = `<option value="${curr[i][0]}">${curr[i][0]}</option>`;
          console.log(option);
          if (select[0]) {
              select[0].innerHTML += option;
          }
          if (select[1]) {
              select[1].innerHTML += option;
          }
      }
  }
  if (btn) {
    btn.addEventListener('click', () => {
        let curr1 = select[0].value;
        let curr2 = select[1].value;
        let input = amountInput.value;
        if (curr1 == curr2) {
            alert("choose different currencies");
        } else {
            convert(curr1, curr2, input);
        }
    });
} else {
    console.error("Button element not found!");
}

  function convert(curr1: string, curr2: string, input: string): void {
      const host = 'api.frankfurter.app';
      fetch(`https://${host}/latest?amount=${input}&from=${curr1}&to=${curr2}`)
          .then(resp => resp.json())
          .then((data) => {
              resultInput.value = String(Object.values(data.rates)[0]);
          })
          .catch((error) => {
              console.error("Error converting currencies:", error);
          });
  }
});
