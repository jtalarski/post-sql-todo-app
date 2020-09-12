$(document).ready(onReady);

function onReady() {
    console.log('JQ in the house');
    getTaskList();
    $(document).on('click', '#submitBtn', addTask)
} // end onReady


function getTaskList() {
    console.log('in getTaskList');
    $('#viewTaskList').empty();
    $.ajax({
            method: "GET",
            url: '/tasks'
        }).then(function(response) {
            console.log('back from GET', response);
            // initial display
            for (let i = 0; i < response.length; i++) {
                let task = response[i];
                $('#viewTaskList').append(`
                <tr>
                <td>${task.task}</td>
                <td>${task.status}</td>
                <td><button class="completBtn data-id"${task.id}">Mark Complete</button></td>
                <td><button class="deleteBtn data-id$${task.id}">Delete</button> </td>
                </tr>
                 `)
            }
        }).catch(function(err) {
            alert(err);
            console.log('something bad', err);
        }) // end AJAX
} // end getTaskList

function addTask() {
    console.log('in addTask');
    let objectToSend = {
        task: $('#taskIn').val()
    };

    $.ajax({
            type: 'POST',
            url: '/tasks',
            data: objectToSend
        }).then(function(response) {
            console.log('response came back with', response);
            getTaskList();
        }).catch(function(error) {
            console.log('error in POST', error)
        }) // end AJAX
} // end addTask