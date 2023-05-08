const excelInput = document.getElementById("excelInput");

const listaDescripcion = document.getElementById("listaDescripcion");
const listaPrecio = document.getElementById("listaPrecio");

const table = document.getElementById("table");
const tableHead = document.getElementById("tableHead");
const tableBody = document.getElementById("tableBody");

const botonBuscador = document.getElementById("botonBuscador");
const cuadroBusqueda = document.getElementById("inputBuscador");

botonBuscador.addEventListener("click", () => {
    tableBody.innerHTML = "";
    tableHead.innerHTML = "";

    const file = excelInput.files[0];
    const reader = new FileReader();

    reader.onload = e => {
        const data = new Uint8Array(e.target.result);
        const wb = XLSX.read(data, {type: "array"});
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const arrayData = XLSX.utils.sheet_to_json(sheet, {header: 1});
    
        Excel(arrayData);
    };

    reader.readAsArrayBuffer(file);
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
                if(row != "" && row.length != 1) {
                    const producto = row[1];

                    if(producto.toLowerCase().includes(cuadroBusqueda.value.toLowerCase())) {
                        tableBody.innerHTML += `
                            <tr>
                                <td>${producto}</td>
                                <td>${CalcularPrecio(row[2], 21, 2)}</td>
                            </tr>
                        `
                    }
                }
            })
        },

        rows: content.slice(10)
    };
    
    excel.header();
    excel.descripcion_precio(excel.rows); 
}

function CalcularPrecio(precio, iva, ganancia) {
    let precioFinal = ((precio * (iva / 100)) + precio) * ganancia;

    return precioFinal;
}