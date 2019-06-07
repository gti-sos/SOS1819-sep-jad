describe("Check if a new employment can be created",function () {
    it("List should grow after the contact creation", function (){
        browser.get("http://localhost:8080/#!/ui/v1/province-employments");
        element
            .all(by.repeater("provinceEmployment in provinceEmployments"))
            .then(function(initialEmployments) {
                
                element(by.model('newProvinceEmployment.province')).sendKeys("barcelona");
                element(by.model('newProvinceEmployment.year')).sendKeys("2018");                                                                                                                            
                element(by.model('newProvinceEmployment.industryEmployment')).sendKeys("10");
                element(by.model('newProvinceEmployment.buildingEmployment')).sendKeys("20");
                element(by.model('newProvinceEmployment.servicesEmployment')).sendKeys("30");
                element(by.css('[value="add"]')).click();
                
                element
                    .all(by.repeater("provinceEmployment in provinceEmployments"))
                    .then(function(finalEmployments) {
                        expect(finalEmployments.length).toEqual(initialEmployments.length+1);
                    });
            });
    });
});