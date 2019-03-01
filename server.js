'use strict';

const Hapi = require('hapi');
const knex = require('knex')(require('./knexfile'))

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return 'Hello, world!';
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {

        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});

server.route({
    method: 'GET',
    path: '/user/{id}',
    handler: (request, h) => {
        const { id } = request.params;
        return knex.select()
            .from('users')
            .where({ id });
        }
});

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
