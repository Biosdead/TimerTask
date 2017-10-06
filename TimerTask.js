  var divId = 0;
  var timer;

  function CreateTimer() {
    divId++;
    var InputTxt = document.getElementById('TimerName');
    var divTxt = "<div class='stopwatch' id='"+divId+"'><p class='watch' id='temp"+divId+"'>(00:00:00)</p><p>"+InputTxt.value+" <br> <button type='button' name='Play' onclick='PlayTimer("+divId+");'>Play</button> <button type='button' name='Reset' onclick='ResetTimer("+divId+");'>Reset</button> <button type='button' name='Delete' onclick='DeleteTimer("+divId+");'>Delete</button></div>";
    document.getElementById('body').innerHTML += divTxt;
    SaveTimers(divId,divTxt);
  }

  function DeleteTimer(id) { // Apaga apenas o Timer selecionado
    localStorage.removeItem(id);
    var elem = document.getElementById(id);
    elem.remove();
  }

  function PlayTimer(id) {
    var tempId = "temp"+id;
    temp = document.getElementById(tempId).innerHTML;
    console.log(temp);
    console.log(id);
    var segundos = Number(temp.slice(7,9)),minutos = Number(temp.slice(4,6)),horas = Number(temp.slice(1,3));
    console.log("segundos "+segundos);
    console.log("minutos "+minutos);
    console.log("horas "+horas);
    if (timer!=null) {
      clearInterval(timer);
      timer = null;
    }else {
      timer = setInterval(function() {if(segundos==60){segundos=0;minutos++;}else{segundos++;}if (minutos == 60) {horas++;} update(segundos,minutos,horas,id)}, 1000);
    }

  }

  function ResetTimer(id) {
    var tempId = "temp"+id;
    document.getElementById(tempId).innerHTML = "(00:00:00)";
    PlayTimer(id);
  }

  function LoadTimers(){
    // Carregar os Timers
    if (localStorage.getItem("lastId") == null) {
      divId = 0;
    }else {
      divId = localStorage.getItem("lastId");
      for (var i = 0; i <= divId; i++) {
        var divTxt = localStorage.getItem(""+i);
        if (divTxt!=null) {
          document.getElementById('body').innerHTML += divTxt;
        }
      }
    }
  }



  function UpdateTimers(id,data){
    localStorage.setItem(id,data);
  }

  function SaveTimers(id,data){
    localStorage.setItem(id,data);
    localStorage.setItem("lastId",id);
  }

  function update(segundos,minutos,horas,id){
    console.log(id);
    var tempId = "temp"+id;
    if (segundos<10) {
      segundos = "0"+segundos;
    }
    if (minutos<10) {
      minutos = "0"+minutos;
    }
    if (horas<10) {
      horas = "0"+horas;
    }
    document.getElementById(tempId).innerHTML = "("+horas+":"+minutos+":"+segundos+")";

    console.log("<div class='stopwatch' id='"+id+"'>"+document.getElementById(id).innerHTML);
    UpdateTimers(id,"<div class='stopwatch' id='"+id+"'>"+document.getElementById(id).innerHTML);
  }

  function ClearMemory(){ // limpa todos os dados salvos no localStorage
    localStorage.clear();
  }
