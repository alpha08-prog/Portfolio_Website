db.createCollection("nonfiction", {
    validator: {
        $jsonSchema: {
            required: ['name', 'price'],
            properties: {
                name: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                price: {
                    bsonType: 'number',
                    description: "must be a number and is required"
                }
            }

        }
    },
    validationAction: "error"
})

db.runCommand({
    collMod: 'nonfiction',
    validator: {
        $jsonSchema: {
            required: ['name', 'price', 'author'],
            properties: {
                name: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                price: {
                    bsonType: 'number',
                    description: "must be a number and is required"
                },
                author: {
                    bsonType: "array",
                    description: "must be a string and is required",
                    items: {
                        bsonType: "object",
                        required: ["name", "age"],
                        properties: {
                            name: {
                                bsonType: "string",
                                description: "must be a string and is required"
                            },
                            age: {
                                bsonType: "int",
                                description: "must be an integer and is required"
                            }
                        }
                    }
                }

            }
        }
    },
    validationAction: "error"
    })