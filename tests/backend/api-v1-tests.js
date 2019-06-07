{
	"info": {
		"_postman_id": "f5975da4-b179-4abe-8cd5-5a378775a06d",
		"name": "SOS1819-jun-jad-D01-province-employments",
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
					"raw": "https://sos1819-jun-jad.herokuapp.com/api/v1/province-employments?",
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
					"raw": "https://sos1819-jun-jad.herokuapp.com/api/v1/province-employments/loadInitialData",
					"protocol": "https",
					"host": [
						"sos1819-jun-jad",
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
							"pm.test(\"BD has Initial Data (five resources)\", function () {",
							"    var jsonData = pm.response.json();",
							"    pm.expect(jsonData.length==5).to.be.true;",
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
			"response": []
		},
		{
			"name": "POST al conjunto de recursos - Crea recurso",
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
					"raw": "{\n        \"province\": \"cordoba\",\n        \"year\": \"2018\",\n        \"industryEmployment\": \"44000\",\n        \"buildingEmployment\": \"35000\",\n        \"servicesEmployment\": \"373400\"\n    }"
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
			"response": []
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
						"value": "application/json",
						"type": "text"
					}
				],
				"url": {
					"raw": "https://sos1819-jun-jad.herokuapp.com/api/v1/province-employments/cordoba/2018",
					"protocol": "https",
					"host": [
						"sos1819-jun-jad",
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
					"raw": "{\n        \"province\": \"cordoba\",\n        \"year\": \"2018\",\n        \"industryEmployment\": \"44000\",\n        \"buildingEmployment\": \"35000\",\n        \"servicesEmployment\": \"373400\"\n    }"
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
					"raw": "https://sos1819-jun-jad.herokuapp.com/api/v1/province-employments/sevilla/2018",
					"protocol": "https",
					"host": [
						"sos1819-jun-jad",
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
					"raw": "https://sos1819-jun-jad.herokuapp.com/api/v1/province-employments/cordoba/2018",
					"protocol": "https",
					"host": [
						"sos1819-jun-jad",
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
					"raw": "https://sos1819-jun-jad.herokuapp.com/api/v1/province-employments/cordoba/2018",
					"protocol": "https",
					"host": [
						"sos1819-jun-jad",
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
					"raw": "https://sos1819-jun-jad.herokuapp.com/api/v1/province-employments/sevilla/2018",
					"protocol": "https",
					"host": [
						"sos1819-jun-jad",
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
			"name": "PUT a un recurso - Actualiza recurso",
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
					"raw": "{\n        \"province\": \"sevilla\",\n        \"year\": \"2018\",\n        \"industryEmployment\": \"44000\",\n        \"buildingEmployment\": \"35000\",\n        \"servicesEmployment\": \"373400\"\n    }"
				},
				"url": {
					"raw": "https://sos1819-jun-jad.herokuapp.com/api/v1/province-employments/sevilla/2018",
					"protocol": "https",
					"host": [
						"sos1819-jun-jad",
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
					"raw": "https://sos1819-jun-jad.herokuapp.com/api/v1/province-employments/sevilla/2018",
					"protocol": "https",
					"host": [
						"sos1819-jun-jad",
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
					"raw": "{\n        \"province\": \"huelva\",\n        \"year\": \"2018\",\n        \"industryEmployment\": \"44000\",\n        \"buildingEmployment\": \"35000\",\n        \"servicesEmployment\": \"373400\"\n    }"
				},
				"url": {
					"raw": "https://sos1819-jun-jad.herokuapp.com/api/v1/province-employments/huelva/2018",
					"protocol": "https",
					"host": [
						"sos1819-jun-jad",
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
					"raw": "{\n    \t\"province\": \"sevilla\",\n\t\t\"year\": \"2018\",\n    \t\"industryEmployment\": \"79950\",\n    \t\"buildingEmployment\": \"49325\",\n\t\t\"servicesEmployment\": \"639775\" \n    }\n    "
				},
				"url": {
					"raw": "https://sos1819-jun-jad.herokuapp.com/api/v1/province-employments/sevilla/2018",
					"protocol": "https",
					"host": [
						"sos1819-jun-jad",
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
							"pm.test(\"BD has Initial Data (five resources)\", function () {",
							"    var jsonData = pm.response.json();",
							"    pm.expect(jsonData.length==5).to.be.true;",
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