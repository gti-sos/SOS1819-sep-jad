describe("Check if a new employment can be created",function () {
    
	it("List should grow after the contact creation", function () {
        
		browser.get("https://sos1819-sep-jad.run.goorm.io/#!/ui/v1/province-employments");

        var initialEmployments = element.all(by.repeater("provinceEmployment in provinceEmployments"))		
            
			.then(function(initialEmployments) {
				
                element(by.model('newProvinceEmployment.province')).sendKeys("cordoba");
                element(by.model('newProvinceEmployment.year')).sendKeys("2018");                                                                         element(by.model('newProvinceEmployment.industryEmployment')).sendKeys("44000");
                element(by.model('newProvinceEmployment.buildingEmployment')).sendKeys("35000");
                element(by.model('newProvinceEmployment.servicesEmployment')).sendKeys("373400");
                element(by.css('[value="add"]')).click()
				
                    .then(function() {
                        element
                            .all(by.repeater("provinceEmployment in provinceEmployments"))
                            .then(function(finalEmployments) {
                                expect(finalEmployments.length).toEqual(initialEmployments.length+1);
                            });
                    });
            });
        });
    });