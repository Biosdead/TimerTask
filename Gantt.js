var tasks = [
{"startDate":new Date("24 Oct 17 14:16:54 GMT 2017"),"endDate":new Date("24 Oct 17 14:17:13 GMT 2017"),"taskName":"Javascript","status":"SUCCEEDED"}];

// a variavel tasks não pode vir vazia a mesma tem que ser preenchida com um ponto inicial por isso dela está inicializada manualmente no inicio desse codigo


var flag = true; // variavel utilizada para verificar se é a primeira vez que uma tarefa foi inserida. Se for é aplicado um shift para apagar a posição zero da tasks que é a tarefa inserida manualmente no inico desse codigo

function LoadTasksFromHistoryTimers(){ // Carrega os dados salvos dos temporizadores finzalizados e os adiciona no Gantt
  if (localStorage.getItem("lastId") != null) {
    divId = localStorage.getItem("lastId");
    for (var i = 1; i <= divId; i++) {
        var idnegative = i*(-1);
		var JsonTemp = JSON.parse(localStorage.getItem(""+idnegative));
		console.log(JsonTemp);
      if (JsonTemp!=null) { 
		  addTaskFromTimerTask(JsonTemp.start,JsonTemp.stop,JsonTemp.category,JsonTemp.status);
      }
    }
  }
}

var taskStatus = {
    "SUCCEEDED" : "bar-succeeded",
    "FAILED" : "bar-failed",
    "RUNNING" : "bar-running",
    "KILLED" : "bar-killed"
};

var taskNames = [ "Doutorado", "Concurso", "Trade", "Javascript", "Outros"];

function SetTask(tarefas){
  tasks.push(tarefas);
}

tasks.sort(function(a, b) {
    return a.endDate - b.endDate;
});
var maxDate = tasks[tasks.length - 1].endDate;
tasks.sort(function(a, b) {
    return a.startDate - b.startDate;
});
var minDate = tasks[0].startDate;

var format = "%H:%M";
var timeDomainString = "1day";

var gantt = d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format).height(450).width(800);


gantt.timeDomainMode("fixed");
changeTimeDomain(timeDomainString);

gantt(tasks);

function changeTimeDomain(timeDomainString) {
    this.timeDomainString = timeDomainString;
    switch (timeDomainString) {
    case "1hr":
	format = "%H:%M:%S";
	gantt.timeDomain([ d3.time.hour.offset(getEndDate(), -1), getEndDate() ]);
	break;
    case "3hr":
	format = "%H:%M";
	gantt.timeDomain([ d3.time.hour.offset(getEndDate(), -3), getEndDate() ]);
	break;

    case "6hr":
	format = "%H:%M";
	gantt.timeDomain([ d3.time.hour.offset(getEndDate(), -6), getEndDate() ]);
	break;

    case "1day":
	format = "%H:%M";
	gantt.timeDomain([ d3.time.day.offset(getEndDate(), -1), getEndDate() ]);
	break;

    case "1week":
	format = "%a %H:%M";
	gantt.timeDomain([ d3.time.day.offset(getEndDate(), -7), getEndDate() ]);
	break;
	case "1mounth":
	format = "%a %H";
	gantt.timeDomain([ d3.time.day.offset(getEndDate(), -30), getEndDate() ]);
	break;		
    default:
	format = "%H:%M"

    }
    gantt.tickFormat(format);
    gantt.redraw(tasks);
}

function getEndDate() {
    var lastEndDate = Date.now();
    if (tasks.length > 0) {
	lastEndDate = tasks[tasks.length - 1].endDate;
    }

    return lastEndDate;
}

function addTask() {

    var lastEndDate = getEndDate();
    var taskStatusKeys = Object.keys(taskStatus);
    var taskStatusName = taskStatusKeys[Math.floor(Math.random() * taskStatusKeys.length)];
    var taskName = taskNames[Math.floor(Math.random() * taskNames.length)];

    tasks.push({
	"startDate" : d3.time.hour.offset(lastEndDate, Math.ceil(1 * Math.random())),
	"endDate" : d3.time.hour.offset(lastEndDate, (Math.ceil(Math.random() * 3)) + 1),
	"taskName" : taskName,
	"status" : taskStatusName
    });

    changeTimeDomain(timeDomainString);
    gantt.redraw(tasks);
};

function addTaskFromTimerTask(start,stop,category,status) { // interface para a adição de uma tarefa do timertask

    var lastEndDate = getEndDate();
    var taskName = category;

    tasks.push({
	"startDate" : new Date(start),
	"endDate" :  new Date(stop),
	"taskName" : taskName,
	"status" : status
    });
	
	if(flag){
		tasks.shift();
		flag = false;
	}

    changeTimeDomain(timeDomainString);
    gantt.redraw(tasks);
};

function removeTask() {
    tasks.pop();
    changeTimeDomain(timeDomainString);
    gantt.redraw(tasks);
};
