const excelInput = document.getElementById("excelInput");

const listaDescripcion = document.getElementById("listaDescripcion");
const listaPrecio = document.getElementById("listaPrecio");

const tableHead = document.getElementById("tableHead");
const tableBody = document.getElementById("tableBody");

excelInput.addEventListener("change", async () => {
    const content = await readXlsxFile(excelInput.files[0]);

    Excel(content);
});

function Excel(content) {
    const excel = {
        header: () => {
            content[5].map(header => {
                if(header != null && header != "Codigo Barra") {
                    const td = document.createElement("td");
                
                    td.innerText = header;

                    tableHead.appendChild(td);
                }
            })
        },
        
        descripcion_precio: (rows) => {
            rows.map(row => {
                tableBody.innerHTML += `
                    <tr>
                        <td>${row[1]}</td>
                        <td>${CalcularPrecio(row[2], 21, 100)}</td>
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
    let precioFinal = ((precio * (iva / 100)) + precio) * (ganancia / 100);

    return precioFinal;
}