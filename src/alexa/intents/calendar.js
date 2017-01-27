var iot = require("droopy-iot").register("alarm-clock-skill");
var moment = require("moment");

var intent = {
    name: "ShowCalendar",
    slots: {},
    utterances: [
        "{what is|what's|for} my {schedule|calendar|meetings} {today|}",
        "{what is|what's|when is} my {first|next} meeting"
    ]
};

intent.handler = function(request, response) {
    iot.trigger("navigate", { path: "/calendar" }, "alarm-clock");
    var resp = response;
    iot.request("get-calendar", {}, "alarm-clock").then(days => {
        if (days && days.length) {
            resp.say(dayToSpeech(days[0])).send();
        }
    }).catch(err => {
        console.log(err);
    });
    return false;
};

var dayToSpeech = function(day) {
    var date = moment(new Date(day.title));
    var msg = `You have ${day.events.length} meetings on ${date.format('dddd')}<break time="500ms"/>`
    msg += day.events.map(eventToSpeech).join('<break time="600ms"/>'); 
    return msg;
}

var eventToSpeech = function(event) {
    var start = moment(event.start).format('LT');
    var end = moment(event.end).format('LT');
    return `${event.subject} from ${start} until ${end}`;
};

module.exports = intent;