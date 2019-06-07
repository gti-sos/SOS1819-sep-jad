describe('Employments Data is loaded', function () {
	it('should show a bunch of data', function (){
		browser.get("http://localhost:8080/#!/ui/v1/province-employments");

// browser.get("https://sos1819-jun-jad.herokuapp.com/#!/ui/v1/province-employments");

		var employments = element.all(by.repeater("provinceEmployment in provinceEmployments"));
		expect(employments.count()).toBeGreaterThan(0);
	});
});