const BASE_URL ="https://2024-03-06.currency-api.pages.dev/v1/currencies/";

  const dropdowns = document.querySelectorAll(".dropdown select");
  const btn = document.querySelector("form button");
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  // console.log(toCurr);
  const msg = document.querySelector(".msg");

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
    let currcode = element.value;
    let concode = countryList[currcode];
    let img = element.parentElement.querySelector("img");
    img.src =`https://flagsapi.com/${concode}/flat/64.png`;
  }

  const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = (data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]*parseInt(amount.value));
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  };
  
  btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
  });

  window.addEventListener("load", () => {
    updateExchangeRate();
  });
