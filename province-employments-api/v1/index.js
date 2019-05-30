module.exports = function(app, BASE_PATH, provinceEmployments){
   
    var path = "";
  
    // GET /api/v1/province-employments/docs/ -> Acceso a coleccion llamadas Postman sobre API
    
    path = BASE_PATH + "/province-employments/docs";
    
    app.get(path, (req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/6911518/S1EH21Zi");
    });
   
   
    // GET province-employments/loadInitialData -> Datos iniciales a cargar en BD si está vacía
    
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
                res.sendStatus(500);        // Internal Server Error
            }
            
            if (provinceEmploymentsArray.length!=0){        //BD con datos. No se puede realizar peticion
                console.log("DB employments is not empty. Load Initial Data not performed");
                res.sendStatus(409);        // Conflict
            
            } else {        //BD vacía. Se cargan datos iniciales
                console.log("DB employments is empty. Loading Initial Data...");
                provinceEmployments.insertMany(newProvinceEmployments);
                res.sendStatus(200);        // Ok
            }
        });
    });
    
    
    // DELETE /province-employments -> Borrado del conjunto de recursos
    
    path = BASE_PATH + "/province-employments";
    
    app.delete(path, (req, res) => {
        provinceEmployments.remove();
        res.sendStatus(200);
    });
    
    
