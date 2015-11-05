/* your code should go in this file */

/*
 * The data is available in the array *data*
 * Each element of the array has the following structure:
 *  {
 *    word_en : "Apple",  // word in english
 *    word_de : "Apfel"   // word in german
 *  }
 */

var tmpl = '<li id="ID">' +
           ' <h3>WORD</h3>' +
           ' <h3 class="solution">SOLUTION</h3>'+
           '</li> ';

var correct = 0;
var current = 0;
var choice_v = "";

function choice() {
  $(".choice").show();
  $(".solution").hide();
  $(".options").hide();
  $(".final").hide();

  $(".choice .E-G").on("click", function() {
    choice_v = "E-G";
  });

  $(".choice .G-E").on("click", function() {
    choice_v = "G-E";
  });

  $(".choice").on("click", function() {
    $(".choice").hide();
    init();
    newWord();
  });
}

function init() {
  for (var i=0; i<data.length; i++) {
    if (choice_v == "E-G") {
      $(".cards").append(tmpl.replace("ID",i+1)
                             .replace("WORD",data[i].word_en)
                             .replace("SOLUTION",data[i].word_de));
    } else if (choice_v == "G-E") {
      $(".cards").append(tmpl.replace("ID",i+1)
                             .replace("WORD",data[i].word_de)
                             .replace("SOLUTION",data[i].word_en));
    }
  }
}

function newWord() {
  $(".solution").hide();
  $(".options").hide();
  $(".final").hide();
  $(".cards #"+current).removeClass("current");
  current++;
  $(".cards #"+current).addClass("current");
}

function results() {
  $(".cards").hide();
  $(".options").hide();
  $(".final").show();
  $(".final #tot-good").text(correct);
  $(".final #tot").text(data.length);
}

$(document).ready(function(){
    choice();

    $(".cards").on("click", ".current h3", function() {
      $(this.id+".solution").show();
      $(".options").show();
    });

    $(".options .btn").on("click", function() {
      if ((current) < data.length) {
        newWord();
      } else {
        results();
      }
    });

    $(".options .opt-correct").on("click", function() {
      correct++;
    });
});
