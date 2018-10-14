function getEvents(fillEventsList, manipulateEvents) {
	$.get("https://www.reddit.com/r/londonsocialclub/new.json?limit=100")
		.done(function(data) {
		  var events = data.data.children.map(createEvent);
		  var selectedEvents = manipulateEvents(events);
		  fillEventsList(selectedEvents);
		})
		.fail(function() {
			showError();
		});
}

function createEvent(redditReply) {
	var lscEvent = {
		title: redditReply.data.title,
		url: redditReply.data.url,
		isInterestCheck: redditReply.data.link_flair_css_class == "interestcheck",
		createdAt: redditReply.data.created_utc,
		date: new Date()
	};
	return lscEvent;
}

function upcomingEventsManipulator(events) {
	var today = (new Date()).setHours(0, 0, 0, 0);
	var filteredEvents = events.filter(
		e => !e.isInterestCheck && e.date != null && e.date >= today
	);
	var sortedEvents = filteredEvents.sort(function(a, b){return a.date - b.date});
	return filteredEvents;
}

function pastEventsManipulator(events) {
	var today = (new Date()).setHours(0, 0, 0, 0);
	var filteredEvents = events.filter(
		e => !e.isInterestCheck && e.date != null && e.date < today
	);
	var sortedEvents = filteredEvents.sort(function(a, b){return b.date - a.date});
	return filteredEvents;
}

function interestCheckManipulator(events) {
	var filteredEvents = events.filter(
		e => e.isInterestCheck
	);
	var sortedEvents = filteredEvents.sort(function(a, b){return b.createdAt - a.createdAt});
	return filteredEvents;
}
