package com.checklist.controller;

import com.checklist.utils.RestClient;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EpicController {
    @CrossOrigin
    @GetMapping(path = "/epics/{id}", produces = {MediaType.APPLICATION_JSON_UTF8_VALUE})
    public String all(@PathVariable Long id) {
        String url = "https://yourcompany.atlassian.net/rest/api/2/search?jql=project=" + id + " and issuetype=Epic";
        ResponseEntity<String> response = RestClient.request(url);

        return response.getBody();
    }
}
