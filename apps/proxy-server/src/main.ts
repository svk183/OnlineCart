import * as Hapi from '@hapi/hapi';
import * as axios from 'axios';
import { environment } from './environments/environment';

const booksURL = environment.urlLinks.googleBooksFetch.replace('##', environment.googleAPIKey);

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        config: {
            cors: {
                origin: ['http://localhost:4200']
            }
        },
        method: 'GET',
        path: '/bookdetails/{requestKey}',
        handler: async (request: any, h: any) => {
            let response: any;

            await axios.get(booksURL.replace('#', request.params.requestKey))
            .then((result: any) => {
                response = result;
            })
            .catch((error: any) => {
                return 'error in fetching data';
            });

            if( response && response.data && response.data.items ){
                return response.data.items.map( ( obj: { id: any; volumeInfo: { authors: any; imageLinks: { thumbnail: any; }; publisher: any; title: any; description: any; }; saleInfo: { retailPrice: { currencyCode: any; amount: any; }; }; } ) => {
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
                        }).filter( ( bookDetails: { price: number; } ) => {
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