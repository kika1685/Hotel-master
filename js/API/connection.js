// Chequeo de conexion a internet
function estaConectado() {
    if(navigator.connection.type != Connection.NONE)
		return true;
	else
		return false;
}
