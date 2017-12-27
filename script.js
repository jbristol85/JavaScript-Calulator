var calculator = {
    displayValues: [],
    resetValues: [],
    evalValues: [],
    currentValue: [],
    total: "",
    hitEquals: false,
    displayInputs: function() {
        document.getElementById("inputDisplay").innerHTML = this.displayValues.join('');

    },
    calculations: function() {
        var operatorMap = {
            "*": "multiply",
            "/": "divide",
            "+": "add",
            "-": "subtract",
            "^": "exponent"
        };
        var operators = {
            multiply: function(num1, num2) {
                // console.log("multiply function");
                return num1 * num2;
            },
            divide: function(num1, num2) {
                if (num2 == 0) {
                    alert("err");
                }
                else {
                    // console.log("divide function");
                    return num1 / num2;
                }
            },
            addition: function(num1, num2) {
                // console.log("add function");
                return num1 + num2;
            },
            subtract: function(num1, num2) {
                // console.log("subtract function");
                return num1 - num2;
            },
            exponent: function(num1, num2) {
                // console.log("exponent function");
                return Math.pow(num1, num2);
            },
        };


        function operate(arr) {
            // console.log("arr", arr)
            var indexes = [];
            arr.forEach(function(value, index) {
                if (isNaN(value)) {
                    indexes.push(index);
                }

            });

            if (indexes.length === 0) {
                calculator.total = calculator.evalValues;
                calculator.displayTotal();
            }

            else if (calculator.evalValues.indexOf("^") > -1) {
                var exponentIndex = arr.indexOf("^");
                var exponentResult = operators.exponent(parseFloat(calculator.evalValues[exponentIndex - 1]), parseFloat(calculator.evalValues[exponentIndex + 1]));
                calculator.evalValues.splice(exponentIndex - 1, 3, exponentResult.toString());
                operate(calculator.evalValues);
            }
            else if (calculator.evalValues.indexOf("*") > -1) {
                var multiplyIndex = arr.indexOf("*");
                var multiplyResult = operators.multiply(parseFloat(calculator.evalValues[multiplyIndex - 1]), parseFloat(calculator.evalValues[multiplyIndex + 1]));
                calculator.evalValues.splice(multiplyIndex - 1, 3, multiplyResult.toString());
                operate(calculator.evalValues);
            }
            else if (calculator.evalValues.indexOf("/") > -1) {
                var divideIndex = arr.indexOf("/");
                var divideResult = operators.divide(parseFloat(calculator.evalValues[divideIndex - 1]), parseFloat(calculator.evalValues[divideIndex + 1]));
                calculator.evalValues.splice(divideIndex - 1, 3, divideResult.toString());
                operate(calculator.evalValues);

            }
            else if (calculator.evalValues.indexOf("+") > -1) {
                var addIndex = arr.indexOf("+");
                var addResult = operators.addition(parseFloat(calculator.evalValues[addIndex - 1]), parseFloat(calculator.evalValues[addIndex + 1]));
                calculator.evalValues.splice(addIndex - 1, 3, addResult.toString());
                operate(calculator.evalValues);
            }
            else if (calculator.evalValues.indexOf("-") > -1) {
                var subtractIndex = arr.indexOf("-");
                var subtractResult = operators.subtract(parseFloat(calculator.evalValues[subtractIndex - 1]), parseFloat(calculator.evalValues[subtractIndex + 1]));
                calculator.evalValues.splice(subtractIndex - 1, arr.length, subtractResult.toString());
                operate(calculator.evalValues);
            }

        }
        operate(calculator.evalValues);
    },
    displayTotal: function(total) {
        if (calculator.total == "") {
            document.getElementById("results").innerHTML = "";
        }
        else
            document.getElementById("results").innerHTML = (calculator.total).toLocaleString();
    }
};

var keys = document.getElementsByClassName('keys');
for (var i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", function() {
        if (calculator.currentValue.includes(".")) {
            // console.log(calculator.evalValues);
            // console.log(calculator.currentValue);
        }

        else if (isNaN(calculator.currentValue[calculator.currentValue.length - 1])) {
            calculator.evalValues.push(calculator.currentValue.join(""));
            calculator.currentValue = [];
        }
        calculator.displayValues.push(event.target.id);
        calculator.currentValue.push(event.target.id);

        if (isNaN(calculator.evalValues[-1])) {

            calculator.evalValues.pop();

            calculator.evalValues.push(calculator.currentValue.join(""));
        }


        calculator.displayInputs();
    }, false);

}
var operator = document.getElementsByClassName('operator');

