$(document).ready(function() {
    $(".btn-success").hide();
    $(".btn-danger").hide();
	var num1, num2, num3, func, answer=true;
    num1 = parseInt($("#Number1").val(), 10);
    num2 = parseInt($("#Number2").val(), 10);
    num3 = parseInt($("#Number3").val(), 10);
		function minimum(num1, num2, num3) {
			var minimum = (num1 < num2) ? num1 : num2;
			  minimum = (minimum < num3) ? minimum : num3;
			return minimum;
		};
		function maximum(num1, num2, num3) {
			var maximum= (num1 > num2) ? num1 : num2;
			maximum = (maximum > num3) ? maximum : num3;
			return maximum;
		};
		function prod(num1, num2, num3)  {
		  return num1 * num2 * num3;
		};
		function sum(num1, num2, num3) {
		  return num1 + num2 + num3;
		};
		function amount(func, num1, num2, num3) {
      var functionResult;
			if (func == 'Max') {
			  functionResult = maximum(num1, num2, num3);
			} else if (func == 'Min') {
			  functionResult = minimum(num1, num2, num3);
			} else if (func == 'Prod') {
			  functionResult = prod(num1, num2, num3);
			} else if (func == 'Sum') {
			  functionResult = sum(num1, num2, num3);
			};
			return functionResult;
		};
  $(".functions input").click(function() {
		  func = $(this).val();
		});
  $(".check").click(function(){
      var num1 = parseInt($("#Number1").val(), 10),
        num2 = parseInt($("#Number2").val(), 10),
        num3 = parseInt($("#Number3").val(), 10),
        right1 = $("#optionsRadios2").val(),
        right2 = $("#optionsRadios4").val(),
        right3 = $("#optionsRadios7").val(),
        right4 = $("#checkbox1").val(),
        right5 = $("#checkbox3").val()
        insert = parseInt($("#result").val(), 10),
        answer = true,
        results = amount(func, num1, num2, num3);
      answer = answer && (insert == results);
      answer = answer && ($(".quest1 input[type=radio]:checked").val() == right1);
      answer = answer && ($(".quest2 input[type=radio]:checked").val() == right2);
      answer = answer && ($(".quest3 input[type=radio]:checked").val() == right3);
      var tmp = $("input[type=checkbox]:checked");
      for (var i = 0; i < tmp.length; i++)   {
        if(($(tmp[i]).val() == right4)||($(tmp[i]).val() == right5)) {
          answer = answer && true;
        } else {
          answer = answer && false;
        }
      }
      alert(answer)
   		if (answer==true) {
			  $(".btn-success").show();
			  $(".btn-danger").hide();
			} else { 
			  $(".btn-success").hide();
			  $(".btn-danger").show();
			};
	  
	});
  $(".answer").click(function(){
    var answer = "",
			num1 = parseInt($("#Number1").val(), 10),
			num2 = parseInt($("#Number2").val(), 10),
			num3 = parseInt($("#Number3").val(), 10),
			results = amount(func, num1, num2, num3),
      right1 = $("#optionsRadios2").val(),         
      right2 = $("#optionsRadios4").val(),
      right3 = $("#optionsRadios7").val(),
      right = $("label#black").val();
      answer = answer + "Function: " + func;
      answer = answer + "("+num1+", "+ num2+", "+ num3+")";
      answer = answer + " = "+results+ "\n";
      answer = answer + "\nWhich of the following is correct?: " + right1+ "\n"; 
      answer = answer + "\nWith jQuery, look at the following"+ "\n selector: $(*div.intro).What does it select?:  " + right2 + "\n"; 
      answer = answer + "\nLook at the following selector:" + "\n$('div p').What does it select?: "+ right3 + "\n"; 
      answer = answer + "\nWhat is the correct jQuery code to set the"+ "\n background color of all p elements to black?: "+ $("input[type=checkbox]:eq(2)+span").text() +$("input[type=checkbox]:eq(0)+span").text(); 
      alert(answer);
	  });
});
