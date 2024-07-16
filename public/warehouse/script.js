async function finalRequest(button) {
    var num_req = button.parentElement.parentElement.querySelector('th').innerText;
    var id_item = button.parentElement.parentElement.querySelector('[name="id_item"]').value;
    var amount_req = button.parentElement.parentElement.querySelector('[name="amount_req"]').value;

    const data = {
        num_req,
        id_item,
        amount_req,
    }

    try {
        const response = await fetch('/request/update/final/warehouse', {
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

async function finalOrderBuy(button) {
    var num_ord = button.parentElement.parentElement.querySelector('th').innerText;
    var id_item = button.parentElement.parentElement.querySelector('[name="id_item"]').value;
    var amount_ord = button.parentElement.parentElement.querySelector('[name="amount_ord"]').value;

    const data = {
        num_ord,
        id_item,
        amount_ord,
    }

    console.log(data)

    try {
        const response = await fetch('/order/update/final/warehouse', {
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