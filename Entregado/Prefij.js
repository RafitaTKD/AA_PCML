var arregloDeStrings=["tarta", "tarto", "taron", "tarot", "tacto", "tacti", "tach"];
var arbol;
var cantidadDeNiveles;
let re = /^[a-z]+$/;

function commonPrefixUtil2(str1, str2)
{
    let result = "";
    let n1 = str1.length, n2 = str2.length;
 
    for(let i = 0, j = 0; i <= n1 - 1 &&
            j <= n2 - 1; i++, j++)
    {
        if (str1[i] != str2[j])
        {
            break;
        }
        result += str1[i];
    }
    return (result);
}
 
// A Divide and Conquer based function
// to find the longest common prefix. This
// is similar to the merge sort technique
function commonPrefix2(arr, low, high)
{
    if (low == high)
    {
        return (arr[low]);
    }
 
    if (high > low)
    {
         
        // Same as (low + high)/2, but avoids
        // overflow for large low and high
        let mid = low + Math.floor((high - low) / 2);
 
        let str1 = commonPrefix2(arr, low, mid);
        let str2 = commonPrefix2(arr, mid + 1, high);
 
        return (commonPrefixUtil2(str1, str2));
    }
    return null;
}
 

// Javascript program to find the
// longest common prefix
 
// A Utility Function to find the
// common prefix between strings-
// str1 and str2
function commonPrefixUtil(str1, str2, nivel){
    let result = "";
    let n1 = str1.length, n2 = str2.length;
 
    for(let i = 0, j = 0; i <= n1 - 1 && j <= n2 - 1; i++, j++){
        if (str1[i] != str2[j]){
            break;
        }
        result += str1[i];
    }
    return (result);
}
 
// A Divide and Conquer based function
// to find the longest common prefix. This
// is similar to the merge sort technique
function commonPrefix(arr, low, high, nivel)
{
    if (low == high)
    {
		//document.getElementById("prueba").innerHTML=document.getElementById("prueba").innerHTML + ("<br>\n"+imprimirCadena(low));
        return (arr[low]);
    }
 
    if (high > low)
    {
         
        // Same as (low + high)/2, but avoids
        // overflow for large low and high
        let mid = low + Math.floor((high - low) / 2);
 
		addStringsToTree(low, mid, nivel+1);
		addStringsToTree(mid+1, high, nivel+1);

        let str1 = commonPrefix(arr, low, mid, nivel+1);
        let str2 = commonPrefix(arr, mid + 1, high, nivel+1);

		//insertarEnPagina("prueba","<br>Se comparo "+str1+" y "+str2+" y dio como resultado "+commonPrefixUtil(str1, str2, nivel+1)+" en nivel "+nivel);
        return (commonPrefixUtil(str1, str2, nivel+1));
    }
    return null;
}

/*****************************************************************/

function removeItemFromArr ( arr, item ) {
    var i = arr.indexOf( item );
 
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
}

function addStringsToTree(inicio, final, nivel){
	var retorno=[];
	for ( var i=inicio; i<=final; i++){
		retorno.push(i);
	}
	arbol[nivel].push(retorno);
	if(inicio==final){
		for(var i=nivel+1; i<=cantidadDeNiveles; i++){
			arbol[i].push(retorno);
		}
	}
}

function mostrarCadenas(){
	var ponerAqui="";
	for (var i=0; i<arregloDeStrings.length; i++){
		ponerAqui+=("<li>"+arregloDeStrings[i]+"</li>");
	}
	document.getElementById("aquiStrings").innerHTML=ponerAqui;
}

function getString(){ 
	var temporal=document.getElementById("P1").value;
	if( temporal == "" || temporal.includes(" ") || !re.test(temporal) ){
		alert("Inserta una cadena de texto sin espacios y sin números por favor"); 
	}
	else{
		arregloDeStrings.push(temporal);
		mostrarCadenas();
	}
}

function deleteString(){
	var temporal=document.getElementById("P2").value;
	if( temporal == "" || temporal.includes(" ") || !re.test(temporal) ){
		alert("Inserta una cadena de texto sin espacios y sin números por favor"); 
	}
	else{
		removeItemFromArr(arregloDeStrings, temporal);
		mostrarCadenas();
		
	}
}

function creaNodo(texto){
	var div1 = document.createElement("div");
	div1.style.width="100%";
	div1.style.textAlign="center";
	div1.style.alignItems="center";
	div1.style.justifyContent="center";
	div1.style.display="flex";
	div1.style.float="center";
	var div2 = document.createElement("div");
	div2.style.height="50px";
	div2.style.width="150px";
	div2.style.background="#D6E8EE";
	div2.style.borderRadius="100%";
	div2.style.display="flex";
	div2.style.alignItems="center";
	div2.style.justifyContent="center";
	var hache = document.createElement("h")
	hache.appendChild(texto)
	div2.appendChild(hache);
	div1.appendChild(div2);
	return div1;
}

