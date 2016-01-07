# reverse-proxy-hapi

## Objectif 
Mettre en place un reverse proxy avec hapi et joi

## Tests

POST : localhost:3000/xmlTojson
<data>
    <email>a@a.com</email>
</data>

<data>
    <email>a@a.com</email>
    <password>123456</password>    
</data>

POST : localhost:3000/createJson
{
    "email":"vujoodha@free.fr",
    "password" : "1234"
}
{
    "email":"vujoodha",
    "password" : "1234"
}

GET : 
DELETE : 

