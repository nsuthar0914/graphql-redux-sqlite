## A GraphQL Server using MongoDB and JWT authentication with a React+Redux Client

Install mongodb --- https://www.howtoforge.com/tutorial/install-mongodb-on-ubuntu-16.04/
then -- 
```
mongo admin -u admin -p admin123 ##admin you just created or whatever existed before

use gQLrdxtaskdb

db.createUser({user:"gQLrdx", pwd:"gQLrdx", roles:[{role:"readWrite", db:"gQLrdxtaskdb"}]})

exit

npm install

npm run seed

npm start

```
##server runs at localhost:3000/graphql (graphiql suspended to enable passing request into context) 
##client runs at localhost:4000
