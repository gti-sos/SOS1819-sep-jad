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
        var newProvinceEmployments = [{
            "province": "cadiz",
            "year": "2018",
            "industryEmployment": "44250",
            "buildingEmployment": "35575",
            "servicesEmployment": "373400"
        }, {
            "province": "madrid",
            "year": "2018",
            "industryEmployment": "267500",
            "buildingEmployment": "195175",
            "servicesEmployment": "2709675"
        }, {
            "province": "sevilla",
            "year": "2018",
            "industryEmployment": "79950",
            "buildingEmployment": "49325",
            "servicesEmployment": "639775"
        }, {
            "province": "madrid",
            "year": "2017",
            "industryEmployment": "268725",
            "buildingEmployment": "166250",
            "servicesEmployment": "2660950"
        }, {
            "province": "sevilla",
            "year": "2017",
            "industryEmployment": "81450",
            "buildingEmployment": "43525",
            "servicesEmployment": "627850"
        }];

        provinceEmployments.find({}).toArray((error,provinceEmploymentsArray)=>{
            if (error) {
                console.error("Load Initial Data: Error accesing to DB employments");
                res.sendStatus(500);        // 500 Internal Server Error
            }
            
            if (provinceEmploymentsArray.length!=0){        //BD con datos. No se puede realizar peticion
                console.log("DB employments is not empty. Load Initial Data not performed");
                res.sendStatus(409);        // 409 Conflict
            
            } else {        //BD vacía. Se cargan datos iniciales
                console.log("DB employments is empty. Loading Initial Data...");
                provinceEmployments.insertMany(newProvinceEmployments);
                res.sendStatus(200);        // 200 Ok
            }
        });
    });
    
    
    // GET /api/v1/province-employments -> Acceder a todos los recursos con busqueda por intervalo. Los resultados se muestran paginados.
    
    path = BASE_PATH + "/province-employments";
    
    app.get(path, (req,res)=>{
        var from = parseInt(req.query.from);
        var to = parseInt(req.query.to);
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        
        if (!limit && !offset) {
            limit = 10;     
            offset = 0;
        }
        
        var province = req.query.province;
        var year = req.query.year;
        var industryEmployment = req.query.industryEmployment;
        var buildingEmployment = req.query.buildingEmployment;
        var servicesEmployment = req.query.servicesEmployment;
        
        if (Number.isInteger(limit) && Number.isInteger(offset) && Number.isInteger(from) && Number.isInteger(to)) {
            provinceEmployments.find({ year: { $gte: from, $lte: to } }).skip(offset).limit(limit).toArray((error, provinceEmploymentsArray) => {
                if(error)
                    console.log("Error: " + error);
                res.send(provinceEmploymentsArray.map((d)=>{
                    delete d._id;
                    return d;
                }));
            });
            
        } else if (year) {
            provinceEmployments.find({year:year}).skip(offset).limit(limit).toArray((error, provinceEmploymentsArray) => {
                if (error)
                    console.log("Error: " + error);
                res.send(provinceEmploymentsArray.map((d) => {
                    delete d._id;
                    return d;
                }));
            });
            
        } else if (province) {
            provinceEmployments.find({province:province}).skip(offset).limit(limit).toArray((error, provinceEmploymentsArray) => {
                if (error)
                    console.log("Error: " + error);
                res.send(provinceEmploymentsArray.map((d) => {
                    delete d._id;
                    return d;
                }));
            });
            
        } else if (industryEmployment){
            provinceEmployments.find({industryEmployment: industryEmployment}).skip(offset).limit(limit).toArray((error, provinceEmploymentsArray) => {
                if (error)
                    console.log("Error: " + error);
                res.send(provinceEmploymentsArray.map((d) => {
                    delete d._id;
                    return d;
                }));
            });
            
        } else if (buildingEmployment){
            provinceEmployments.find({buildingEmployment:buildingEmployment}).skip(offset).limit(limit).toArray((error, provinceEmploymentsArray) => {
                if (error)
                    console.log("Error: " + error);
                res.send(provinceEmploymentsArray.map((d) => {
                    delete d._id;
                    return d;
                }));
            });
            
        } else if (servicesEmployment){
            provinceEmployments.find({servicesEmployment:servicesEmployment}).skip(offset).limit(limit).toArray((error, provinceEmploymentsArray) => {
                if (error)
                    console.log("Error" + error);
                res.send(provinceEmploymentsArray.map((d) => {
                    delete d._id;
                    return d;
                }));
            });
            
        } else {
            provinceEmployments.find({}).skip(offset).limit(limit).toArray((error,provinceEmploymentsArray)=>{
                if(error)
                    console.log("Error" + error);
                res.send(provinceEmploymentsArray.map((d)=>{
                    delete d._id;
                    return d;
                }));
            });
        }
    });


    // GET /api/v1/province-employments/province -> Acceder a todos los recursos de una provincia [opcional: en un periodo de años]. Los resultados se muestran paginados.

    path = BASE_PATH + "/province-employments/:province";
    
    app.get(path, (req, res) => {
        var province = req.params.province;
        var fromYear = parseInt(req.query.from);
        var toYear = parseInt(req.query.to);
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);

        if (!limit && !offset) {
            limit = 10;     
            offset = 0;
        }

        if (Number.isInteger(fromYear) && Number.isInteger(toYear)) {
        // Si nos pasan en la URL un periodo de años: from=fromYear&to=toYear 
            provinceEmployments.find({ "province": province, "year": { $gte: fromYear, $lte: toYear } }).skip(offset).limit(limit).toArray((error, provinceEmploymentsArray) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);        // 500 Internal Server Error
                    return;
                }
                if (provinceEmploymentsArray.length >= 1) {
                    res.send(provinceEmploymentsArray.map((d) => {
                        delete d._id;
                        return d;
                    }));
                    
                } else {
                    res.sendStatus(404);        // 404 Not Found (recurso no encontrado)
                }
            });
    
        } else {
            // No nos pasan un periodo de años. Devolvemos todos los recursos existentes para la provincia dada
            provinceEmployments.find({ "province": province }).skip(offset).limit(limit).toArray((error, provinceEmploymentsArray) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);    // 500 Internal Server Error
                    return;
                }
                if (provinceEmploymentsArray.length >= 1) {
                    res.send(provinceEmploymentsArray.map((d) => {
                        delete d._id;
                        return d;
                    }));
                    
                } else {
                    res.sendStatus(404);    // 404 Not Found (recurso no encontrado)
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
                    console.log("Created resource");
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
        provinceEmployments.remove();
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
                provinceEmployments.remove({"province": province,"year": year});
                res.sendStatus(200);        // 200 Ok
            }
        });
    });

};