# sock_puppet
A Rapid Application Development Tool for IPC

## How it works
Sock Puppet is a IPC ( Inter Process Communication ) tool that can enable any program to have bi-directional updates to a website through a web-socket.


`PORT=8686 npm start common.sock`


Will create a websocket server on port 8686 that communicates to other processes through a UNIX (POSIX) Sock file named `common.sock`


You can then send messages to your websocket by mapping stdin/stdout to the sock file :


`socat UNIX-CONNECT:common.sock EXEC:"npm run pulse --silent"`


This will send a "context" to the websocket clients. This context is used as an exchangable variable scope.
