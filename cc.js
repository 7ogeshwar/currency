document.addEventListener("DOMContentLoaded", function () {
    const select = document.querySelectorAll(".ii");
  let btn =document.getElementById('btn')
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
  
    function displayDropdown(res) {
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

    btn.addEventListener('click',()=>{
        
        let curr1=select[0].value
        let curr2=select[1].value
        let input=document.getElementById('amount').value;
        if(curr1 == curr2){
            alert("choose different currencies")
        }
        else{
            convert(curr1,curr2,input)
        }
        });
        function convert(curr1,curr2,input){
        const host = 'api.frankfurter.app';
        fetch(`https://${host}/latest?amount=${input}&from=${curr1}&to=${curr2}`)
          .then(resp => resp.json())
          .then((data) => {
            document.getElementById('result').value=Object.values(data.rates)[0]
          })}
  });
  


