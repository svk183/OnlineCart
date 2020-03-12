'use strict';

const Hapi = require('@hapi/hapi');
const axios = require('axios');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        method: 'GET',
        path: '/bookdetails/{requestKey}',
        handler: async (request, h) => {
            let response;

            await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${request.params.requestKey}&key=AIzaSyCp0eK9W8R_LmhNx8baXA6mfdNy12FKFU0`)
            .then(result => {
                response = result;
            })
            .catch(error => {
                return 'error in fetching data';
            });

            if( response && response.data && response.data.items ){
                return response.data.items.map( ( obj ) => {
                            return {
                                        id: obj.id,
                                        authors: obj.volumeInfo.authors,
                                        currency: (obj.saleInfo.retailPrice && obj.saleInfo.retailPrice.currencyCode ) ? obj.saleInfo.retailPrice.currencyCode : '',
                                        price: (obj.saleInfo.retailPrice && obj.saleInfo.retailPrice.amount ) ? obj.saleInfo.retailPrice.amount : 0,
                                        imageLink: obj.volumeInfo.imageLinks && obj.volumeInfo.imageLinks.thumbnail ? obj.volumeInfo.imageLinks.thumbnail : '',
                                        publisher: obj.volumeInfo.publisher,
                                        title: obj.volumeInfo.title,
                                        description: obj.volumeInfo.description
                                    };
                        }).filter( ( bookDetails ) => {
                            if( bookDetails.price > 0 )
                                return true;
                        });
            } else 
                return [];
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();