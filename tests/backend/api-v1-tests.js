{
	"info": {
		"_postman_id": "f5975da4-b179-4abe-8cd5-5a378775a06d",
		"name": "SOS1819-sep-jad-D01-province-employments",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "DEL al conjunto de recursos - BD vacia",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "8fa8bd84-0bf3-4652-b975-80f0a8667e1b",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							""
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments"
					]
				}
			},
			"response": []
		},
		{
			"name": "DEL al conjunto de recursos - BD vacia Copy",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "8fa8bd84-0bf3-4652-b975-80f0a8667e1b",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							""
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments"
					]
				}
			},
			"response": []
		},
		{
			"name": "GET al conjunto de recursos-BD vacia-estado inicial",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "20ba22f9-18ad-4a3a-905d-3aff4bc30f7e",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"BD is empty\", function () {",
							"    var jsonData = pm.response.json();",
							"    pm.expect(jsonData.length>0).to.be.false;",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments?",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments"
					],
					"query": [
						{
							"key": "province",
							"value": "sevilla",
							"disabled": true
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "Carga Inicial Datos",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "de8aac3e-d7ce-4f4a-b7cf-bc9a87665cfd",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							""
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments/loadInitialData",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments",
						"loadInitialData"
					]
				}
			},
			"response": []
		},
		{
			"name": "GET al conjunto de recursos - BD con datos iniciales",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "5b5a18c3-03b2-4d82-b5e3-06cccb1ffe77",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"BD has Initial Data (sixteen resources)\", function () {",
							"    var jsonData = pm.response.json();",
							"    pm.expect(jsonData.length==16).to.be.true;",
							"});",
							"",
							"pm.test(\"Response must be valid and have a body JSON\", function () {",
							"    pm.response.to.be.ok;",
							"    // pm.response.to.be.withBody;",
							"    pm.response.to.be.json; // this assertion also checks if a body  exists",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments"
					]
				}
			},
			"response": []
		},
		{
			"name": "GET paginado al conjunto de recursos 1/2",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "5b5a18c3-03b2-4d82-b5e3-06cccb1ffe77",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"BD has Data)\", function () {",
							"    var jsonData = pm.response.json();",
							"    pm.expect(jsonData.length>0).to.be.true;",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments?limit=10&offset=0",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments"
					],
					"query": [
						{
							"key": "limit",
							"value": "10"
						},
						{
							"key": "offset",
							"value": "0"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "GET paginado al conjunto de recursos 2/2",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "5b5a18c3-03b2-4d82-b5e3-06cccb1ffe77",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"BD has Data)\", function () {",
							"    var jsonData = pm.response.json();",
							"    pm.expect(jsonData.length>0).to.be.true;",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments?limit=10&offset=10",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments"
					],
					"query": [
						{
							"key": "limit",
							"value": "10"
						},
						{
							"key": "offset",
							"value": "10"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "GET al conjunto de recursos de una provincia (sevilla)",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "5b5a18c3-03b2-4d82-b5e3-06cccb1ffe77",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"BD has Data for the type of resource\", function () {",
							"    var jsonData = pm.response.json();",
							"    pm.expect(jsonData.length>0).to.be.true;",
							"});",
							""
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments/sevilla",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments",
						"sevilla"
					]
				}
			},
			"response": []
		},
		{
			"name": "GET al conjunto de recursos de un aÃ±o (2018)",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "5b5a18c3-03b2-4d82-b5e3-06cccb1ffe77",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"BD has Data for the type of resource\", function () {",
							"    var jsonData = pm.response.json();",
							"    pm.expect(jsonData.length>0).to.be.true;",
							"});",
							""
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments/2018",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments",
						"2018"
					]
				}
			},
			"response": []
		},
		{
			"name": "POST al conjunto de recursos - JSON mal (falta 1 campo)",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "bcc72bea-a837-42f1-b1db-14958dc12504",
						"exec": [
							"pm.test(\"Status code is 400\", function () {",
							"    pm.response.to.have.status(400);",
							"});",
							""
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"type": "text",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n        \"province\": \"cordoba\",\n        \"year\": \"2018\",\n        \"buildingEmployment\": 35000,\n        \"servicesEmployment\": 373400\n    }"
				},
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments"
					]
				}
			},
			"response": [
				{
					"name": "POST al conjunto de recursos - Crea recurso",
					"originalRequest": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"name": "Content-Type",
								"value": "application/json",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n        \"province\": \"cordoba\",\n        \"year\": \"2018\",\n        \"industryEmployment\": 44000,\n        \"buildingEmployment\": 35000,\n        \"servicesEmployment\": 373400\n    }"
						},
						"url": {
							"raw": "https://sos1819-jun-jad.herokuapp.com/api/v1/province-employments",
							"protocol": "https",
							"host": [
								"sos1819-jun-jad",
								"herokuapp",
								"com"
							],
							"path": [
								"api",
								"v1",
								"province-employments"
							]
						}
					},
					"status": "Conflict",
					"code": 409,
					"_postman_previewlanguage": "plain",
					"header": [
						{
							"key": "Server",
							"value": "Cowboy"
						},
						{
							"key": "Connection",
							"value": "keep-alive"
						},
						{
							"key": "X-Powered-By",
							"value": "Express"
						},
						{
							"key": "Content-Type",
							"value": "text/plain; charset=utf-8"
						},
						{
							"key": "Content-Length",
							"value": "8"
						},
						{
							"key": "Etag",
							"value": "W/\"8-OfewgPiFJ3o3XA5wgKRYk2ZHNlU\""
						},
						{
							"key": "Date",
							"value": "Wed, 12 Jun 2019 11:23:00 GMT"
						},
						{
							"key": "Via",
							"value": "1.1 vegur"
						}
					],
					"cookie": [],
					"body": "Conflict"
				}
			]
		},
		{
			"name": "POST al conjunto de recursos - JSON mal (no existe campo)",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "bcc72bea-a837-42f1-b1db-14958dc12504",
						"exec": [
							"pm.test(\"Status code is 400\", function () {",
							"    pm.response.to.have.status(400);",
							"});",
							""
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"type": "text",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n        \"province\": \"cordoba\",\n        \"aÃ±o\": \"2018\",\n        \"industryEmployment\": 44000,\n        \"buildingEmployment\": 35000,\n        \"servicesEmployment\": 373400\n    }"
				},
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments"
					]
				}
			},
			"response": [
				{
					"name": "POST al conjunto de recursos - Crea recurso",
					"originalRequest": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"name": "Content-Type",
								"value": "application/json",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n        \"province\": \"cordoba\",\n        \"year\": \"2018\",\n        \"industryEmployment\": 44000,\n        \"buildingEmployment\": 35000,\n        \"servicesEmployment\": 373400\n    }"
						},
						"url": {
							"raw": "https://sos1819-jun-jad.herokuapp.com/api/v1/province-employments",
							"protocol": "https",
							"host": [
								"sos1819-jun-jad",
								"herokuapp",
								"com"
							],
							"path": [
								"api",
								"v1",
								"province-employments"
							]
						}
					},
					"status": "Conflict",
					"code": 409,
					"_postman_previewlanguage": "plain",
					"header": [
						{
							"key": "Server",
							"value": "Cowboy"
						},
						{
							"key": "Connection",
							"value": "keep-alive"
						},
						{
							"key": "X-Powered-By",
							"value": "Express"
						},
						{
							"key": "Content-Type",
							"value": "text/plain; charset=utf-8"
						},
						{
							"key": "Content-Length",
							"value": "8"
						},
						{
							"key": "Etag",
							"value": "W/\"8-OfewgPiFJ3o3XA5wgKRYk2ZHNlU\""
						},
						{
							"key": "Date",
							"value": "Wed, 12 Jun 2019 11:23:00 GMT"
						},
						{
							"key": "Via",
							"value": "1.1 vegur"
						}
					],
					"cookie": [],
					"body": "Conflict"
				}
			]
		},
		{
			"name": "GET a un recurso -No existe (antes de crearlo)",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "5307efda-4920-453e-a17c-3f4138ace41b",
						"exec": [
							"pm.test(\"Status code is 404 Not Found\", function () {",
							"    pm.response.to.have.status(404);",
							"});",
							"",
							"",
							""
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"type": "text",
						"value": "application/json"
					}
				],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments/cordoba/2018",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments",
						"cordoba",
						"2018"
					]
				}
			},
			"response": []
		},
		{
			"name": "POST al conjunto de recursos - Crea recurso (cordoba-2018)",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "bcc72bea-a837-42f1-b1db-14958dc12504",
						"exec": [
							"pm.test(\"Status code is 201 Created\", function () {",
							"    pm.response.to.have.status(201);",
							"});",
							""
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"value": "application/json",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n        \"province\": \"cordoba\",\n        \"year\": \"2018\",\n        \"industryEmployment\": 44000,\n        \"buildingEmployment\": 35000,\n        \"servicesEmployment\": 373400\n    }"
				},
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments"
					]
				}
			},
			"response": [
				{
					"name": "POST al conjunto de recursos - Crea recurso",
					"originalRequest": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"name": "Content-Type",
								"value": "application/json",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n        \"province\": \"cordoba\",\n        \"year\": \"2018\",\n        \"industryEmployment\": 44000,\n        \"buildingEmployment\": 35000,\n        \"servicesEmployment\": 373400\n    }"
						},
						"url": {
							"raw": "https://sos1819-jun-jad.herokuapp.com/api/v1/province-employments",
							"protocol": "https",
							"host": [
								"sos1819-jun-jad",
								"herokuapp",
								"com"
							],
							"path": [
								"api",
								"v1",
								"province-employments"
							]
						}
					},
					"status": "Conflict",
					"code": 409,
					"_postman_previewlanguage": "plain",
					"header": [
						{
							"key": "Server",
							"value": "Cowboy"
						},
						{
							"key": "Connection",
							"value": "keep-alive"
						},
						{
							"key": "X-Powered-By",
							"value": "Express"
						},
						{
							"key": "Content-Type",
							"value": "text/plain; charset=utf-8"
						},
						{
							"key": "Content-Length",
							"value": "8"
						},
						{
							"key": "Etag",
							"value": "W/\"8-OfewgPiFJ3o3XA5wgKRYk2ZHNlU\""
						},
						{
							"key": "Date",
							"value": "Wed, 12 Jun 2019 11:23:00 GMT"
						},
						{
							"key": "Via",
							"value": "1.1 vegur"
						}
					],
					"cookie": [],
					"body": "Conflict"
				}
			]
		},
		{
			"name": "GET a un recurso - Al creado",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "d62a73e3-1cf2-4fa4-a5f9-7b864d5570a4",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"Response must be valid and have a body JSON\", function () {",
							"    pm.response.to.be.ok;   // pm.response.to.be.withBody;",
							"    pm.response.to.be.json; // this assertion also checks if a body  exists",
							"});",
							"",
							"pm.test(\"cordoba-2018\", function () {",
							"    var jsonData = pm.response.json();",
							"    pm.expect(jsonData.province).to.eql(\"cordoba\");",
							"    pm.expect(jsonData.year).to.eql(\"2018\");",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"value": "application/json",
						"type": "text"
					}
				],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments/cordoba/2018",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments",
						"cordoba",
						"2018"
					]
				}
			},
			"response": []
		},
		{
			"name": "POST al conjunto de recursos - Existe recurso - 409 Conflicto",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "4ccd1288-d315-47ac-a7b1-eec3fcf80067",
						"exec": [
							"pm.test(\"Status code is 409 Conflict\", function () {",
							"    pm.response.to.have.status(409);",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"type": "text",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n        \"province\": \"cordoba\",\n        \"year\": \"2018\",\n        \"industryEmployment\": 44000,\n        \"buildingEmployment\": 35000,\n        \"servicesEmployment\": 373400\n    }"
				},
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments"
					]
				}
			},
			"response": []
		},
		{
			"name": "POST a un recurso - 405 No permitido",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "1a256071-2f71-4478-8165-c33e5a71ba70",
						"exec": [
							"pm.test(\"Status code is 405 Method Not Allowed\", function () {",
							"    pm.response.to.have.status(405);",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"type": "text",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments/sevilla/2018",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments",
						"sevilla",
						"2018"
					]
				}
			},
			"response": []
		},
		{
			"name": "DEL a un recurso - Borra recurso creado",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "04974898-d784-430a-bf27-756cc464fb8a",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments/cordoba/2018",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments",
						"cordoba",
						"2018"
					]
				}
			},
			"response": []
		},
		{
			"name": "DEL a un recurso - No existe recurso - 404 No encontrado",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "04974898-d784-430a-bf27-756cc464fb8a",
						"exec": [
							"pm.test(\"Status code is 404 Not Found\", function () {",
							"    pm.response.to.have.status(404);",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments/cordoba/2018",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments",
						"cordoba",
						"2018"
					]
				}
			},
			"response": []
		},
		{
			"name": "GET a un recurso - Antes de actualizar",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "5307efda-4920-453e-a17c-3f4138ace41b",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"Response must be valid and have a body JSON\", function () {",
							"    pm.response.to.be.ok;",
							"    // pm.response.to.be.withBody;",
							"    pm.response.to.be.json; // this assertion also checks if a body  exists",
							"});",
							""
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"type": "text",
						"value": "application/json"
					}
				],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments/sevilla/2018",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments",
						"sevilla",
						"2018"
					]
				}
			},
			"response": []
		},
		{
			"name": "PUT a un recurso - JSON mal (falta 1 campo)",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "7f19c572-0cda-43a8-9a90-fd3cbc2d8cbd",
						"exec": [
							"pm.test(\"Status code is 400\", function () {",
							"    pm.response.to.have.status(400);",
							"});",
							"",
							""
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "PUT",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"type": "text",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n        \"province\": \"sevilla\",\n        \"year\": \"2018\",\n        \"industryEmployment\": 44000,\n        \"servicesEmployment\": 373400\n    }"
				},
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments/sevilla/2018",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments",
						"sevilla",
						"2018"
					]
				}
			},
			"response": []
		},
		{
			"name": "PUT a un recurso - JSON mal (no existe campo)",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "7f19c572-0cda-43a8-9a90-fd3cbc2d8cbd",
						"exec": [
							"pm.test(\"Status code is 400\", function () {",
							"    pm.response.to.have.status(400);",
							"});",
							"",
							""
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "PUT",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"type": "text",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n        \"provincia\": \"sevilla\",\n        \"year\": \"2018\",\n        \"industryEmployment\": 44000,\n        \"buildingEmployment\": 35000,\n        \"servicesEmployment\": 373400\n    }"
				},
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments/sevilla/2018",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments",
						"sevilla",
						"2018"
					]
				}
			},
			"response": []
		},
		{
			"name": "PUT a un recurso - Actualiza recurso (sevilla-2018)",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "7f19c572-0cda-43a8-9a90-fd3cbc2d8cbd",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							""
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "PUT",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"type": "text",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n        \"province\": \"sevilla\",\n        \"year\": \"2018\",\n        \"industryEmployment\": 44000,\n        \"buildingEmployment\": 35000,\n        \"servicesEmployment\": 373400\n    }"
				},
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments/sevilla/2018",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments",
						"sevilla",
						"2018"
					]
				}
			},
			"response": []
		},
		{
			"name": "GET a un recurso - Despues de actualizar",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "5307efda-4920-453e-a17c-3f4138ace41b",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"Response must be valid and have a body JSON\", function () {",
							"    pm.response.to.be.ok;",
							"    // pm.response.to.be.withBody;",
							"    pm.response.to.be.json; // this assertion also checks if a body  exists",
							"});",
							"",
							"pm.test(\"sevilla-2018\", function () {",
							"    var jsonData = pm.response.json();",
							"    pm.expect(jsonData.province).to.eql(\"sevilla\");",
							"    pm.expect(jsonData.year).to.eql(\"2018\");",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"type": "text",
						"value": "application/json"
					}
				],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments/sevilla/2018",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments",
						"sevilla",
						"2018"
					]
				}
			},
			"response": []
		},
		{
			"name": "PUT a un recurso - No existe recurso - 404 No encontrado",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "7f19c572-0cda-43a8-9a90-fd3cbc2d8cbd",
						"exec": [
							"pm.test(\"Status code is 404 Not Found\", function () {",
							"    pm.response.to.have.status(404);",
							"});",
							"",
							""
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "PUT",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"type": "text",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n        \"province\": \"huelva\",\n        \"year\": \"2018\",\n        \"industryEmployment\": 44000,\n        \"buildingEmployment\": 35000,\n        \"servicesEmployment\": 373400\n    }"
				},
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments/huelva/2018",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments",
						"huelva",
						"2018"
					]
				}
			},
			"response": []
		},
		{
			"name": "PUT a un recurso - Deshacemos actualizacion",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "7f19c572-0cda-43a8-9a90-fd3cbc2d8cbd",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							""
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "PUT",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"type": "text",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n    \t\"province\": \"sevilla\",\n\t\t\"year\": \"2018\",\n    \t\"industryEmployment\": 79950,\n    \t\"buildingEmployment\": 49325,\n\t\t\"servicesEmployment\": 639775 \n    }\n    "
				},
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments/sevilla/2018",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments",
						"sevilla",
						"2018"
					]
				}
			},
			"response": []
		},
		{
			"name": "PUT al conjunto de recursos - 405 No permitido",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "c3d0cec0-df76-4967-87e8-dc556a5b68b5",
						"exec": [
							"pm.test(\"Status code is 405 Method Not Allowed\", function () {",
							"    pm.response.to.have.status(405);",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "PUT",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"type": "text",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments"
					]
				}
			},
			"response": []
		},
		{
			"name": "Busqueda de recursos por provincia (madrid)",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "5b5a18c3-03b2-4d82-b5e3-06cccb1ffe77",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"BD has Data for the type of resource\", function () {",
							"    var jsonData = pm.response.json();",
							"    pm.expect(jsonData.length>0).to.be.true;",
							"});",
							"",
							"pm.test(\"Response must be valid and have a body JSON\", function () {",
							"    pm.response.to.be.ok;",
							"    // pm.response.to.be.withBody;",
							"    pm.response.to.be.json; // this assertion also checks if a body  exists",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments?province=madrid",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments"
					],
					"query": [
						{
							"key": "province",
							"value": "madrid"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "Busqueda de recursos por aÃ±o (2017)",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "5b5a18c3-03b2-4d82-b5e3-06cccb1ffe77",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"BD has Data for the type of resource\", function () {",
							"    var jsonData = pm.response.json();",
							"    pm.expect(jsonData.length>0).to.be.true;",
							"});",
							"",
							"pm.test(\"Response must be valid and have a body JSON\", function () {",
							"    pm.response.to.be.ok;",
							"    // pm.response.to.be.withBody;",
							"    pm.response.to.be.json; // this assertion also checks if a body  exists",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments?year=2017",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments"
					],
					"query": [
						{
							"key": "year",
							"value": "2017"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "Busqueda de recursos por rango empleos en sector industria",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "5b5a18c3-03b2-4d82-b5e3-06cccb1ffe77",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"BD has Data for the type of resource\", function () {",
							"    var jsonData = pm.response.json();",
							"    pm.expect(jsonData.length>0).to.be.true;",
							"});",
							"",
							"pm.test(\"Response must be valid and have a body JSON\", function () {",
							"    pm.response.to.be.ok;",
							"    // pm.response.to.be.withBody;",
							"    pm.response.to.be.json; // this assertion also checks if a body  exists",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments?fromIndustry=80000&toIndustry=100000",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments"
					],
					"query": [
						{
							"key": "fromIndustry",
							"value": "80000"
						},
						{
							"key": "toIndustry",
							"value": "100000"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "Busqueda de recursos por rango empleos en sector construccion",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "5b5a18c3-03b2-4d82-b5e3-06cccb1ffe77",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"BD has Data for the type of resource\", function () {",
							"    var jsonData = pm.response.json();",
							"    pm.expect(jsonData.length>0).to.be.true;",
							"});",
							"",
							"pm.test(\"Response must be valid and have a body JSON\", function () {",
							"    pm.response.to.be.ok;",
							"    // pm.response.to.be.withBody;",
							"    pm.response.to.be.json; // this assertion also checks if a body  exists",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments?fromBuilding=100000&toBuilding=200000",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments"
					],
					"query": [
						{
							"key": "fromBuilding",
							"value": "100000"
						},
						{
							"key": "toBuilding",
							"value": "200000"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "Busqueda de recursos por rango empleos en sector servicios",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "5b5a18c3-03b2-4d82-b5e3-06cccb1ffe77",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"BD has Data for the type of resource\", function () {",
							"    var jsonData = pm.response.json();",
							"    pm.expect(jsonData.length>0).to.be.true;",
							"});",
							"",
							"pm.test(\"Response must be valid and have a body JSON\", function () {",
							"    pm.response.to.be.ok;",
							"    // pm.response.to.be.withBody;",
							"    pm.response.to.be.json; // this assertion also checks if a body  exists",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments?fromServices=500000&toServices=1000000",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments"
					],
					"query": [
						{
							"key": "fromServices",
							"value": "500000"
						},
						{
							"key": "toServices",
							"value": "1000000"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "Busqueda de recursos por rango de aÃ±os",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "5b5a18c3-03b2-4d82-b5e3-06cccb1ffe77",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"BD has Data for the type of resource\", function () {",
							"    var jsonData = pm.response.json();",
							"    pm.expect(jsonData.length>0).to.be.true;",
							"});",
							"",
							"pm.test(\"Response must be valid and have a body JSON\", function () {",
							"    pm.response.to.be.ok;",
							"    // pm.response.to.be.withBody;",
							"    pm.response.to.be.json; // this assertion also checks if a body  exists",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments?from=2017&to=2018",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments"
					],
					"query": [
						{
							"key": "from",
							"value": "2017"
						},
						{
							"key": "to",
							"value": "2018"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "Busqueda de recursos por provincia (barcelona) y rango de aÃ±os",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "5b5a18c3-03b2-4d82-b5e3-06cccb1ffe77",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"BD has Data for the type of resource\", function () {",
							"    var jsonData = pm.response.json();",
							"    pm.expect(jsonData.length>0).to.be.true;",
							"});",
							"",
							"pm.test(\"Response must be valid and have a body JSON\", function () {",
							"    pm.response.to.be.ok;",
							"    // pm.response.to.be.withBody;",
							"    pm.response.to.be.json; // this assertion also checks if a body  exists",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments?province=barcelona&from=2017&to=2018",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments"
					],
					"query": [
						{
							"key": "province",
							"value": "barcelona"
						},
						{
							"key": "from",
							"value": "2017"
						},
						{
							"key": "to",
							"value": "2018"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "GET al conjunto de recursos - BD con datos iniciales",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "5b5a18c3-03b2-4d82-b5e3-06cccb1ffe77",
						"exec": [
							"pm.test(\"Status code is 200 Ok\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"BD has Initial Data (sixteen resources)\", function () {",
							"    var jsonData = pm.response.json();",
							"    pm.expect(jsonData.length==16).to.be.true;",
							"});",
							"",
							"pm.test(\"Response must be valid and have a body JSON\", function () {",
							"    pm.response.to.be.ok;",
							"    // pm.response.to.be.withBody;",
							"    pm.response.to.be.json; // this assertion also checks if a body  exists",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://sos1819-sep-jad.herokuapp.com/api/v1/province-employments",
					"protocol": "https",
					"host": [
						"sos1819-sep-jad",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"v1",
						"province-employments"
					]
				}
			},
			"response": []
		}
	],
	"event": [
		{
			"listen": "prerequest",
			"script": {
				"id": "6ea73915-0696-4e08-9bb5-6a0a99d6e222",
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		},
		{
			"listen": "test",
			"script": {
				"id": "ffbc9b26-7a81-4506-ad3a-0f1dca60443b",
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		}
	]
}