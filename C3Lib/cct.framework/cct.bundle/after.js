/*
 cct.log.setLogLevel(cct.log.VERBOSE);

cct.log.setLogHandler(function() {
    var args = Array.prototype.slice.call(arguments);
    var level = args.shift();
    var category = args.shift();
    var message = args.shift();

    android.util.Log.d(
        "JavaScript",
        "[".concat(category)
           .concat("] ")
           .concat(message)
           .concat(": ")
           .concat(args.join(", ")));
});

var randomString = function(size) {
    return org.apache.commons.lang3.RandomStringUtils.randomAlphanumeric(size);
};
*/
