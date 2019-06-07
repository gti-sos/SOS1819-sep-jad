describe("Check if an employment can be deleted",function () {
    it("List should decrease after deleting an employment", function (){
        browser.get("http://localhost:8080/#!/ui/v1/province-employments");
        element
            .all(by.repeater("provinceEmployment in provinceEmployments"))
            .then(function(initialEmployments) {
                
                element.all(by.css('[value="delete"]')).last().click();
                element
                    .all(by.repeater("provinceEmployment in provinceEmployments"))
                    .then(function(finalEmployments) {
                        expect(finalEmployments.length).toEqual(initialEmployments.length-1);
                    });
            });
    });
});