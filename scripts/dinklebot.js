/*global module,robot*/

var scores = {};

module.exports = function (robot) {
    
    // *************** SCORING ***************
    // SEND SCORING INFO
    robot.hear(/.*score.*/i, function (msg) {
        //Match any sentence containg score or scores
        var scoreString = "Scoring still in development";
        for (var item in scores) {
            scoreString += item;
        }

        msg.reply(scoreString);
    });

    // ITEM++
    robot.hear(/(.*)\+\+/i, function (msg) {
        var item = msg.match[1];
        if (scores.item) {
            scores.item.score += 1;
        } else {
            scores.item = {};
            scores.item.score = 1;
        }
        msg.reply(item + " has " + scores.item.score + " points.");
    });
    
    // ITEM--
    robot.hear(/(.*)--/i, function (msg) {
        var item = msg.match[1];
        if (scores.item) {
            scores.item.score -= 1;
        } else {
            scores.item = {};
            scores.item.score = -1;
        }
        msg.reply(item + " has " + scores.item.score + " points.");
    });
    
    
    

    // *************** GENERAL ***************
    
    // GENERAL RESPONSE
    robot.respond(/\?/i, function (msg) {
        msg.reply("How may I be of assistance, Guardian?");
    });
  
    robot.hear(/wat/i, function (msg) {
        msg.reply("Jigga WAT? This'll be a random img in the future");
    });
    
};