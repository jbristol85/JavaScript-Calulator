var calculator = {
    values: [],
    displayCalculations: function(){
        document.getElementById("calculations").innerHTML = this.values;
    }
};
document.addEventListener("click", function(){
    calculator.values.push(event.target.id);
    calculator.displayCalculations();
});

