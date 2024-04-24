var select = document.querySelectorAll('.ii');
fetch('https://api.frankfurter.app/currencies')
    .then(function (res) { return res.json(); })
    .then(function (res) { return displayDropdown(res); });
function displayDropdown(res) {
    var curr = Object.entries(res);
    for (var i = 0; i < curr.length; i++) {
        var option = "<option value=\"".concat(curr[i][0], "\">").concat(curr[i][0], "</option>");
        select[0].innerHTML += option;
        select[1].innerHTML += option;
    }
}
