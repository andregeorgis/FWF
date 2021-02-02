document.getElementById('stage-one').addEventListener('click', redirect);
document.getElementById('stage-two').addEventListener('click', redirect);

function redirect() {
    var stage = event.target.id;
    if (stage == 'stage-one') {
        location.replace('/stage-one');
    }
    else {
        location.replace('/stage-two');
    }
}
