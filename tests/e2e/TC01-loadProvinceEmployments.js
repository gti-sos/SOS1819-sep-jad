/* 
Con URL Heroku funciona. Seria: browser.get("https://sos1819-sep-jad.herokuapp.com/#!/ui/v1/province-employments");
Con esta URL local (browser.get("http://localhost:8080/#!/ui/v1/province-employments"); no va
*/

describe('Employments Data is loaded', function () {
	it('should show a bunch of data', function (){
		
		browser.get("https://sos1819-sep-jad.run.goorm.io/#!/ui/v1/province-employments");
		
		var employments = element.all(by.repeater("provinceEmployment in provinceEmployments"));
		
		expect(employments.count()).toBeGreaterThan(0);
	});
});