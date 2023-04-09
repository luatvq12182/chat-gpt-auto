docker build -t chat-gpt-tool .
docker stop chat-gpt-tool-ins
docker rm chat-gpt-tool-ins
docker run --name chat-gpt-tool-ins -dp 3001:3001 chat-gpt-tool