Bitcoin Binary Options
=====================

Setup
---------------------

1. Install Redis and MongoDB for user management

    $ nano mongo.sh

    apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
    echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | tee -a /etc/apt/sources.list.d/10gen.list
    apt-get -y update
    apt-get -y install mongodb-10gen

    $ chmod +x ./mongo.sh
    $ bash ./mongo.sh

    $ wget http://download.redis.io/releases/redis-3.0.0.tar.gz
    $ tar xzf redis-3.0.0.tar.gz
    $ cd redis-3.0.0
    $ make

2. Install NodeJS locally and remotely and start the servers

    $ sudo apt-get install npm
    $ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.24.1/install.sh | bash
    $ nvm install stable
    $ npm install -g forever

    $ forever binarybtc.js

    $ apt-add-repository ppa:bitcoin/bitcoin
    $ apt-get update
    $ apt-get install bitcoind
    $ bitcoind
    
    $ forever kapitalcoin.js
    
3. Create necessary keyfiles in your /home/ubuntu/keys/ directory 

    authy.key	Authy private access token
    coin.key    Kapitalcoin.js API private key
    irc.host	irc://localhost:6697/vbit
    mail.id     Mail from address
    mail.key    Mail IMAP password
    mongo.key	Mongo connection URL: mongodb://nodemongo:MasterPassword@localhost/binarybtc
    redis.key	Redis connection URL: redis://RedisM4ST3RP4SS@localhost:6379/binarybtc
    send.key	Master Bitcoin sending password
    server.csr	Server SSL CSR
    server.key	Server SSL Key
    www_io.crt  Domain SSL CRT




Connection
---------------------

It's recomended to use Nginx or another web server to forward connections from port 80

Express port: 8080

Socket.io port: 3000

Execution
---------------------

