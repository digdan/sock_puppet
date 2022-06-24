# sock_puppet
A Rapid Application Development Tool for IPC

## How it works
Sock Puppet is a IPC ( Inter Process Communication ) tool that can enable any program to have bi-directional updates to a website through a web-socket.


`PORT=8686 npm start common.sock`


Will create a websocket server on port 8686 that communicates to other processes through a UNIX (POSIX) Sock file named `common.sock`


You can then send messages to your websocket by mapping stdin/stdout to the sock file :


`socat UNIX-CONNECT:common.sock EXEC:"npm run pulse --silent"`


This will send a "context" to the websocket clients. This context is used as an exchangable variable scope.


## Why?
This tool isn't intended for any scalability or production use. This tool is simply used during development to push variable contexts up to a website.

The reason for this tool was originally to test out different mapping algorithms. When doing so, it would not be worth the time to create a full or robust API integrations. I wanted something very losley coupled and instant. I was also looking for something very lightweight on the algorithms themselves. Reading/writing from STDIN/STDOUT is a light as it gets :D
