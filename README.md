## A GraphQL Server

Install mongodb --- https://www.howtoforge.com/tutorial/install-mongodb-on-ubuntu-16.04/
then -- 

mongo admin -u admin -p admin123 //admin you just created or whatever existed before

use dharmataskdb

db.createUser({user:"dharma", pwd:"dharma", roles:[{role:"readWrite", db:"dharmataskdb"}]})

npm install

npm run seed

npm start

//server runs at localhost:3000 and client runs at localhost:4000
