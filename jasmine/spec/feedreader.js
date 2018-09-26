/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

// TODO: Revisit using jasmine-jquery package. This attempt was unsuccessful.
// var jasmineJquery = require("jasmine-jquery");

$(function() {
	//First test suite
	describe("RSS Feeds", function() {
		// First test
		// allFeeds variable is defined and is not empty.
		it("are defined", function()  {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		describe("Each feed in allFeeds Object", function()  {
			// loops through each feed in the allFeeds object and ensures it has a
			// URL defined and is not empty.
			it("has defined url", function()  {
				allFeeds.forEach(function(feed)  {
					expect(feed.url).toBeDefined();
					expect(feed.url).not.toBe("");
				});
			});
		});

		describe("Each feed in allFeeds Object", function() {
			// loops through each feed in the allFeeds object and ensures it has a
			// name defined is not empty.
			it("has defined name", function()  {
				allFeeds.forEach(function(feed)  {
					expect(feed.name).toBeDefined();
					expect(feed.name).not.toBe("");
				});
			});
		});
	});


	// New test suite
	describe("The menu", function() {
		// Ensures the menu element is hidden by default.
		let body = document.querySelector("body");
		let menuIcon = document.querySelector(".menu-icon-link");

		it("is hidden by default", function()  {
			// read-only property returns a live DOMTokenList -
			// methods: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
			expect(body.classList.contains("menu-hidden")).toBe(true);
		});

		describe("The menu icon", function() {
			// Ensures the menu changes visibility when menu icon is clicked.
			it("changes visibility when clicked", function()  {
				//https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click
				// menu displays when icon is clicked
				menuIcon.click();
				expect(body.classList.contains("menu-hidden")).toBe(false);
				// menu hides when icon is clicked again
				menuIcon.click();
				expect(body.classList.contains("menu-hidden")).toBe(true);
			});
		});
	});


	// New test suite
	describe("Initial Entries", function()  {
		// Ensures an .entry element within the .feed container when loadFeed
		// function is called and completes its work.

		// Jasmine specific global function (async) runs setup (loadFeed) before each
		// spec in the describe (test) in which it is called.
		beforeEach(function(done)  {
			loadFeed(0, done);
		});

		it("verifies feed contains an entry after loadFeed function executes", function() {
			let feedEntries = document.querySelectorAll(".feed .entry");
			// console.log(entries);
			expect(feedEntries.length).toBeGreaterThan(0);
		});
	});


	// New test suite
	describe("New Feed Selection", function() {
		// Ensures content actually changes when a new feed is loaded by loadFeed function.
		let firstFeed;
		let otherFeeds;

		beforeEach(function(done)  {
			loadFeed(1, function()  {
				otherFeeds = document.querySelectorAll(".feed .entry");
				// console.log(otherFeeds[0].innerText);

				loadFeed(0, function()  {
					firstFeed = document.querySelectorAll(".feed .entry");
					done();
					// console.log(firstFeed[0].innerText);
				});
			});
		});

		it("checks for content change on new entry load in the feed", function() {
			expect(otherFeeds[0].innerText).not.toBe(firstFeed[0].innerText);
		});
	});
}());
