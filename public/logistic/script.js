async function setCreateOrderBuy(button) {
    var num_sol = button.parentElement.parentElement.querySelector('th').innerText;
    var date_entr = button.parentElement.parentElement.querySelector('[name="date_entr"]').value;
    var proveedor = button.parentElement.parentElement.querySelector('[name="proveedor"]').value;

    const data = {
        num_sol: num_sol,
        date_entr: date_entr,
        proveedor: proveedor,
    };

    try {
        const response = await fetch('/order/buy/create/logistics', {
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
