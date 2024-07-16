async function postLogistic(button) {
    var requestId = button.parentElement.parentElement.querySelector('th').innerText;

    try {
        const response = await fetch('/request/update/manager', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ requestId })
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

async function updatedOrderBuy(button) {
    var orderId = button.parentElement.parentElement.querySelector('th').innerText;

    try {
        const response = await fetch('/order/update/manager', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderId })
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