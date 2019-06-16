module.exports = function(app, BASE_PATH, provinceEmployments){
   
    var path = "";
  
    // GET /api/v1/province-employments/docs -> Acceso a coleccion llamadas Postman sobre API
    
    path = BASE_PATH + "/province-employments/docs";
    
    app.get(path, (req,res)=>{
        
        res.redirect("https://documenter.getpostman.com/view/6911518/S1EH21Zi");
  
    });
 
   
    // GET /api/v1/province-employments/loadInitialData -> Datos iniciales a cargar en BD si está vacía
    
    path = BASE_PATH + "/province-employments/loadInitialData";
    
    app.get(path, (req,res)=>{
        
        var newProvinceEmployments = [{         // Array de objetos (recursos)
            "province": "valencia",
            "year": "2016",
            "industryEmployment": 173100,
            "buildingEmployment": 68200,
            "servicesEmployment": 832300
        }, {
            "province": "vizcaya",
            "year": "2018",
            "industryEmployment": 86100,
            "buildingEmployment": 27200,
            "servicesEmployment": 379800
        }, {
            "province": "madrid",
            "year": "2018",
            "industryEmployment": 267500,
            "buildingEmployment": 195175,
            "servicesEmployment": 2709675
        }, {
            "province": "sevilla",
            "year": "2018",
            "industryEmployment": 79950,
            "buildingEmployment": 49325,
            "servicesEmployment": 639775
        }, {
            "province": "madrid",
            "year": "2016",
            "industryEmployment": 245200,
            "buildingEmployment": 161600,
            "servicesEmployment": 2626300
        }, {
            "province": "barcelona",
            "year": "2017",
            "industryEmployment": 458000,
            "buildingEmployment": 154500,
            "servicesEmployment": 1955100
        }, {
            "province": "vizcaya",
            "year": "2017",
            "industryEmployment": 94200,
            "buildingEmployment": 29400,
            "servicesEmployment": 368700
        }, {
            "province": "madrid",
            "year": "2017",
            "industryEmployment": 268725,
            "buildingEmployment": 166250,
            "servicesEmployment": 2660950
        }, {
            "province": "valencia",
            "year": "2018",
            "industryEmployment": 191600,
            "buildingEmployment": 70700,
            "servicesEmployment": 868800
        }, {
            "province": "barcelona",
            "year": "2018",
            "industryEmployment": 489000,
            "buildingEmployment": 159100,
            "servicesEmployment": 1981800
        }, {
            "province": "vizcaya",
            "year": "2016",
            "industryEmployment": 95300,
            "buildingEmployment": 33500,
            "servicesEmployment": 358700
        }, {
            "province": "sevilla",
            "year": "2016",
            "industryEmployment": 76700,
            "buildingEmployment": 45800,
            "servicesEmployment": 609100
        }, {
            "province": "valencia",
            "year": "2017",
            "industryEmployment": 191500,
            "buildingEmployment": 67400,
            "servicesEmployment": 838000
        }, {
            "province": "barcelona",
            "year": "2016",
            "industryEmployment": 458700,
            "buildingEmployment": 137000,
            "servicesEmployment": 1909600
        }, {
            "province": "sevilla",
            "year": "2017",
            "industryEmployment": 81450,
            "buildingEmployment": 43525,
            "servicesEmployment": 627850
        }, {
            "province": "badajoz",
            "year": "2018",
            "industryEmployment": 24450,
            "buildingEmployment": 14625,
            "servicesEmployment": 189050
        }];


        provinceEmployments.find({}).toArray((error,provinceEmploymentsArray)=>{
            
            if (error) {
                console.error("Load Initial Data: Error accesing to DB employments");
                res.sendStatus(500);        // 500 Internal Server Error
            }
            
            if (provinceEmploymentsArray.length!=0){        //BD con datos. No se puede realizar peticion
                console.log("DB employments is not empty. Load Initial Data not performed");
                res.sendStatus(409);        // 409 Conflict
            
            } else {                        //BD vacía. Se cargan datos iniciales
                console.log("DB employments is empty. Loading Initial Data...");
                provinceEmployments.insertMany(newProvinceEmployments);
                res.sendStatus(200);        // 200 Ok
            }
        });
    });
    
    
    // Integration with PROXY to Open Weather (EXTERNA)
    
    var request = require("request");

    app.use("/proxyWeather",function(req, res) {
        var weather = req.headers.city;
        console.log(weather);
        var apiWeather = "http://api.openweathermap.org/data/2.5/weather?q=" + weather + "&APPID=d3aed57dcb8c0af880910cd41bae1abd";
        var url = apiWeather;
        req.pipe(request(url)).pipe(res);
    });
    

    // GET /api/v1/province-employments -> Acceder a todos los recursos con busqueda por tipo de recurso e intervalo. Los resultados se muestran paginados.
    
    path = BASE_PATH + "/province-employments";
    
    app.get(path, (req,res)=>{
        
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        
        if (!limit && !offset) {
            limit = 0;     
            offset = 0;
        }
        
        var province = req.query.province;
        var fromYear = req.query.from;
        var toYear = req.query.to;
        var year = req.query.year;
        var fromIndustryEmployment = parseInt(req.query.fromIndustry);
        var toIndustryEmployment = parseInt(req.query.toIndustry);
        var fromBuildingEmployment = parseInt(req.query.fromBuilding);
        var toBuildingEmployment = parseInt(req.query.toBuilding);
        var fromServicesEmployment = parseInt(req.query.fromServices);
        var toServicesEmployment = parseInt(req.query.toServices);

        provinceEmployments.find({}).skip(offset).limit(limit).toArray((error, provinceEmploymentsArray) => {
            if (error) {
                console.log("Error: " + error);
                res.sendStatus(500);        // 500 Internal Server Error
                return;  
            }

            if  (province && fromYear && toYear) {
                provinceEmployments.find({ province: province, year: { $gte: fromYear, $lte: toYear } }).skip(offset).limit(limit).toArray((error, filteredEmploymentsArray) => {

                    if(error) {
                        console.log("Error: " + error);
                        res.sendStatus(500);        // 500 Internal Server Error
                        return;  
                    }
                    
                    res.send(filteredEmploymentsArray.map((d)=>{
                        delete d._id;
                        return d;
                    }));
                });      
            
            
            } else if (fromYear && toYear) {
                provinceEmployments.find({ year: { $gte: fromYear, $lte: toYear } }).skip(offset).limit(limit).toArray((error, filteredEmploymentsArray) => {

                    if(error) {
                        console.log("Error: " + error);
                        res.sendStatus(500);        // 500 Internal Server Error
                        return;  
                    }
                    
                    res.send(filteredEmploymentsArray.map((d)=>{
                        delete d._id;
                        return d;
                    }));
                });
                
            } else if (year) {
                provinceEmployments.find({ year:year }).skip(offset).limit(limit).toArray((error, filteredEmploymentsArray) => {
                    
                    if(error) {
                        console.log("Error: " + error);
                        res.sendStatus(500);        // 500 Internal Server Error
                        return;  
                    }
                    
                    res.send(filteredEmploymentsArray.map((d) => {
                        delete d._id;
                        return d;
                    }));
                });
                
            } else if (province) {
                provinceEmployments.find({province:province}).skip(offset).limit(limit).toArray((error, filteredEmploymentsArray) => {

                    if(error) {
                        console.log("Error: " + error);
                        res.sendStatus(500);        // 500 Internal Server Error
                        return;  
                    }
                   
                    res.send(filteredEmploymentsArray.map((d) => {
                        delete d._id;
                        return d;
                    }));
                });
                
            } else if (fromIndustryEmployment && toIndustryEmployment){
                provinceEmployments.find({industryEmployment: { $gte: fromIndustryEmployment, $lte: toIndustryEmployment } }).skip(offset).limit(limit).toArray((error, filteredEmploymentsArray) => {

                    if(error) {
                        console.log("Error: " + error);
                        res.sendStatus(500);        // 500 Internal Server Error
                        return;  
                    }
                   
                    res.send(filteredEmploymentsArray.map((d) => {
                        delete d._id;
                        return d;
                    }));
                });

            } else if (fromBuildingEmployment && toBuildingEmployment){
                provinceEmployments.find({buildingEmployment: { $gte: fromBuildingEmployment, $lte: toBuildingEmployment } }).skip(offset).limit(limit).toArray((error, filteredEmploymentsArray) => {

                    if(error) {
                        console.log("Error: " + error);
                        res.sendStatus(500);        // 500 Internal Server Error
                        return;  
                    }
                   
                    res.send(filteredEmploymentsArray.map((d) => {
                        delete d._id;
                        return d;
                    }));
                });
                
            } else if (fromServicesEmployment && toServicesEmployment){
                provinceEmployments.find({servicesEmployment: { $gte: fromServicesEmployment, $lte: toServicesEmployment } }).skip(offset).limit(limit).toArray((error, filteredEmploymentsArray) => {

                    if(error) {
                        console.log("Error: " + error);
                        res.sendStatus(500);        // 500 Internal Server Error
                        return;  
                    }
                   
                    res.send(filteredEmploymentsArray.map((d) => {
                        delete d._id;
                        return d;
                    }));
                });   

            } else {
                res.send(provinceEmploymentsArray.map((d)=>{
                    delete d._id;
                    return d;
                }));
            }
        });
    });
    

    //GET a un conjunto de recursos por tipo (:province ó :year)

    path = BASE_PATH + "/province-employments/:resource";
    
    app.get(path, (req, res) => {

        var rec =  req.params.resource;
        
        console.log(rec);
        
        if (!Number.parseInt(rec)) {          // Si el tipo de recursos es province
            provinceEmployments.find({province: rec})
                .toArray((error, filteredEmploymentsArray) => {
                    if (error) {
                        console.log("Error: " + error);
                        res.sendStatus(500);        // 500 Internal Server Error
                        return;
                    }

                    if (filteredEmploymentsArray.length > 0) {
                        res.send(filteredEmploymentsArray.map((d) => {
                            delete d._id;
                            return d;
                        }));
    
                    } else {
                        res.sendStatus(404);        // 404 Not Found (recursos no encontrados)
                    }
                });
    
        } else {                                    // Si el tipo de recursos es year
            provinceEmployments.find({year: rec})
                .toArray((error, filteredEmploymentsArray) => {
                    if (error) {
                        console.log("Error: " + error);
                        res.sendStatus(500);        // 500 Internal Server Error
                        return;
                    }
                    if (filteredEmploymentsArray.length > 0) {
                        res.send(filteredEmploymentsArray.map((d) => {
                            delete d._id;
                            return d;
                        }));
    
                    } else {
                        res.sendStatus(404);        // 404 Not Found (recursos no encontrados)
                    }
                });
            }
        });


    // GET /api/v1/province-employments/province/year -> Acceder a un recurso concreto 
    
    path = BASE_PATH + "/province-employments/:province/:year";
    
    app.get(path, (req, res) => {

        var province = req.params.province;
        var year = req.params.year;
        
        provinceEmployments.find({
            
            "province": province,
            "year": year
            
            }).toArray((error, provinceEmploymentsArray) => {
                
                if (error) {
                    console.error("Error accesing DB: GET province-employments/country/year ");
                    res.sendStatus(500);    // 500 Internal Server Error
                }

                if (provinceEmploymentsArray.length > 0) {
                    res.send(provinceEmploymentsArray.map((d) => {
                        delete d._id;
                        return d;
                    })[0]);

                } else {
                    res.sendStatus(404);    // 404 Not Found (recurso no encontrado)
            }
        });
    });


    // POST /api/v1/province-employments + BODY (en JSON)-> Crear un nuevo recurso (POST al conjunto de recursos) 
    
    path = BASE_PATH + "/province-employments";
    
    app.post(path, (req, res) => {
 
        var newProvinceEmployments = req.body;

        if (Object.keys(newProvinceEmployments).length != 5 || !newProvinceEmployments.province || !newProvinceEmployments.year || !newProvinceEmployments.industryEmployment || !newProvinceEmployments.buildingEmployment || !newProvinceEmployments.servicesEmployment) {
        // si el recurso pasado no tiene el formato correcto: tiene campos de más o falta algún campo de los exigidos 
            res.sendStatus(400);        // 400 Bad Request

        } else {
            provinceEmployments.find({
                
                "province": newProvinceEmployments["province"],
                "year": newProvinceEmployments["year"]
                
            }).toArray((error, provinceEmploymentsArray) => {
                
                if (error) {
                    console.error("Error accesing DB employments in POST /province-employments");
                    res.sendStatus(500);        // 500 Internal Server Error
                }

                if (provinceEmploymentsArray.length > 0) {        // Ya existe un recurso con la misma identificacion (province-year)
                    console.log("Resource: " + newProvinceEmployments["province"] + " " + newProvinceEmployments["year"] + " exists in DB");
                    res.sendStatus(409);        // 409 Conflict

                } else {
                    provinceEmployments.insert(newProvinceEmployments);
                    console.log("Created resource: "+ newProvinceEmployments["province"] + " " + newProvinceEmployments["year"]);
                    res.sendStatus(201);        // 201 Created
                }
            });
        }
    });
        
  
    // POST /api/v1/province-employments/province/year -> POST a un recurso -NO PERMITIDO-
          
    path = BASE_PATH + "/province-employments/:province/:year";
    
    app.post(path, (req,res)=>{

        res.sendStatus(405);       // 405 Method Not Allowed 

    });
        
    
    // PUT /api/v1/province-employments -> PUT al conjunto de recursos -NO PERMITIDO-
    
    path = BASE_PATH + "/province-employments";
    
    app.put(path, (req, res) => {

        res.sendStatus(405);        // 405 Method Not Allowed

    });
    
  
    // PUT /api/v1/province-employments/province/year + BODY (en JSON) -> Actualizar un recurso (POST a un recurso)
 
    path = BASE_PATH + "/province-employments/:province/:year";
 
    app.put(path, (req, res) => {
 
        var province = req.params.province;
        var year = req.params.year;
        var toUpdateProvinceEmployments = req.body;

        if (Object.keys(toUpdateProvinceEmployments).length != 5 || !toUpdateProvinceEmployments.province || !toUpdateProvinceEmployments.year || !toUpdateProvinceEmployments.industryEmployment || !toUpdateProvinceEmployments.buildingEmployment || !toUpdateProvinceEmployments.servicesEmployment) {
        // si el recurso pasado no tiene el formato correcto: tiene campos de más o falta algún campo de los exigidos 
            res.sendStatus(400);        // 400 Bad Request

        } else {
            provinceEmployments.find({
                "province": province,
                "year": year
            
            }).toArray((error, provinceEmploymentsArray) => {
                if (error) {
                    console.error("Error accesing DB employments in PUT /province-employments/province/year");
                    res.sendStatus(500);        // 500 Internal Server Error
                }

                if (provinceEmploymentsArray.length == 0) {        // No existe un recurso con la identificacion (province-year) pasada en URL
                    console.log("Resource: " + province + " " + year + " doesn´t exist in DB");
                    res.sendStatus(404);        // 404 Not Found (recurso no encontrado)

                } else if (province == toUpdateProvinceEmployments.province && year == toUpdateProvinceEmployments.year) {
                    provinceEmployments.replaceOne({        // Coincide identificacion recurso (province-year) URL y BODY, y el recurso existe en BD: Actualizamos recurso en BD 
                        "province": province,
                        "year": year
                    }, toUpdateProvinceEmployments);
                    console.log("Updated resource");
                    res.sendStatus(200);        // 200 Ok
 
                } else {
                    res.sendStatus(400);        // 400 Bad Request
                }
            });
        }
    });

 
     // DELETE /api/v1/province-employments -> Borrar todos los recursos
    
    path = BASE_PATH + "/province-employments";
    
    app.delete(path, (req, res) => {
        
        provinceEmployments.deleteMany({});
        res.sendStatus(200);

    });
    
    
    // DELETE /api/v1/province-employments/province/year -> Borrar un recurso 
    
    path = BASE_PATH + "/province-employments/:province/:year";
    
    app.delete(path, (req,res)=>{

        var province = req.params.province;
        var year = req.params.year;

        provinceEmployments.find({
 
            "province": province,
            "year": year

        }).toArray((error, provinceEmploymentsArray) => {
 
            if (error) {
                console.error("Error accesing DB employments in DELETE /province-employments/province/year");
                res.sendStatus(500);        // 500 Internal Server Error
            }

            if (provinceEmploymentsArray.length == 0) {        // No existe un recurso con la identificacion (province-year) pasada en URL
                console.log("Resource: " + province + " " + year + " doesn´t exist in DB");
                res.sendStatus(404);        // 404 Not Found (recurso no encontrado)

            } else {
                // Existe un recurso con esa identificación en BD: Lo eliminamos de la BD
                provinceEmployments.deleteOne({"province": province,"year": year});
                console.log("Deleted resource: " + province + " " + year);
                res.sendStatus(200);        // 200 Ok
            }
        });
    });
};