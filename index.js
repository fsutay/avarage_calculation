let nameEl = document.querySelector('#name');
let pointEl = document.querySelector('#point');
let btnAdd = document.querySelector('#add');
let table = document.querySelector('.table')
let tbodyEl = table.querySelector('.table tbody')
let tfootEl = document.querySelector('.table tfoot')


btnAdd.addEventListener('click', () => {
    let names = nameEl.value;
    let point = pointEl.value;
    if (nameEl.value && pointEl.value) {
        tableAdd(names, point);
        nameEl.value = "";
        pointEl.value = "";
        nameEl.focus();
        pointEl.focus();
    } else {
        alert('Please do not leave the name and score fields blank.')
    }

})

const tableAdd = (name, point) => {
    const newTr = document.createElement('tr');
    const row = tbodyEl.querySelectorAll('tr');
    row.forEach((row, index) => {
        const numberCell = row.querySelector('td:first-child');
        numberCell.innerHTML = index + 2;
    });
    newTr.innerHTML = `
        <td>1</td>
        <td>${name}</td>
        <td>${point}</td>
        <td>
            <div class="d-flex justify-content-center gap-3">
                <span style="cursor: pointer;" class="edit"><i class="fa-regular fa-pen-to-square fa-lg"></i></span>
                <span style="cursor: pointer;" class="delete"><i class="fa-regular fa-trash-can fa-lg"></i></span>
                <span style="cursor: pointer;" class="check none"><i class="fa-solid fa-check fa-xl"></i></span>
                <span style="cursor: pointer;" class="close none"><i class="fa-solid fa-xmark fa-xl"></i></span>
            </div>
        </td>

    `;
    table.querySelector('.table tbody').prepend(newTr);

    tableData(newTr);
    tfootData()
    Array.from(tbodyEl.querySelectorAll('tr')).forEach(row => {
        row.addEventListener('DOMNodeRemoved', () => {
            setTimeout(tfootData, 0);
        });
    });
};

const tableData = (tr) => {
    const editButton = tr.querySelector('td:nth-child(4) .edit');
    const trashButton = tr.querySelector('td:nth-child(4) .delete');
    const checkButton = tr.querySelector('td:nth-child(4) .check');
    const closeButton = tr.querySelector('td:nth-child(4) .close');
    const nameCell = tr.querySelector('td:nth-child(2)');
    const pointCell = tr.querySelector('td:nth-child(3)');
    let previousName = nameCell.innerText;
    let previousPoint = pointCell.innerText;

    editButton.addEventListener('click', (e) => {
        nameCell.setAttribute('contenteditable', 'true');
        pointCell.setAttribute('contenteditable', 'true');
        nameCell.classList.add('editable');
        pointCell.classList.add('editable');
        nameCell.focus();
        editButton.classList.toggle('none');
        trashButton.classList.toggle('none');
        checkButton.classList.toggle('d-block');
        closeButton.classList.toggle('d-block');
    });

    trashButton.addEventListener('click', (e) => {
        let name =tr.children[1].innerText;
        let result = confirm(` Do you want to delete the cell named ${name} from the table?`);
        if (result) {
            const cell = e.target.closest('tr');
            cell.remove();
        }
    });

    checkButton.addEventListener('click', (e) => {
        let tr = e.target.closest('tr');
        let point = tr.children[2].innerText;
        point = point.value;
        if (isNaN(pointCell.innerText)) {
            alert('Please enter a valid number for the point.');
            return pointCell.innerText = previousPoint;
        }
        change();
        tfootData();
    });

    closeButton.addEventListener('click', () => {
        nameCell.innerText = previousName;
        pointCell.innerText = previousPoint;
        change();
    })

    const change = () => {
        nameCell.classList.remove('editable');
        pointCell.classList.remove('editable');
        editButton.classList.toggle('none');
        trashButton.classList.toggle('none');
        checkButton.classList.toggle('d-block');
        closeButton.classList.toggle('d-block');
        nameCell.removeAttribute('contenteditable');
        pointCell.removeAttribute('contenteditable');
    }
}

const tfootData = () => {
    const rows = Array.from(tbodyEl.querySelectorAll('tr'));
    const pointCells = rows.map(row => Number(row.querySelector('td:nth-child(3)').innerText));
    const average = pointCells.reduce((total, point) => total + point, 0) / pointCells.length;
    
    let averageRow = document.createElement('tr');
    const averageTextCell = document.createElement('td');
    averageTextCell.colSpan = "2"
    averageTextCell.innerText = 'Average:';
    const averageValueCell = document.createElement('td');
    averageValueCell.innerText = average.toFixed(2);
    const emptyCell = document.createElement('td')
  
    averageRow.appendChild(averageTextCell);
    averageRow.appendChild(averageValueCell);
    averageRow.appendChild(emptyCell)

    while (tfootEl.firstChild) {
        tfootEl.removeChild(tfootEl.firstChild);
    }
    tfootEl.appendChild(averageRow);
};
