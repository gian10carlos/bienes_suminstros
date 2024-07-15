async function saveOrderBuy() {
    const num_sol = document.getElementById('num_sol').value;
    const date_entr = document.getElementById('date_entr').value;
    const proveedor = document.getElementById('proveedor').value;

    const data = {
        num_sol: num_sol,
        date_entr: date_entr,
        proveedor: proveedor,
    }

    console.log(data)

    try {
        const response = await fetch('/order/create/logistic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        location.reload();
    } catch (error) {
        await Swal.fire({
            position: "center",
            icon: "error",
            title: error.message,
            showConfirmButton: false,
            timer: 1500
        });
    }
}