const socket = io();
const tableBody = document.querySelector('#data-table tbody');

socket.on('serial-data',data=> {
    const row = document.createElement('tr');
    const dato = document.createElement('td');
    const hora = document.createElement('td');

    dato.textContent = data.trim();
    hora.textContent = new Date().toLocaleTimeString();

    row.appendChild(dato);
    row.appendChild(hora);
    tableBody.prepend(row);
    

})