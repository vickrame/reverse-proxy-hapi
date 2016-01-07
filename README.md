# reverse-proxy-hapi

## Objectif 
Mettre en place un reverse proxy avec hapi et joi

## Tests
Test les méthodes http si le test est concluant forward vers google.fr sinon on affiche un message KO.

POST : localhost:3000/xmlTojson
```
<data>
    <email>a@a.com</email>
</data>

<data>
    <email>a@a.com</email>
    <password>123456</password>    
</data>
```
POST : localhost:3000/createJson
```
{
    "email":"vujoodha@free.fr",
    "password" : "1234"
}
{
    "email":"vujoodha",
    "password" : "1234"
}
```
GET  pathQuery : teste si les paramètres nom et prenom sont présent
```
http://localhost:3000/pathQuery?nom=aaa&prenom=aaa
http://localhost:3000/pathQuery?nom=aaa
```
GET  paramsQuery : teste si le paramètre est un email valide
```
http://localhost:3000/paramsQuery/a
http://localhost:3000/paramsQuery/a@a.com
```

DELETE : 

