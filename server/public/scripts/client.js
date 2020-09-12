$(document).ready(onReady);

function onReady() {
    console.log('JQ in the house');
    getTaskList();
    $(document).on('click', '#submitBtn', addTask);
    $(document).on('click', '.deleteBtn', deleteTask);
    $(document).on('click', '.completeBtn', completeTask);
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
                <td><button class="completeBtn" data-id="${task.id}">Mark Complete</button></td>
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



// change status to complete
// status will be used to change class of task so that a 
// line through effect can be applied
function completeTask() {
    console.log('in completeTask');
    let id = $(this).data('id');
    console.log('mark complete', id);
    $.ajax({
            method: 'PUT',
            url: `tasks/${id}`,
            data: {
                status: "complete"
            }
        }).then(function(response) {
            console.log('response from status change', response);
            getTaskList();
        }).catch(function(err) {
            console.log('error is marking complete', err);
            alert("something went horribly wrong");
        }) // end AJAX
} // end completeTask

/*
function completeTask() {
    let taskId = $(this).data('id');
    console.log('transfer', taskId);
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`,
        data: {
            status: "Complete"
        }
    }).then(function(response) {
        console.log('response from transfer', response);
        getKoalas();
    }).catch(function(err) {
        console.log("error in setting transfer", err);
        alert("something went wrong");
    })
}
*/