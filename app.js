/**

Video de Referência para Revisar sobre como criar um servidor com NODEJS,
EPRESS, importar o FS, randomUUID e utilizar os métodos, POST>GET>DELETE>PUT>UPDATE.

https://www.youtube.com/watch?v=fm4_EuCsQwg

 **/


const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");

const app = express();

app.use(express.json()); 

let products = [];

fs.readFile("products.json", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        products = JSON.parse(data)
    }
});

/*
POST
GET 
PUT
DELETe
*/

/**
 Body: Sempre que eu quiser enviar dados para a minha aplicação.
 Params: /products/321037192873
 Query: products?id=12873198237&value=12937198273
**/

app.post("/products", (request, response) => {
    //nome e preço
    const { name, price } = request.body;

    const product = {
        name,
        price,
        id: randomUUID(),
    };


    products.push(product)
   
    createProductFile();

    return response.json(product);
    
    });


    app.get("/products", (request, response) => {
        return response.json(products);
    });


    app.get("/products/:id", (request, response) => {
        const { id } = request.params;
        const product = products.find(product => product.id === id);
        return response.json(product);
    });

    app.put("/products/:id", (request, response) => {
        const { id } = request.params;
        const { name, price } = request.body;

        const productIndex = products.findIndex(product => product.id === id);
        products[productIndex] = {
            ...products[productIndex],
            name, 
            price
        };

        ProductFile();

        return response.json("Produto Alterado com sucesso!")

    });

    app.delete("/products/:id", (request,response) =>{
        const{id} = request.params;
        const productIndex = products.findIndex(product => product.id === id);

        products.splice(productIndex, 1);

        response.json("produto removido com sucesso!")

        ProductFile();

    });

    function ProductFile(){

        fs.writeFile("products.json", JSON.stringify(products), (err) => {

            if (err){
                console.log(err);
            }
            else{
                console.log("produto inserido!");
            }
    
        });

    }

app.listen(4003, () => console.log("O servidor esá rodando na porta 4003."));