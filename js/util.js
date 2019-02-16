// PROTOTYPE ALTERATIONS
Array.prototype.indexPair = function(p) {
    for (var i in this) {
        if ( p.equals(this[i]) ) return parseInt(i);
    }
    return -1;
}



// UTILITY FUNCTIONS
function randint(min, max) {
    return Math.floor( (Math.random() * (max) ) + min);
}



// FUNCITONS TO MANIPULATE DOM
function empty(target) {
    target.innerHTML = '';
}

function append(target, element) {
    target.innerHTML += element;
}

function addClass(target, newClass) {
    target.className += ' ' + newClass;
}
