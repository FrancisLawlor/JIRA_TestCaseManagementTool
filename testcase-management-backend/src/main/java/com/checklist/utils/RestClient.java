package com.checklist.utils;

import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

public class RestClient {
    public static ResponseEntity<String> request(String url) {
        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.exchange(url, HttpMethod.GET, getHttpEntity(), String.class);
    }

    private static HttpHeaders getHttpHeaders() {
        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.setContentType(MediaType.APPLICATION_JSON);
//        TODO read token from config file
        requestHeaders.add("Authorization", "Basic c2NoaXRyYW5zaGlAZ3VpZGV3aXJlLmNvbTo2Q2c3Y3NvM01IcEJzdk56TDNiVkNCMzM=");
        return requestHeaders;
    }

    private static HttpEntity<?> getHttpEntity() {
        return new HttpEntity<>("parameters", getHttpHeaders());
    }
}
