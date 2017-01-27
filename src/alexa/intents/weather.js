var iot = require("droopy-iot").register("alarm-clock-skill");

var intent = {
    name: "ShowWeather",
    slots: {},
    utterances: [
        "the {weather|weather forecast|forecast}"
    ]
};

intent.handler = function(request, response) {
    iot.trigger("navigate", { path: "/forecast" }, "alarm-clock");
    response.say("Okay").send();
};

module.exports = intent;