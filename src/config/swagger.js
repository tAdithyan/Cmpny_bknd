const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node.js API with Swagger',
            version: '1.0.0',
            description: 'A simple Express API application with Swagger documentation',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                Blog: {
                    type: 'object',
                    required: ['title', 'content', 'image', 'Excerpt'],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'The auto-generated id of the blog',
                        },
                        title: {
                            type: 'string',
                            description: 'The title of the blog',
                        },
                        content: {
                            type: 'string',
                            description: 'The content of the blog',
                        },
                        Excerpt: {
                            type: 'string',
                            description: 'The excerpt of the blog',
                        },
                        image: {
                            type: 'string',
                            description: 'The URL of the blog image',
                        },
                    },
                    example: {
                        id: 1,
                        title: 'My Blog',
                        content: 'This is a blog content',
                        Excerpt: 'This is a short summary...',
                        image: 'https://example.com/image.jpg',
                    },
                },
                Offer: {
                    type: 'object',
                    required: ['headline', 'description', 'image'],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'The auto-generated id of the offer',
                        },
                        headline: {
                            type: 'string',
                            description: 'The headline of the offer',
                        },
                        subline: {
                            type: 'string',
                            description: 'The subline of the offer',
                        },
                        description: {
                            type: 'string',
                            description: 'The description of the offer',
                        },
                        image: {
                            type: 'string',
                            description: 'The URL of the offer image',
                        },
                    },
                    example: {
                        id: 1,
                        headline: 'Big Sale',
                        subline: 'Limited Time Only',
                        description: 'Get 50% off on all items',
                        image: 'https://example.com/offer.jpg',
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
