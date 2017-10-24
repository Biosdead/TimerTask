function CategoryAlert(){
	this.retorno = "";
  this.render = function(){
    var winW = window.innerWidth;
    var winH = window.innerHeight;
    var dialogoverlay = document.getElementById('dialogoverlay');
    var dialogbox = document.getElementById('dialogbox');
    dialogoverlay.style.display = "block";
    dialogoverlay.style.height = winH+"px";
    dialogbox.style.left = (winW/2) - (550 * .5)+"px";
    dialogbox.style.top = "100px";
    dialogbox.style.display = "block";
    document.getElementById('dialogboxhead').innerHTML = "Categoria";
    document.getElementById('dialogboxbody').innerHTML = "Escolha qual categoria se enquadra esta tarefa?";
    document.getElementById('dialogboxfoot').innerHTML = '<button onclick="AlertCategory.Doutorado()">Doutorado</button><button onclick="AlertCategory.Concurso()">Concurso Público</button> <button onclick="AlertCategory.IASAI()">IASAI</button> <button onclick="AlertCategory.Javascript()">Javascript</button> <button onclick="AlertCategory.Trade()">Trade</button> <button onclick="AlertCategory.Outro()">Outro</button> <button onclick="AlertCategory.Cancel()">Cancel</button>';
  }
  this.Doutorado = function(){
	CreateTimer("Doutorado");
	this.CleanDialog(); 
  }
  this.Concurso = function(){
    CreateTimer("Concurso");
	this.CleanDialog();     
  }
  this.IASAI = function(){
    CreateTimer("IASAI");
	this.CleanDialog(); 
  }
  this.Trade = function(){
    CreateTimer("Trade");
	this.CleanDialog(); 
  }
  this.Javascript = function(){
    CreateTimer("Javascript");
	this.CleanDialog(); 
  }
  this.Outro = function(){
   	CreateTimer("Outro");
	this.CleanDialog();
  }
  this.Cancel = function(){
    this.CleanDialog();
  }
  this.CleanDialog = function(){
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";  
  }
}
var AlertCategory = new CategoryAlert();



function StatusAlert(){
	this.render = function(id){
    var winW = window.innerWidth;
    var winH = window.innerHeight;
    var dialogoverlay = document.getElementById('dialogoverlay');
    var dialogbox = document.getElementById('dialogbox');
    dialogoverlay.style.display = "block";
    dialogoverlay.style.height = winH+"px";
    dialogbox.style.left = (winW/2) - (550 * .5)+"px";
    dialogbox.style.top = "100px";
    dialogbox.style.display = "block";
    document.getElementById('dialogboxhead').innerHTML = "Status";
    document.getElementById('dialogboxbody').innerHTML = "Escolha qual estado se enquadra esta tarefa?";
    document.getElementById('dialogboxfoot').innerHTML = '<button onclick="AlertStatus.Sucedida('+id+')">Sucedida</button><button onclick="AlertStatus.Falida('+id+')">Falida</button><button onclick="AlertStatus.Morta('+id+')">Morta</button><button onclick="AlertStatus.Cancel()">Cancel</button>';
  }
  this.Sucedida = function(idDelete){
	DeleteTimer(idDelete,"SUCCEEDED");  
    this.CleanDialog();
  }
  this.Falida = function(idDelete){
	DeleteTimer(idDelete,"FAILED");  
    this.CleanDialog();
  }
  this.Morta = function(idDelete){
	DeleteTimer(idDelete,"KILLED");  
    this.CleanDialog();
  }
  this.Cancel = function(){
    this.CleanDialog();
  }
  this.CleanDialog = function(){
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";  
  }
}
var AlertStatus = new StatusAlert();