function imprimeArbolTabla(){
	var retorno=[];
	for ( var i=0; i<arregloDeStrings.length; i++){
		retorno.push(i);
	}
	arbol[0].push(retorno);
	var temp="";
	
	var body = document.getElementById("prueba2");

	// Crea un elemento <table> y un elemento <tbody>
	var tabla   = document.createElement("table");
	var tblBody = document.createElement("tbody");


	// Crea las celdas
	for (var i = 0; i < arbol.length; i++) {
		// Crea las hileras de la tabla
		var hilera = document.createElement("tr");

		for (var j = 0; j < arbol[i].length; j++) {
			// Crea un elemento <td> y un nodo de texto, haz que el nodo de
			// texto sea el contenido de <td>, ubica el elemento <td> al final
			// de la hilera de la tabla
			var celda = document.createElement("td");
			temp="";
			for(var k=0; k< arbol[i][j].length;k++){
				temp+=(arregloDeStrings[arbol[i][j][k]]+" ");	
			}
			var textoCelda = document.createTextNode(temp);
			celda.appendChild(creaNodo(textoCelda));
			celda.setAttribute("align", "center");
			celda.setAttribute("colspan", (arbol[i][j].length).toString());
			celda.setAttribute("border-radius","100%");
			hilera.appendChild(celda);
			/********** Aqui se añadio una celda *************/
		}

		// agrega la hilera al final de la tabla (al final del elemento tblbody)
		tblBody.setAttribute("align","center");
		tblBody.setAttribute("border-radius","100%");
		tblBody.appendChild(hilera);
		/**************** Aqui se añadio una fila *************************** */
	}

	// posiciona el <tbody> debajo del elemento <table>
	tabla.appendChild(tblBody);
	// appends <table> into <body>
	body.appendChild(tabla);
	// modifica el atributo "border" de la tabla y lo fija a "2";
	tabla.setAttribute("border-radius","100%");
	
}

function imprimeArbolTablaInverso(){
	var temp="";
	
	var body = document.getElementById("prueba2");

	// Crea un elemento <table> y un elemento <tbody>
	var tabla   = document.createElement("table");
	var tblBody = document.createElement("tbody");


	// Crea las celdas
	for (var i = arbol.length-1; i >=0 ; i--) {
		// Crea las hileras de la tabla
		var hilera = document.createElement("tr");

		for (var j = 0; j < arbol[i].length; j++) {
			// Crea un elemento <td> y un nodo de texto, haz que el nodo de
			// texto sea el contenido de <td>, ubica el elemento <td> al final
			// de la hilera de la tabla
			var celda = document.createElement("td");
			temp=commonPrefix2(arregloDeStrings, arbol[i][j][0], arbol[i][j][arbol[i][j].length-1]);
			var textoCelda = document.createTextNode(temp);
			celda.appendChild(creaNodo(textoCelda));
			celda.setAttribute("align", "center");
			celda.setAttribute("colspan", (arbol[i][j].length).toString());
			celda.setAttribute("border-radius","100%");
			hilera.appendChild(celda);
		}

		// agrega la hilera al final de la tabla (al final del elemento tblbody)
		tblBody.setAttribute("align","center");
		tblBody.setAttribute("border-radius","100%");
		tblBody.appendChild(hilera);
	}

	// posiciona el <tbody> debajo del elemento <table>
	tabla.appendChild(tblBody);
	// appends <table> into <body>
	body.appendChild(tabla);
	// modifica el atributo "border" de la tabla y lo fija a "2";
	
	tabla.setAttribute("border-radius","100%");
}

function imprimeArbol(){
	
	for(var i=0; i < arbol.length; i++){
		insertarEnPagina("prueba", "<br>");
		arbol[i].sort();
		for(var j=0; j< arbol[i].length; j++){
			
			if(j==0){
				insertarEnPagina("prueba", "empieza la linea "+i.toString()+" ");	
			}else{
				insertarEnPagina("prueba", " separacion ");
			}
			for(var k=0; k< arbol[i][j].length;k++){
				insertarEnPagina("prueba", arregloDeStrings[arbol[i][j][k]]+" ");	
			}
		}
	}
}

function imprimeArbolInverso(){
	for(var i=arbol.length-1; i >=0; i--){
		insertarEnPagina("prueba", "<br>");
		for(var j=0; j< arbol[i].length; j++){
			if(j==0){
				insertarEnPagina("prueba", "empieza la linea "+i.toString()+" ");	
			}else{
				insertarEnPagina("prueba", " separacion ");
			}
			insertarEnPagina("prueba", commonPrefix2(arregloDeStrings, arbol[i][j][0], arbol[i][j][arbol[i][j].length-1]) );
		}
	}
}

function insertarEnPagina(id, texto){
	document.getElementById(id).innerHTML=document.getElementById(id).innerHTML + texto;
}

