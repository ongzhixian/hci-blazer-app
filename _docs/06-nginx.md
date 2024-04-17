# nginx CLI

## Windows

start nginx.exe  

.\nginx.exe -t

nginx -s reload     
nginx -s stop 	    fast shutdown
nginx -s quit 	    graceful shutdown

## Configuration

C:\Apps\nginx\conf\nginx.conf

``` conf; forward requests to port 80 to localhost:7071
server {
    listen 80;

    location / {
        proxy_pass http://localhost:7071;
    }
}
```