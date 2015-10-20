$(document).ready(function() {
  $(".numeric").keypress(function (e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
    alert("Invalid input: only NUMBERS allowed");
    return false;
    }
  });
  $(".btn-success").hide();
  $(".btn-danger").hide();
  var func, answer=true;
    function minimum(num1, num2, num3) {
      var minimum = (num1 < num2) ? num1 : num2;
      minimum = (minimum < num3) ? minimum : num3;
      return minimum;
    };
    function maximum(num1, num2, num3) {
      var maximum = (num1 > num2) ? num1 : num2;
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
      $(".functions input").removeClass("active");
      $(this).addClass("active");
    });
  $(".check").click(function(){
      var num1 = parseInt($("#Number1").val(), 10),
        num2 = parseInt($("#Number2").val(), 10),
        num3 = parseInt($("#Number3").val(), 10),
        right4 = $("#checkbox1").val()
        right5 = $("#checkbox3").val()
        insert = parseInt($("#result").val(), 10),
        answer = true,
        results = amount(func, num1, num2, num3);
      answer = answer && (insert == results);
      answer = answer && ($(".quest1 input[type=radio]:checked").val() == 2);
      answer = answer && ($(".quest2 input[type=radio]:checked").val() == 2);
      answer = answer && ($(".quest3 input[type=radio]:checked").val() == 1);
      var tmp = $("input[type=checkbox]:checked");
      for (var i = 0; i < tmp.length; i++)   {
        if(($(tmp[i]).val() == right4)||($(tmp[i]).val() == right5)) {
          answer = answer && true;
        } else {
          answer = answer && false;
        }
      }
      if (answer == true) {
        $(".btn-success").show();
        $(".btn-danger").hide();
      } else if (answer == false) { 
        $(".btn-success").hide();
        $(".btn-danger").show();
      }
  });

  $("input").click(function() {
   $(".btn-success, .btn-danger").hide();
  });
  $(".answer").click(function(){
    var answer = "",
      num1 = parseInt($("#Number1").val(), 10),
      num2 = parseInt($("#Number2").val(), 10),
      num3 = parseInt($("#Number3").val(), 10),
      results = amount(func, num1, num2, num3),
      answer = answer + "Function: " + func;
      answer = answer + "("+num1+", "+ num2+", "+ num3+")";
      answer = answer + " = "+results+ "\n";
      answer = answer + "\n" + getQuestionsAnswer(".quest1", 1) + "\n"; 
      answer = answer + "\n" + getQuestionsAnswer(".quest2", 1) + "\n"; 
      answer = answer + "\n" + getQuestionsAnswer(".quest3", 0) + "\n"; 
      answer = answer + "\n" + getCheckboxAnswer(".quest4",[0, 2]); 
      alert(answer);
    });
    function getCheckboxAnswer(className, indexes)  {
      var i,  answer = $(className + ">label").text();
      for (i = 0; i < indexes.length; i++) {
        answer += $(className + " input[type=checkbox]:eq(" + indexes[i] + ")+span").text();
      }
      return answer
    }


  function getQuestionsAnswer(className, index) {
   return $(className + ">label").text() + "\n" + $(className + " input[type=radio]:eq(" + index + ")+span").text(); 
  }
  
});
