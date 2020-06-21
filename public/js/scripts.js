
var setupTasks = function() {
    var existing = localStorage.getItem('Tasks');
    existing = existing ? existing.split(',') : [];

    var htmlToInsert = '';
    for (let index = 0; index < existing.length; index++) {
        const element = existing[index];
        const id = index;
        htmlToInsert = htmlToInsert + 
           ` <div class='conteiner task position' id=${id}>` +
            ` <button type='button' class='btn btn-outline-light btn-sm deleteButton' onclick='deleteItem(event, ${id})'>` +
            "  <i class='fas fa-trash fa-1.8x'></i>" +
            "</button>" +
            `<p> ${element} </p>` +
            " </div>"
    }
    document.getElementById('tasks').innerHTML = htmlToInsert
}

setupTasks();

const addNewItem = function (event, newTask) {
    event.preventDefault();
    var existing = localStorage.getItem('Tasks');
    existing = existing ? existing.split(',') : [];
    existing.push(newTask);

    localStorage.setItem('Tasks', existing.toString());
    document.getElementById("taskForm").reset();
    setupTasks();
}

const deleteItem = function (event, taskId) {
    event.preventDefault();
    var existing = localStorage.getItem('Tasks');
    existing = existing ? existing.split(',') : [];
    existing.splice(taskId,  1);

    localStorage.setItem('Tasks', existing.toString());
    setupTasks();
}

const getData = function () {
    const formatDate = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    const today = new Date();
    const todayDate = today.toLocaleDateString("en-US", formatDate);
    return todayDate;

}
document.getElementById('date').innerText = getData();