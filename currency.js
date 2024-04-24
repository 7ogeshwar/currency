document.addEventListener("DOMContentLoaded", function () {
    var select = document.querySelectorAll(".ii");
    var amountInput = document.getElementById('amount');
    var resultInput = document.getElementById('result');
    var btn = document.getElementById('btn');
    fetch("https://api.frankfurter.app/currencies")
        .then(function (res) {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    })
        .then(function (res) {
        console.log(res); // Check the response
        displayDropdown(res);
    })
        .catch(function (error) {
        console.error("Error fetching data:", error);
    });
    function displayDropdown(res) {
        if (!res) {
            console.error("Response is undefined or null");
            return;
        }
        var curr = Object.entries(res);
        for (var i = 0; i < curr.length; i++) {
            var option = "<option value=\"".concat(curr[i][0], "\">").concat(curr[i][0], "</option>");
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
        btn.addEventListener('click', function () {
            var curr1 = select[0].value;
            var curr2 = select[1].value;
            var input = amountInput.value;
            if (curr1 == curr2) {
                alert("choose different currencies");
            }
            else {
                convert(curr1, curr2, input);
            }
        });
    }
    else {
        console.error("Button element not found!");
    }
    function convert(curr1, curr2, input) {
        var host = 'api.frankfurter.app';
        fetch("https://".concat(host, "/latest?amount=").concat(input, "&from=").concat(curr1, "&to=").concat(curr2))
            .then(function (resp) { return resp.json(); })
            .then(function (data) {
            resultInput.value = String(Object.values(data.rates)[0]);
        })
            .catch(function (error) {
            console.error("Error converting currencies:", error);
        });
    }
});
