  var divId = 1; // Id para detectar as divs dos timers e seus elementos.
  var timer; // Timer que vai receber o setInterval para todos os timetaskers
  var language = [];

  function CreateTimer() { // só cria e salvas os timers
    divId++; // incremento da ID mestre
    var InputTxt = document.getElementById('TimerName'); // Capturo o texto do campo de input
    var divTxt = "<div class='stopwatch' id='"+divId+"'><p class='watch' id='temp"+divId+"'>(00:00:00)</p><p>"+InputTxt.value+" <br> <button id='Play"+divId+"' type='button' name='Play' onclick='PlayTimer("+divId+");'>"+language[3]+"</button> <button type='button' name='Reset' onclick='ResetTimer("+divId+");'>"+language[5]+"</button> <button type='button' name='Delete' onclick='DeleteTimer("+divId+");'>"+language[6]+"</button></div>";
    document.getElementById('body').innerHTML += divTxt; // Inxerta o html acima no html da pagina
    SaveTimers(divId,divTxt); // Salva a id mestre atual e seu texto html
  }

  function DeleteTimer(id) { // Apaga apenas o Timer selecionado da aba atual e manda para a aba historico
    var BtnGroupHistory = "<button id='Restore"+id+"' type='button' name='Restore' onclick='Restore("+id+");'>"+language[7]+"</button> <button type='button' name='Delete' onclick='HistoryDeleteTimer("+id+");'>"+language[6]+"</button>";
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
      document.getElementById(tempPlayId).innerHTML = language[3];
      clearInterval(timer); // para o setInterval assim parando o contador
      timer = null;
    }else {
      timer = setInterval(function() {if(segundos==59){segundos=0;minutos++;}else{segundos++;}if ((minutos == 59)&&(segundos==59)) {minutos=0; segundos=0;horas++;} update(segundos,minutos,horas,id)}, 1000); // chama o setInterval e atualiza o timer
      var tempPlayId = "Play"+id;
      document.getElementById(tempPlayId).innerHTML = language[4];

    }

  }

  function ResetTimer(id) { // Reseta o Timer selecionado ao sobre-escrever o texto do contador
    var tempId = "temp"+id;
    document.getElementById(tempId).innerHTML = "(00:00:00)";
    PlayTimer(id);
  }

  function LoadTimers(){ // Carregar os Timers
    ShowAddDiv();
    idiom();
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
    if (confirm(language[9])) {
      localStorage.clear();
    }
  }

  // History Session

  function ShowHistory(){ // Carregar os Timers do historico
    ClearView();
    var historyTxt = document.getElementById('history').innerHTML;
    if (historyTxt == language[2]) {
      LoadHistoryTimers();
      document.getElementById('history').innerHTML = language[8];
    }else {
      LoadTimers();
      document.getElementById('history').innerHTML = language[2];
      document.getElementById('TimerName').value = language[0];
    }
  }

  function HistoryDeleteTimer(id) { // Apaga apenas o Timer selecionado de vez
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
  var divAdd = document.getElementById("AddDiv"); // identifica timertask selecionado e o remove na linha seguinte
  if (divAdd != null) {
    divAdd.remove();
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
  var BtnGroupCurrent = "<button id='Play"+id+"' type='button' name='Play' onclick='PlayTimer("+id+");'>"+language[3]+"</button> <button type='button' name='Reset' onclick='ResetTimer("+id+");'>"+language[5]+"</button> <button type='button' name='Delete' onclick='DeleteTimer("+id+");'>"+language[6]+"</button>";
  var divTxt = localStorage.getItem(-id);
  var LastIndex = divTxt.lastIndexOf("<br>")+4; // +4 é o tamanho da string '<br>'
  divTxt = divTxt.slice(0,LastIndex) + BtnGroupCurrent;
  SaveTimers(id,divTxt);
  localStorage.removeItem(-id); // remove o timer selecionado do localStorage
  var elem = document.getElementById(id); // identifica timertask selecionado e o remove na linha seguinte
  elem.remove();
}

function idiom(){

  var idiom = (navigator.browserLanguage!=undefined)?  navigator.browserLanguage : navigator.language;
  console.log(idiom);
  if (idiom == "pt-BR") {
    language[0] = "Escreva o Nome do Temporizador";
    language[1] = "Limpar Memória";
    language[2] = "Histórico";
    language[3] = "Iniciar";
    language[4] = "Parar";
    language[5] = "Resetar";
    language[6] = "Apagar";
    language[7] = "Restaurar";
    language[8] = "Atual";
    language[9] = "Você realmente deseja Apagar os Temporizadores?";
  }else {
    language[0] = "Write the name of the timer";
    language[1] = "Clear Memory";
    language[2] = "History";
    language[3] = "Play";
    language[4] = "Stop";
    language[5] = "Reset";
    language[6] = "Delete";
    language[7] = "Restore";
    language[8] = "Current";
    language[9] = "Do you really want to erase all the timertasks?";
  }

  document.getElementById('TimerName').value = language[0];
  document.getElementById('Clear').innerHTML = language[1];
  document.getElementById('history').innerHTML = language[2];
}

function ShowAddDiv(){
  var div = "<div id='AddDiv'><input id='TimerName' type='text' name='TimerName' value='Escreva o Nome do Temporizador'><button type='button' name='AddTimer' onclick='CreateTimer();'>+</button></div>";
  document.getElementById('corpo').innerHTML = div;
}
  // V 1.6 Banco de dados
