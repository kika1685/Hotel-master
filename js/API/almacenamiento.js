// JavaScript Document
function altaUsuario(){
	window.localStorage.setItem('usuario',$('#regNom').val());	
	
}
function usuarioExiste(){
	if(window.localStorage.getItem('usuario')!=undefined)
	 return true;
	else
		return false;
}

function accesoBD(){
	var db = window.openDatabase("hotel", "1.0", "Hotel BD", 2000000);
	return db;
}
function guardarReserva(th,pr,ha,di){
	accesoBD().transaction(function(tx){
		tx.executeSQL('CREATE TABLE IF NOT EXISTS reservas(id unique,th,pr,ha,di)');
		tx.executeSQL('INSERT INTO reservas(th,pr,ha,di) VALUES("'+th+'","'+pr+'","'+ha+'","'+di+'")');
		},function(err){
			alert('Error: '+err.code);
			},function(){
				navigator.notification.alert('Esperando Conexion a Internet',null,'Datos Guardados Localmente','Aceptar');
			});
}

function guardarHistorial(th,pr,ha,di){
	accesoBD().transaction(function(tx){
		 tx.executeSQL('CREATE TABLE IF NOT EXISTS historial(id unique,th,pr,ha,di)');
		 tx.executeSQL('INSERT INTO historial(th,pr,ha,di) VALUES("'+th+'","'+pr+'","'+ha+'","'+di+'")');
		},function(err){
			alert('Error:'+err.code);
		  },function(){
			  navigator.notification.alert('Historial Guardado',null,'Historial','Aceptar');
			});	
}
function leerReservas(){
	accesoBD().transaction(function(tx){
		tx.executeSQL('SELECT * FROM reservas',[],function(tx2,res){
			var largo= res.rows.length;
			for(i=0;i<largo;i++){
				var th=res.rows.item(i).th;
				var pr=res.rows.item(i).pr;
				var ha=res.rows.item(i).ha;
				var di=res.rows.item(i).di;
				alert(th+'\n'+pr+'\n'+ha+'\n'+di);
			 }
			},function(err){
				alert('ERROR:'+err.code);
				});
		},function(err){
			alert('Error:'+err.code);
			},function(){
				var a;
			  });
}

function leerHistorial(){
	accesoBD().transaction(function(tx){
		tx.executeSQL('SELECT * FROM historial',[],function(tx2,res){
			var largo= res.rows.length;
			var tabla='<table>';
			tabla+='<tr><td>T. Hab</td><td>Pers.</td><td>Habs.</td><td>Dias</td></tr>';
			for(i=0;i<largo;i++){
				var th=res.rows.item(i).th;
				var pr=res.rows.item(i).pr;
				var ha=res.rows.item(i).ha;
				var di=res.rows.item(i).di;
				tabla+='<tr><td>'+th+'</td><td>'+pr+'</td><td>'+ha+'</td><td>'+di+'</td></tr>';
				//alert(th+'\n'+pr+'\n'+ha+'\n'+di);
			 }
			tabla+='</table>';
			$('#historial div[data-role=content]').html(tabla);
			},function(err){
				alert('ERROR:'+err.code);
				});
		},function(err){
			alert('Error:'+err.code);
			},function(){
				var a;
			  });
}