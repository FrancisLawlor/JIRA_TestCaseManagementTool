Run server:

1. Navigate to root directory.
2. Run ```docker-compose up```

Endpoints:

All test cases in db: ```/testcases``` (GET, POST)

Test case with specific id: ```/testcases/<id>``` (GET, POST, PUT)

All projects from jira: ```/projects``` (GET)

All epics from jira for project given project id: ```/epics/<id>``` (GET)

