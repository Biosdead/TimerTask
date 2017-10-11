  var divId = 1; // Id para detectar as divs dos timers e seus elementos.
  var timer; // Timer que vai receber o setInterval para todos os timetaskers


  function CreateTimer() { // só cria e salvas os timers
    divId++; // incremento da ID mestre
    var InputTxt = document.getElementById('TimerName'); // Capturo o texto do campo de input
    var divTxt = "<div class='stopwatch' id='"+divId+"'><p class='watch' id='temp"+divId+"'>(00:00:00)</p><p>"+InputTxt.value+" <br> <button id='Play"+divId+"' type='button' name='Play' onclick='PlayTimer("+divId+");'>Play</button> <button type='button' name='Reset' onclick='ResetTimer("+divId+");'>Reset</button> <button type='button' name='Delete' onclick='DeleteTimer("+divId+");'>Delete</button></div>";
    document.getElementById('body').innerHTML += divTxt; // Inxerta o html acima no html da pagina
    SaveTimers(divId,divTxt); // Salva a id mestre atual e seu texto html
  }

  function DeleteTimer(id) { // Apaga apenas o Timer selecionado da aba atual e manda para a aba historico
    var BtnGroupHistory = "<button id='Restore"+id+"' type='button' name='Restore' onclick='Restore("+id+");'>Restore</button> <button type='button' name='Delete' onclick='HistoryDeleteTimer("+id+");'>Delete</button>";
    var divIdNegative = id*(-1);
    var divTxt = localStorage.getItem(""+id);
    var LastIndex = divTxt.lastIndexOf("<br>")+4; // +4 é o tamanho da string '<br>'
    divTxt = divTxt.slice(0,LastIndex) + BtnGroupHistory;
    SaveTimers(divIdNegative,divTxt);
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
      timer = setInterval(function() {if(segundos==59){segundos=0;minutos++;}else{segundos++;}if ((minutos == 59)&&(segundos==59)) {minutos=0; segundos=0;horas++;} update(segundos,minutos,horas,id)}, 1000); // chama o setInterval e atualiza o timer
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
      divId = 1;
    }else { // Caso contrario, recuperar o lastId e varer todos as ids para plota-las no html ou para passar para a proxima div
      divId = localStorage.getItem("lastId");
      for (var i = 1; i <= divId; i++) {
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
    localStorage.setItem("lastId",divId); // Salva a ultima ID para ajudar no LoadTimers
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
    if (confirm("Do you really want to erase all the timertasks?")) {
      localStorage.clear();
    }
  }

  // History Session

  function ShowHistory(){ // Carregar os Timers do historico
    ClearView();
    var historyTxt = document.getElementById('history').innerHTML;
    if (historyTxt == "History") {
      LoadHistoryTimers();
      document.getElementById('history').innerHTML = "Current";
    }else {
      LoadTimers();
      document.getElementById('history').innerHTML = "History";
    }
  }

  function HistoryDeleteTimer(id) { // Apaga apenas o Timer selecionado de vez
    console.log("idH " + id);
    localStorage.removeItem(-id); // remove o timer selecionado do localStorage
    var elem = document.getElementById(id); // identifica timertask selecionado e o remove na linha seguinte
    elem.remove();
  }


  function ClearView() { // Manda os dados para a aba atual
    var divId = localStorage.getItem("lastId");
    if (localStorage.getItem("lastId") != null){ // Caso contrario, recuperar o lastId e varer todos as ids para plota-las no html ou para passar para a proxima div
      for (var i = 1; i <= divId; i++) {
        var elem = document.getElementById(i); // identifica timertask selecionado e o remove na linha seguinte
        if (elem != null) {
          elem.remove();
        }
  }
}
}

function LoadHistoryTimers(){
  if (localStorage.getItem("lastId") == null) { // Se o lastId é nulo, iniciar o divId mestre
    divId = 1;
  }else { // Caso contrario, recuperar o lastId e varer todos as ids para plota-las no html ou para passar para a proxima div
    divId = localStorage.getItem("lastId");
    for (var i = 1; i <= divId; i++) {
      var idnegative = i*(-1);
      var divTxt = localStorage.getItem(""+idnegative);
      if (divTxt!=null) {
        document.getElementById('body').innerHTML += divTxt;
      }
    }
  }
}

function Restore(id){
  var BtnGroupCurrent = "<button id='Play"+id+"' type='button' name='Play' onclick='PlayTimer("+id+");'>Play</button> <button type='button' name='Reset' onclick='ResetTimer("+id+");'>Reset</button> <button type='button' name='Delete' onclick='DeleteTimer("+id+");'>Delete</button>";
  console.log("iddd " +id);
  var divTxt = localStorage.getItem(-id);
  console.log("tx " +divTxt);
  var LastIndex = divTxt.lastIndexOf("<br>")+4; // +4 é o tamanho da string '<br>'
  divTxt = divTxt.slice(0,LastIndex) + BtnGroupCurrent;
  SaveTimers(id,divTxt);
  localStorage.removeItem(-id); // remove o timer selecionado do localStorage
  var elem = document.getElementById(id); // identifica timertask selecionado e o remove na linha seguinte
  elem.remove();
}
  // Versão 1.2 Historico e Restaurar feitos
