const select = document.querySelectorAll<HTMLSelectElement>('.ii');

fetch('https://api.frankfurter.app/currencies')
  .then(res => res.json())
  .then(res => displayDropdown(res));

function displayDropdown(res: Record<string, string>): void {
  const curr = Object.entries(res);
  for (let i = 0; i < curr.length; i++) {
    const option = `<option value="${curr[i][0]}">${curr[i][0]}</option>`;
    select[0].innerHTML += option;
    select[1].innerHTML += option;
  }
}
