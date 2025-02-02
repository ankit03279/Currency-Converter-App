const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


  const dropdowns = document.querySelectorAll(".dropdown select");
  const btn = document.querySelector("form button");
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");

  for (let select of dropdowns){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText =currcode;
        newOption.value = currcode;
        if (select.name === "From" && currcode === "INR") {
            newOption.selected = "selected";
          } else if (select.name === "To" && currcode === "USD") {
            newOption.selected = "selected";
          }
        select.append(newOption);

      select.addEventListener("change" , (evt) =>{
        updateflag(evt.target);
      });
    }
  }

  const updateflag = (element)=>{
    console.log(element.value);
    let currcode = element.value;
    let concode = countryList[currcode];
    let img = element.parentElement.querySelector("img");
    img.src =`https://flagsapi.com/${concode}/flat/64.png`;
  }

  btn.addEventListener("click" , async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountvalue = amount.value;
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    console.log(rate);
  });
  
