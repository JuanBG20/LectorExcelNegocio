const excelInput = document.getElementById("excelInput");

const descripcion = document.getElementById("descripcion");
const precio = document.getElementById("precio");

excelInput.addEventListener("change", async () => {
    const content = await readXlsxFile(excelInput.files[0]);

    Objeto(content);
});

function Objeto(content) {
    const excel = {
        content: content,
        header: content[5],
        rows: content.slice(10)
    };

    const funcionesExcel = {
        row: (rows) => {
            rows.map(row => console.log(row));
        },

        descripcion: (rows) => {
            rows.map(row => {
                descripcion.innerText += row;
            })
        },
    
        precio: (rows) => {
            rows.map(row => {
                CalcularPrecio(row[2], 21, 100);
            })
        }
    }

    funcionesExcel.descripcion(excel.rows);
    funcionesExcel.precio(excel.rows);
}

function CalcularPrecio(precio, iva, ganancia) {
    let precioFinal = ((precio * (iva / 100)) + precio) * (ganancia / 100);

    
}