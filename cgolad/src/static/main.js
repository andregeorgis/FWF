// Buttons should redirect to the correct html page
document.getElementById('stage-one').addEventListener('click', redirect);
document.getElementById('stage-two').addEventListener('click', redirect);

function redirect() {
    var stage = event.target.id;
    if (stage == 'stage-one') {
        location.replace('/stage-one');
    }
    else if (stage == 'stage-two') {
        location.replace('/stage-two');
    }
}
