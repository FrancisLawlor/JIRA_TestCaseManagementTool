package com.checklist.controller;

import com.checklist.utils.RestClient;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProjectController {
    @CrossOrigin
    @GetMapping(path = "/projects", produces = {MediaType.APPLICATION_JSON_UTF8_VALUE})
    public String all() {
        String url = "https://yourcompany.atlassian.net/rest/api/2/project";
        ResponseEntity<String> response = RestClient.request(url);

        return response.getBody();
    }
}
