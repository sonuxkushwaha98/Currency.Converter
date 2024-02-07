const BaseURL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
const dropdowns=document.querySelectorAll(".dropdown select")
const btn= document.querySelector(".btn")
const formCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")
const msg=document.querySelector(".msg")

for (let select of dropdowns) {
    for(currcode in countryList){
        let newOPtions=document.createElement("option")
        newOPtions.innerText=currcode;
        newOPtions.value=currcode;
        if(select.name==="from"&& currcode==="USD"){
            newOPtions.selected="selected"
        }else if (select.name==="to"&& currcode==="INR") {
            newOPtions.selected="selected"
        } 
        select.append(newOPtions);
    }
   select.addEventListener("change",(evt)=>{
    updateflag(evt.target);
   });
}

const updateflag=(element)=>{
    let currCode=element.value;
    let countrycode=countryList[currCode]
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`
    let img= element.parentElement.querySelector("img");
    img.src=newSrc;
}
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amntVal=amount.value;
    if (amntVal===""||amntVal<1) {
        amntVal=1;
        amount.value="1"
    }
    const URL=`${BaseURL}/${formCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response= await fetch(URL)
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    let finalValue=amntVal*rate;
    msg.innerText=`${amntVal} ${formCurr.value} = ${finalValue} ${toCurr.value}`
   
})