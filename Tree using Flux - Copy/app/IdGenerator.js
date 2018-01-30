var min = 1;
var max = 100;
idGenerator= function () {
    return (min + (Math.random() * (max-min)));
}
module.exports =idGenerator;