/*  // GET /province-employments
    
    path = BASE_PATH + "/province-employments";
    app.get(path, (req,res)=>{
        
        var from = parseInt(req.query.from);
        var to = parseInt(req.query.to);
        
        var limit = Number(req.query.limit);
        var offset = Number(req.query.offset);
        
        var province = req.query.province;
        var year =req.query.year;
        var industryEmployment = req.query.industryEmployment;
        var buildingEmployment = req.query.buildingEmployment;
        var servicesEmployment = req.query.servicesEmployment;
        
        if (Number.isInteger(limit) && Number.isInteger(offset) && Number.isInteger(from) && Number.isInteger(to)) {
            provinceEmployments.find({ year: { $gte: from, $lte: to } }).skip(offset).limit(limit).toArray((error, provinceEmploymentsArray) => {
                if(error)
                    console.log("Error");
                res.send(provinceEmploymentsArray.map((d)=>{
                    delete d._id;
                    return d;
                }));
            });
         } else if (year) {
             provinceEmployments.find({year:year}).skip(offset).limit(limit).toArray((error, provinceEmploymentsArray) => {
                if (error)
                    console.log("Error");
                res.send(provinceEmploymentsArray.map((d) => {
                    delete d._id;
                    return d;
                }));
            });
         } else if (province) {
             provinceEmployments.find({province:province}).skip(offset).limit(limit).toArray((error, provinceEmploymentsArray) => {
             if (error)
                    console.log("Error");
                res.send(provinceEmploymentsArray.map((d) => {
                    delete d._id;
                    return d;
                }));
            });        
         } else if (industryEmployment){
             provinceEmployments.find({industryEmployment: industryEmployment}).skip(offset).limit(limit).toArray((error, provinceEmploymentsArray) => {
                if (error)
                    console.log("Error");
                res.send(provinceEmploymentsArray.map((d) => {
                    delete d._id;
                    return d;
                }));
            });
         } else if (buildingEmployment){
             provinceEmployments.find({buildingEmployment:buildingEmployment}).skip(offset).limit(limit).toArray((error, provinceEmploymentsArray) => {
                if (error)
                    console.log("Error");
                res.send(provinceEmploymentsArray.map((d) => {
                    delete d._id;
                    return d;
                }));
            });
         } else if (servicesEmployment){
             provinceEmployments.find({servicesEmployment:servicesEmployment}).skip(offset).limit(limit).toArray((error, provinceEmploymentsArray) => {
                if (error)
                    console.log("Error");
                res.send(provinceEmploymentsArray.map((d) => {
                    delete d._id;
                    return d;
                }));
            });
         } else {
              provinceEmployments.find({}).skip(offset).limit(limit).toArray((error,provinceEmploymentsArray)=>{
            if(error)
                console.log("Error");
            res.send(provinceEmploymentsArray.map((d)=>{
                delete d._id;
                return d;
            }));
        });
        }
         
    });


    // GET a un recurso -> /province-employments/province/year
    
    path = BASE_PATH + "/province-employments/:province/:year";
    app.get(path, (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        var i = 0;
        var updatedprovinceEmployments = [];
    
        provinceEmployments.find({}).toArray((error,provinceEmploymentsArray)=>{
            for(i=0;i<provinceEmploymentsArray.length;i++)
                if(provinceEmploymentsArray[i].province==province && provinceEmploymentsArray[i].year==year)
                    updatedprovinceEmployments.push(provinceEmploymentsArray[i]);
                
        if (updatedprovinceEmployments.length==0){
            res.sendStatus(404);
        
        }else{
            delete updatedprovinceEmployments[0]._id;
            res.send(updatedprovinceEmployments[0]);
        }
        }); 
    });
  

    // POST /province-employments
    
    path = BASE_PATH + "/province-employments";
    app.post(path, (req, res) => {
        var newProvinceEmployments = req.body;
        var coincide = false;
        var i = 0;

        if (newProvinceEmployments.province == null || newProvinceEmployments.year == null || newProvinceEmployments.industryEmployment == null || newProvinceEmployments.buildingEmployment == null || newProvinceEmployments.servicesEmployment == null){
            res.sendStatus(400);
        }else{
            provinceEmployments.find({}).toArray((error,provinceEmploymentsArray)=>{
                for(i=0;i<provinceEmploymentsArray.length;i++)
                    if (provinceEmploymentsArray[i].province==newProvinceEmployments.province && provinceEmploymentsArray[i].year==newProvinceEmployments.year)
                        coincide = true;
                
        if(coincide == true) {
            res.sendStatus(409);
        
        }else{ 
            provinceEmployments.insert(newProvinceEmployments);
            res.sendStatus(201);
        } 
        });
    }
    });
        
    
    // POST a un recurso -> /province-employments/province/year   -NO PERMITIDO-
          
    path = BASE_PATH + "/province-employments/:province/:year";
    app.post(path, (req,res)=>{
        res.sendStatus(405);
    });
        
    
    // PUT /province-employments   -NO PERMITIDO-
    
    path = BASE_PATH + "/province-employments";
    app.put(path, (req, res) => {
        res.sendStatus(405);
    });
    
    
    // PUT a un recurso -> /province-employments/province/year
    
    path = BASE_PATH + "/province-employments/:province/:year";
    app.put(path, (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        var updatedData = req.body;
        var found = false;
        var coincide = true;
        var i = 0;
        var updatedprovinceEmployments = [];
        var aut = true;
        
        provinceEmployments.find({}).toArray((error,provinceEmploymentsArray)=>{
            for(i=0;i<provinceEmploymentsArray.length;i++)
                if (provinceEmploymentsArray[i].province==province && provinceEmploymentsArray[i].year==year){
                    if (provinceEmploymentsArray[i].province==updatedData.province && provinceEmploymentsArray[i].year==updatedData.year){
                        if(updatedData._id != null) {
                            if(provinceEmploymentsArray[i]._id != updatedData._id)
                                aut = false;
                                found = true;
                        } else {
                        found = true;
                        updatedprovinceEmployments.push(updatedData);
                        }    
                    }else{
                        coincide = false;
                    }
                } else {
                    updatedprovinceEmployments.push(provinceEmploymentsArray[i]);
                }
        
        if (coincide==false){
            res.sendStatus(400);
        }else if (found==false){
            res.sendStatus(404);
        } else if (aut == false){
            res.sendStatus(401);
        }else{
            provinceEmployments.remove();
            updatedprovinceEmployments.filter((d) =>{
                provinceEmployments.insert(d);
                });
            res.sendStatus(200);
        }
        });
    });

    // DELETE a un recurso -> /province-employments/province/year
    
    path = BASE_PATH + "/province-employments/:province/:year";
    app.delete(path, (req,res)=>{
        var province = req.params.province;
        var year = req.params.year;
        var found = false;
        var updatedprovinceEmployments = [];
        var i = 0;
    
        provinceEmployments.find({}).toArray((error,provinceEmploymentsArray)=>{
            for(i=0;i<provinceEmploymentsArray.length;i++)
           
                if (provinceEmploymentsArray[i].province==province&&provinceEmploymentsArray[i].year==year)
                    found = true;
                else
                    updatedprovinceEmployments.push(provinceEmploymentsArray[i]);
        
            if (found==false)
                res.sendStatus(404);
            else
                provinceEmployments.remove();
                updatedprovinceEmployments.filter((d) =>{
                    provinceEmployments.insert(d);
                });
                res.sendStatus(200);
        });
    });
*/

};