function showLCP(){ 
	if( arregloDeStrings.length == 0){
		alert("No has ingresado cadenas aun");
	}
	else{

		cantidadDeNiveles = Math.ceil(Math.log2(arregloDeStrings.length));
		arbol = new Array(cantidadDeNiveles);
		arbolInverso = new Array(cantidadDeNiveles);
		
		for(var i = 0; i <= cantidadDeNiveles;i++){
			arbol[i]=new Array();
		}

		for(var i = 0; i <= cantidadDeNiveles;i++){
			arbolInverso[i]=new Array();
		}

		let ans = commonPrefix(arregloDeStrings, 0, arregloDeStrings.length-1, 0);

		//imprimeArbol();

		//imprimeArbolInverso();

		imprimeArbolTabla();

		imprimeArbolTablaInverso();

		if (ans.length != 0){
			insertarEnPagina("prueba", "<br>\nEl prefijo comun más largo es " + ans);
		}
		else{
			insertarEnPagina("prueba", "<br>\nNo hay un prefijo comun más largo");
		}



		/*var nuevoCodigoHtml = CodigoFuerte; //nuevoCodigoHtml2 es la respuesta final
		var nuevoCodigoHtml2 = '<div style="width: 50%; text-align:center; align-items:center; justify-content: center; display: flex; float:center;"> <div style="height: 50px; width: 50px; background: #001B28; color: red; border-radius: 0%; display: flex; align-items:center; justify-content: center;"> <h>';
		var nuevoCodigoHtml3 = '</h> </div> </div>'; //cierra html2
		var nuevoCodigoHtml1 = "";
		if(document.getElementById("num3").value == ""){
			alert("Inserta un valor numerico");
		}
		else{
			document.getElementById("T1").innerHTML = CodigoAux;
			var j = 0;
			var i = 0;
			var aux = 1;
			var suma = 0;
			var ban = 0;
			var num3 = parseInt(document.getElementById("num3").value);
			document.getElementById("num3").value = ""; 
			for(i = 0; i < l1; i++){
				if(Matriz[i] == num3){
					document.getElementById("T1").innerHTML = CodigoAux;
					document.getElementById("a" + i).innerHTML = nuevoCodigoHtml2 + Matriz[i] + nuevoCodigoHtml3;
					ban = 1;
				}
				else{}
			}
			if(ban == 1){}
			else{
				r = r1;
				l = l1;
				bandera = bandera1;
				j = 0;
				document.getElementById("T1").innerHTML = "";
				for(; r <= n; r++){
					if(l == bandera){ //nuevoCodigoHtml son las filas
						nuevoCodigoHtml = nuevoCodigoHtml  + '<tr><td><label style="font-family: Quicksand; color: green;"> +' + conjunto[r] + ' </label></td>';
						bandera = bandera + Math.pow(2,r);
					}
					else{}
					for(; l < bandera; l++){ //DesdeAquinuevoCodigoHtml son los circulitos
						nuevoCodigoHtml = nuevoCodigoHtml  + '<td colspan="' + Math.pow(2,(n - r)) + '" id="a' + l + '" > <div style="width: 100%; text-align:center; align-items:center; justify-content: center; display: flex; float:center;"> <div style="height: 50px; width: 50px; background:yellow; border-radius: 100%; display: flex; align-items:center; justify-content: center;"> <h>' + Matriz[l] + '</h> </div> </div> </td>';
						nuevoCodigoHtml1 = nuevoCodigoHtml;
						if((l + 1) < bandera){
							for(i = l + 1; i < bandera; i++){
								nuevoCodigoHtml1 = nuevoCodigoHtml1  + '<td colspan="' + Math.pow(2,(n - r)) + '" > <div style="width: 100%; text-align:center; align-items:center; justify-content: center; display: flex; float:center;"> <div style="height: 50px; width: 50px; background:#018ABE; color:#018ABE; border-radius: 100%; display: flex; align-items:center; justify-content: center;"> <h>' + "EE" + '</h> </div> </div> </td>';
							}
						}
						else{}
						nuevoCodigoHtml1 = nuevoCodigoHtml1  + '<td><label style="font-family: Quicksand; color: #D6E8EE;"> +' + conjunto[0] + ' </label></td></tr>';
						if(Matriz[l] == num3 && j === 0){
							r1 = r;
							l1 = l + 1;
							bandera1 = bandera;
							CodigoFuerte = nuevoCodigoHtml;
							CodigoAux = nuevoCodigoHtml1;
							j = 10;
							document.getElementById("T1").innerHTML = nuevoCodigoHtml1;
							document.getElementById("a" + l).innerHTML = nuevoCodigoHtml2 + Matriz[l] + nuevoCodigoHtml3;
						}
						else{}
						if(j === 0){
							document.getElementById("T1").innerHTML = nuevoCodigoHtml1;
							document.getElementById("a" + l).innerHTML = nuevoCodigoHtml2 + Matriz[l] + nuevoCodigoHtml3;
						}
						else{}
					}
				}
				if(j == 10){}
				else{
					CodigoFuerte = nuevoCodigoHtml;
					alert("No se encontro tu numero");
				}
			}
		}*/
	}
}