document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("showForm");
    const showIdInput = document.getElementById("showId");
    const showNameInput = document.getElementById("showName");
    const showDateInput = document.getElementById("showDate");
    const showTimeInput = document.getElementById("showTime");
    const showTicketsInput = document.getElementById("showTickets");
    const saveBtn = document.getElementById("saveBtn");
    const clearBtn = document.getElementById("clearBtn");
    const showsTableBody = document.querySelector("#showsTable tbody");

    // Fetch Shows from Database
    function fetchShows() {
        fetch("get_shows.php")
            .then(response => response.json())
            .then(shows => {
                showsTableBody.innerHTML = "";
                shows.forEach(show => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${show.name}</td>
                        <td>${show.date}</td>
                        <td>${show.time}</td>
                        <td>${show.tickets}</td>
                        <td>
                            <button class="editBtn" data-id="${show.id}">Edit</button>
                            <button class="deleteBtn" data-id="${show.id}">Delete</button>
                        </td>
                    `;
                    showsTableBody.appendChild(row);
                });
                attachEventListeners();
            })
            .catch(error => console.error("Error fetching shows:", error));
    }

    // Save Show (Insert or Update)
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const showData = {
            id: showIdInput.value ? parseInt(showIdInput.value) : 0,
            name: showNameInput.value,
            date: showDateInput.value,
            time: showTimeInput.value,
            tickets: showTicketsInput.value,
        };

        fetch("save_show.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(showData)
        })
        .then(response => response.json())
        .then(() => {
            form.reset();
            showIdInput.value = "";
            fetchShows();
        })
        .catch(error => console.error("Error saving show:", error));
    });

    // Edit Show
    function editShow(id) {
        fetch(`get_show.php?id=${id}`)
            .then(response => response.json())
            .then(show => {
                showIdInput.value = show.id;
                showNameInput.value = show.name;
                showDateInput.value = show.date;
                showTimeInput.value = show.time;
                showTicketsInput.value = show.tickets;
            })
            .catch(error => console.error("Error fetching show:", error));
    }

    // Delete Show
    function deleteShow(id) {
        fetch("delete_show.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })
        .then(response => response.json())
        .then(() => fetchShows())
        .catch(error => console.error("Error deleting show:", error));
    }

    // Attach Event Listeners
    function attachEventListeners() {
        document.querySelectorAll(".editBtn").forEach(button => {
            button.addEventListener("click", (e) => {
                editShow(e.target.getAttribute("data-id"));
            });
        });

        document.querySelectorAll(".deleteBtn").forEach(button => {
            button.addEventListener("click", (e) => {
                deleteShow(e.target.getAttribute("data-id"));
            });
        });
    }

    // Clear Form
    clearBtn.addEventListener("click", () => {
        form.reset();
        showIdInput.value = "";
    });

    // Initial Fetch
    fetchShows();
});
