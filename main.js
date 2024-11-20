document.getElementById('fileInput').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];

    if (file && file.type === "application/json") {
        const reader = new FileReader();

        reader.onload = function(e) {
            try {
                const jsonData = JSON.parse(e.target.result);
                createTableFromJSON(jsonData);
            } catch (error) {
                alert("Invalid JSON file.");
            }
        };

        reader.readAsText(file);
    } else {
        alert("Please upload a valid JSON file.");
    }
}

function createTableFromJSON(jsonData) {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = "";
    if (!Array.isArray(jsonData)) {
        alert("JSON data must be an array of objects.");
        return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headers = Object.keys(jsonData[0]);

    
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    
    jsonData.forEach(rowData => {
        const row = document.createElement('tr');

        headers.forEach(header => {
            const cell = document.createElement('td');
            cell.textContent = rowData[header] !== undefined ? rowData[header] : '';
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);
}
