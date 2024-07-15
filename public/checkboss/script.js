async function updatedRequest(button) {
    var requestId = button.parentElement.parentElement.querySelector('th').innerText;

    try {
        const response = await fetch('/request/update/boss', {
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