for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function() {

        calculator.currentValue = [];

        calculator.displayValues.push(event.target.id);
        calculator.currentValue.push(event.target.id);
        if (calculator.currentValue.includes(".") || !isNaN(calculator.evalValues[-1])) {

            calculator.evalValues.push(event.target.id);
        }
        else {
            calculator.evalValues.push(calculator.currentValue.join(""));
        }

        if (calculator.hitEquals) {
            calculator.displayValues = [];
            calculator.displayValues.push(calculator.total.join(""));
        }

        calculator.hitEquals = false;
        calculator.displayInputs();
        // calculator.calculations()
        // console.log(calculator.evalValues)
        // calculator.calculations();
    }, false);

}

document.getElementById("+-").onclick = function() {
    console.log(calculator.currentValue);
    var negative = calculator.currentValue.join("") * -1;
    console.log(negative);
    calculator.currentValue = [];
    calculator.currentValue.push(negative.toString());
    console.log(calculator.currentValue);
    calculator.evalValues.pop();
    calculator.evalValues.push(calculator.currentValue);
    console.log(calculator.evalValues);

    var index = calculator.displayValues.join("").lastIndexOf(Math.abs(calculator.currentValue.join("")));
    calculator.displayValues.splice(index, 0, "-");
    calculator.displayInputs();
};


document.getElementById("equals").onclick = function() {
    calculator.hitEquals = true;
    // if(calculator.currentValue.includes(".")){
    //     // calculator.evalValues.push(calculator.currentValue.join(""))
    //     // calculator.evalValues.shift();
    // }
    calculator.calculations();

};
document.getElementById("c").onclick = function() {

    calculator.currentValue = [];
    if (calculator.hitEquals) {
        calculator.currentValue = [];
        calculator.displayValues = [];
        calculator.resetValues = [];
        calculator.evalValues = [];
        calculator.total = "";
        calculator.displayInputs();
        calculator.displayTotal();

    }
    else {
        calculator.displayValues.pop();
        calculator.evalValues.pop();

    }
    calculator.hitEquals = false;
    calculator.displayInputs();
    // calculator.calculations();
};
document.getElementById("ce").onclick = function() {
    calculator.currentValue = [];
    calculator.displayValues = [];
    calculator.resetValues = [];
    calculator.evalValues = [];
    calculator.total = "";
    calculator.displayInputs();
    calculator.displayTotal();
    calculator.hitEquals = false;
};



// function parenthesis(arr){
//     console.log("parenthesis", arr)
//      var openParen = calculator.evalValues.indexOf("(");
//         var closeParen = calculator.evalValues.indexOf(")");
//         console.log("parens", openParen, closeParen);
//         var parenOperation = calculator.evalValues.slice(openParen +1, closeParen);
//         console.log(parenOperation);
//         // var parenOperationSplit = parenOperation.split("");
//         var result = operate(parenOperation);
//         // var parenOperator = regExp.exec(parenOperation);
//         // console.log(parenOperator);
//         // var parenOperationSplit = parenOperation.split(regExp);
//         // console.log(parenOperationSplit);
//         // var parenMapped = operatorMap[parenOperator[0][0]];
//         // console.log(parenMapped);
//         // var result = operators[parenMapped](parseFloat(parenOperationSplit[0]), parseFloat(parenOperationSplit[1]));
//         console.log(result);
//         console.log("openparenLength", parenOperation.length)
//         console.log("eval",calculator.evalValues)

//         calculator.evalValues.splice(openParen, closeParen - openParen, operate(parenOperation).toString())
//         console.log("eval",calculator.evalValues)
//         // calculator.values.splice(openParen, parenOperation.length - 1);
//         // calculator.operatorsPushed.splice(calculator.operatorsPushed.indexOf("("), calculator.operatorsPushed.indexOf(")"));
//         // calculator.evalValues.push(result);
//         // operate();
// }
// else if (arr.indexOf("(") > -1 && arr.indexOf(")") > -1) {
//      var openParen = calculator.evalValues.indexOf("(");
//     var closeParen = calculator.evalValues.indexOf(")");
//     console.log("parens", openParen, closeParen);
//     var parenOperation = calculator.evalValues.slice(openParen +1, closeParen);
//     console.log(parenOperation);
//   parenthesis(parenOperation);
// }