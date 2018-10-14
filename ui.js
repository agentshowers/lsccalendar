$(document).ready(function(){
	$("#upcoming").click(setUpcomingEvents);
	$("#interest-check").click(setInterestChecks);
	$("#past-events").click(setPastEvents);
	
	$(".nav a").on("click", function(){
		$(".nav").find(".active").removeClass("active");
		$(this).parent().addClass("active");
	});

	setUpcomingEvents();
});

function setUpcomingEvents() {
	unloadEvents();
	getEvents(function(events) {
		loadEvents("Upcoming Events", events);
	}, upcomingEventsManipulator);
}

function setInterestChecks() {
	unloadEvents();
	getEvents(function(events) {
		loadEvents("Interest Checks", events);
	}, interestCheckManipulator);
}

function setPastEvents() {
	unloadEvents();
	getEvents(function(events) {
		loadEvents("Past Events", events);
	}, pastEventsManipulator);
}

function loadEvents(title, events) {
	$("#events-title").text(title);
	$("#loader").hide();
	$("#events-container").show();
	events.forEach(function(lscEvent) {
		$("#events-list").append(`<a href="${lscEvent.url}" target="_blank" class="list-group-item">${lscEvent.title}</a>`);
	});
}

function unloadEvents() {
	$("#events-container").hide();
	$("#error-alert").hide();
	$("#loader").show();
	$("#events-list").empty();
}

function showError() {
	$("#loader").hide();
	$("#error-alert").show();
}