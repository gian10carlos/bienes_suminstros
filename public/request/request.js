const form = document.querySelector('form');
form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const numeroSolicitud = document.getElementById('numeroSolicitud').value;
    const fecha = document.getElementById('fecha').value;
    const responsable = document.getElementById('responsable').value;
    const area = document.getElementById('area').value;
    const meta = document.getElementById('meta').value;

    let totalValue = 0;
    const selectedProducts = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        const row = checkbox.closest('tr');
        const valUnit = parseFloat(row.querySelector('label').textContent.trim());
        const unidMed = row.querySelector('.unidMed').textContent.trim();
        const cantidad = parseInt(row.querySelector('input[type="text"]').value.trim());
        if (!isNaN(valUnit) && !isNaN(cantidad)) {
            selectedProducts.push({
                id: checkbox.id,
                valUnit: valUnit,
                unidMed: unidMed,
                cantidad: cantidad
            });
            totalValue += valUnit * cantidad;
        }
    });

    const data = {
        number: numeroSolicitud,
        date: fecha,
        responsable: responsable,
        area: area,
        meta: meta,
        products: selectedProducts,
        totalValue: totalValue
    };

    try {
        const response = await fetch('/request/post/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

        await Swal.fire({
            position: "center",
            icon: "success",
            title: result.message,
            showConfirmButton: false,
            timer: 1500
        });

        window.location.href = '/request';
    } catch (error) {
        await Swal.fire({
            position: "center",
            icon: "error",
            title: error.message,
            showConfirmButton: false,
            timer: 1500
        });
    }
});

function setIdRequest() {
    const numberReqId = document.getElementById('numeroSolicitud');
    if (numberReq < 9) {
        numberReqId.value = `S00${numberReq + 1}`
    } else if (numberReq >= 9 && numberReq < 100) {
        numberReqId.value = `S0${numberReq + 1}`
    } else {
        numberReqId.value = `S${numberReq + 1}`
    }
}

setIdRequest();