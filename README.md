cotd
====
Simple Device Management App`

Git Commands:
// set workspace to the develop branch
git branch develop
git push origin develop
git pull origin develop


// releasing changes
git branch master
git merge develop
git tag v1.0
git push tags 

Starting the servers
   Angular Web Server
   	- cd ~/angular/cotd
   	- node scripts/web-server.js
   	- http://localhost:8000/app/index.html

   configuring nginx server to serve the angular app
     sudo vi /usr/local/etc/nginx/nginx.conf
     Add the following configuration

    server {
        listen       8100;
        server_name  localhost;

        location / {
            root   html;
            index  index.html index.htm;
        }

        location /cotd {
            alias /Users/sunil/angular/cotd/app/;
            index  index.html;
        }
    }
    http://localhost:8100/cotd



   Backend Node Server
     - node server.js
