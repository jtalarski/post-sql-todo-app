$(document).ready(onReady);

function onReady() {
    console.log('JQ in the house');
    getTaskList();
    $(document).on('click', '#submitBtn', addTask);
    $(document).on('click', '.deleteBtn', deleteTask);
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
                <td><button class="completBtn" data-id"${task.id}">Mark Complete</button></td>
                <td><button class="deleteBtn" data-id="${task.id}">Delete</button> </td>
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


/*
function deleteTask() {
    console.log('in deleteTask');
    let taskId = $(this).data('id');
    console.log('this is the task to delete', taskId);
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${testId}`
    }).then(function(response) {
        console.log("deleted", response);
        getTaskList();
    }).catch(function(err) {
        console.log('erros in delete', err);
        alert('nope!')
    })
}
*/

function deleteTask() {
    console.log('made it into deleteTask');
    let taskId = $(this).data('id');
    console.log('this is the id of the task', taskId)
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`
    }).then(function(response) {
        console.log("Deleted!", response);
        // Refresh page (aka do another GET request)
        getTaskList();
    }).catch(function(err) {
        console.log("Error in delete", err);
        alert("ruh-roh");
    });
}