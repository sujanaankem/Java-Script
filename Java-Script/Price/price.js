alert("Evaluate the price");
console.log("page open");
function onClickCheck() {
    debugger;
    var Chocolateprice = Number(document.getElementById("price").value);
    var Boxquantity = Number(document.getElementById("quantity").value);
    var Boxes = Number(document.getElementById("boxes").value);
    var Expenses = Number(document.getElementById("expenses").value);
    var newSellingprice = Number(document.getElementById("sellingprice").value);
    var CostPrice = (Chocolateprice * Boxquantity * Boxes) + Expenses;
    var Sellingprice = (newSellingprice * Boxquantity * Boxes);
    if (Sellingprice > CostPrice) {
        result = "Profit";
        alert(result);
    }else{
         result = "Loss";
        alert(result);
    }

}
