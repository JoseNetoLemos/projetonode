const http = require("http");

http
.createServer((request,response) => {
    response.writeHead(200, {"Content-Type": "application/json" });


    if(request.url === '/produtos'){
        response.end(JSON.stringify({
            message: "Rota de produto"
        }))
    }

    if(request.url === '/usuarios'){
        response.end(JSON.stringify({
            message: "Rota de usuarios"
        }))
    }

    response.end(JSON.stringify({
        message: "qualquer coisa"
    }))



    response.end(JSON.stringify({
        message: "Minha primeira aplicação com NODEJS"
    }));
})

.listen(4002, () => console.log("O servidor está rodando na porta 4002"))