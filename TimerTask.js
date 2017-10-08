  var divId = 0; // Id para detectar as divs dos timers e seus elementos.
  var timer; // Timer que vai receber o setInterval para todos os timetaskers

  function CreateTimer() { // só cria e salvas os timers
    divId++; // incremento da ID mestre
    var InputTxt = document.getElementById('TimerName'); // Capturo o texto do campo de input
    var divTxt = "<div class='stopwatch' id='"+divId+"'><p class='watch' id='temp"+divId+"'>(00:00:00)</p><p>"+InputTxt.value+" <br> <button id='Play"+divId+"' type='button' name='Play' onclick='PlayTimer("+divId+");'>Play</button> <button type='button' name='Reset' onclick='ResetTimer("+divId+");'>Reset</button> <button type='button' name='Delete' onclick='DeleteTimer("+divId+");'>Delete</button></div>";
    document.getElementById('body').innerHTML += divTxt; // Inxerta o html acima no html da pagina
    SaveTimers(divId,divTxt); // Salva a id mestre atual e seu texto html
  }

  function DeleteTimer(id) { // Apaga apenas o Timer selecionado
    localStorage.removeItem(id); // remove o timer selecionado do localStorage
    var elem = document.getElementById(id); // identifica timertask selecionado e o remove na linha seguinte
    elem.remove();
  }

  function PlayTimer(id) {
    var tempId = "temp"+id; // usada para selecionar o timer
    temp = document.getElementById(tempId).innerHTML;
    var segundos = Number(temp.slice(7,9)),minutos = Number(temp.slice(4,6)),horas = Number(temp.slice(1,3)); // Captura apenas os dados numericos do timer e os converte os valores de string para numeros
    if (timer!=null) {
      var tempPlayId = "Play"+id; // Usado para selecionar o butão Play e colocar Start ou Stop
      document.getElementById(tempPlayId).innerHTML = "Play";
      clearInterval(timer); // para o setInterval assim parando o contador
      timer = null;
    }else {
      timer = setInterval(function() {if(segundos==60){segundos=0;minutos++;}else{segundos++;}if (minutos == 60) {minutos=0;horas++;} update(segundos,minutos,horas,id)}, 1000); // chama o setInterval e atualiza o timer
      var tempPlayId = "Play"+id;
      document.getElementById(tempPlayId).innerHTML = "Stop";

    }

  }

  function ResetTimer(id) { // Reseta o Timer selecionado ao sobre-escrever o texto do contador
    var tempId = "temp"+id;
    document.getElementById(tempId).innerHTML = "(00:00:00)";
    PlayTimer(id);
  }

  function LoadTimers(){ // Carregar os Timers
    if (localStorage.getItem("lastId") == null) { // Se o lastId é nulo, iniciar o divId mestre
      divId = 0;
    }else { // Caso contrario, recuperar o lastId e varer todos as ids para plota-las no html ou para passar para a proxima div
      divId = localStorage.getItem("lastId");
      for (var i = 0; i <= divId; i++) {
        var divTxt = localStorage.getItem(""+i);
        if (divTxt!=null) {
          document.getElementById('body').innerHTML += divTxt;
        }
      }
    }
  }



  function UpdateTimers(id,data){ // Recebe e atualiza a div selecionada no localStorage a cada segundo do setInterval
    localStorage.setItem(id,data);
  }

  function SaveTimers(id,data){ // Salva no localStorage a div criada
    localStorage.setItem(id,data); // Método exclusivo do CreateTimer
    localStorage.setItem("lastId",id); // Salva a ultima ID para ajudar no LoadTimers
  }

  function update(segundos,minutos,horas,id){ // Padroniza o timer em HH:mm:ss e a função que é chamada a cada ciclo do setInterval
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
    UpdateTimers(id,"<div class='stopwatch' id='"+id+"'>"+document.getElementById(id).innerHTML);
  }

  function ClearMemory(){ // limpa todos os dados salvos no localStorage
    localStorage.clear();
  }

  // Versão 1.1
