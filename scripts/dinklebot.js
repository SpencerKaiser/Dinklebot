module.exports = function (robot) {
    var scores = {};
    var last = "";
    var lastToVote = "";
    //TODO
    
    // *************** SCORING ***************
    // SEND SCORING INFO
    robot.hear(/.*score.*/i, function (msg) {
        //Match any sentence containg score or scores
        var scoreString = "\n";
        var sortedScores = [];
        //Iterate through object
        //Test if each items score has an array at that index, if not create one
        //Push the score string into that array

        for (var item in scores) {
            if (scores[item].score >= 0 && !sortedScores[scores[item].score]) {
                sortedScores[scores[item].score] = {};
            }
            var itemString = item + ' has ' + scores[item].score + " points.\n";
            sortedScores[scores[item].score] = [];
            sortedScores[scores[item].score].push(itemString);
        }

        for (var i = sortedScores.length -1; i >=0; i--) {
            if (sortedScores[i]) {
                for (var j = 0; j < sortedScores[i].length; j++) {
                    scoreString += sortedScores[i][j];
                }
            }
        }
        msg.send(scoreString);
    });

    // ITEM++
    robot.hear(/(.+)\+\+/i, function (msg) {
        var item = msg.match[1];
        if (!scores[item]) {
            scores[item] = {};
            scores[item].score = 0;
        }
        scores[item].score += 1;
        last = item;
        msg.send(item + " has " + scores[item].score + " points.");
    });

    // ITEM--
    robot.hear(/(.+)--/i, function (msg) {
        var item = msg.match[1];
        console.log(item);
        if (!scores[item]) {
            scores[item] = {};
            scores[item].score = 0;
        }
        scores[item].score -= 1;
        last = item;
        msg.send(item + " has " + scores[item].score + " points.");
    });

    
    robot.hear(/^\+\+/i, function (msg) {
        scores[last].score += 1;
        msg.send(last + " has " + scores[last].score + " points.");
    });
    
    robot.hear(/^\-\-/i, function (msg) {
        scores[last].score -= 1;
        msg.send(last + " has " + scores[last].score + " points.");
    });


    // *************** GENERAL ***************

    // GENERAL RESPONSE
    robot.respond(/.?\?$/i, function (msg) {
        msg.reply("How may I be of assistance, Guardian?");
    });

    robot.hear(/wat/i, function (msg) {
        msg.send("Jigga WAT? This'll be a random img in the future");
    });

    robot.hear(/just out for a rip are ya bud\?/i, function (msg) {
        msg.send("OOOH FUCK YEA BUD");
    });

    robot.respond(/.*Who[']?s the worst.*/i, function (msg) {
        msg.reply("Slackbot, of course.");
    });
    //Who's the worst? Slackbot of course!
};