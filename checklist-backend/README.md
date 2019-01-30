Run server:

1. Navigate to root directory.
2. Run ```docker-compose up```

Endpoints:

All test cases in db: ```/testcases``` (GET, POST)

Test case with specific id: ```/testcases/<id>``` (GET, POST, PUT)

All projects from jira: ```/projects``` (GET)

All epics from jira for project given project id: ```/epics/<id>``` (GET)

Sample test case object:

```
{
	"name": "testcase 2",
	"description": "this is test case 2",
	"comment": "this is a comment pertaining to test case 2",
	"status": 1,
	"epicId": 14157
}
```

