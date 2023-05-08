const excelInput = document.getElementById("excelInput");

const listaDescripcion = document.getElementById("listaDescripcion");
const listaPrecio = document.getElementById("listaPrecio");

const table = document.getElementById("table");
const tableHead = document.getElementById("tableHead");
const tableBody = document.getElementById("tableBody");

const botonBuscador = document.getElementById("botonBuscador");
const cuadroBusqueda = document.getElementById("inputBuscador");

excelInput.addEventListener("change", async () => {
    const content = await readXlsxFile(excelInput.files[0]);
    
    Excel(content);
});

botonBuscador.addEventListener("click", () => {
    const filas = document.querySelectorAll("tbody>tr");
    let filter = cuadroBusqueda.value.toLowerCase();
    
    filas.forEach(fila => {
        const columna = fila.querySelectorAll("td")[0];
        const columnaPrecio = fila.querySelectorAll("td")[1];
        let producto = columna.textContent.toLowerCase();

        if(producto.indexOf(filter) > -1) {
            fila.style.display = "";
            columnaPrecio.style.display = "";
        } else {
            fila.style.display = "none";
            columnaPrecio.style.display = "none";
        }
    });
});

function Excel(content) {
    const excel = {
        header: () => {
            content[5].map(header => {
                if(header != null && header != "Codigo Barra") {
                    tableHead.innerHTML += `
                        <td>${header}</td>
                    `
                }
            })
        },
        
        descripcion_precio: (rows) => {
            rows.map(row => {
                tableBody.innerHTML += `
                    <tr>
                        <td class="articulos">${row[1]}</td>
                        <td>${CalcularPrecio(row[2], 21, 2)}</td>
                    </tr>
                `
            })
        },

        rows: content.slice(10),
    };

    excel.header();
    excel.descripcion_precio(excel.rows);
}

function CalcularPrecio(precio, iva, ganancia) {
    let precioFinal = ((precio * (iva / 100)) + precio) * ganancia;

    return precioFinal;
}