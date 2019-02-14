// Pair CLASS
function Pair(x, y) {
    // VARIABLES
    var self = this;
    this.x = x;
    this.y = y;
    
    // METHODS
    this.equals = function(p) {
        return p.x == self.x && p.y == self.y;
    }
}



// PROTOTYPE ALTERATIONS
Array.prototype.indexPair = function(p) {
    for (var i in this) {
        if ( p.equals(this[i]) ) return parseInt(i);
    }
    return -1;
}



// FUNCTIONS
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

function getClassString(target) {
    return target.className;
}

function addClass(target, newClass) {
    var prev = getClassString(target);
    target.className = prev + ' ' + newClass;
}
