exports.config = {
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs:  [ 
            "e2e/TC01-loadProvinceEmployments.js",
            "e2e/TC02-addProvinceEmployment.js",
            "e2e/TC03-deleteProvinceEmployment.js",
            ]
    };