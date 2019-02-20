package com.checklist.controller;

import com.checklist.assembler.TestCaseResourceAssembler;
import com.checklist.exception.ResourceNotFoundException;
import com.checklist.model.TestCase;
import com.checklist.repository.TestCaseRepository;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@RestController
public class TestCaseController {

    private final TestCaseRepository testcaseRepository;
    private final TestCaseResourceAssembler assembler;
    private final JdbcTemplate jdbcTemplate;
    private final Logger log;


    public TestCaseController(TestCaseRepository testCaseRepository, TestCaseResourceAssembler assembler, JdbcTemplate jdbcTemplate) {
        this.testcaseRepository = testCaseRepository;
        this.assembler = assembler;
        this.jdbcTemplate = jdbcTemplate;
        this.log = Logger.getLogger(TestCaseController.class.getName());
    }

    @CrossOrigin
    @GetMapping(path = "/testcases", produces = {MediaType.APPLICATION_JSON_UTF8_VALUE})
    public Resources<Resource<TestCase>> all() {
        List<Resource<TestCase>> testcases = testcaseRepository.findAll().stream()
                .map(assembler::toResource)
                .collect(Collectors.toList());

        return new Resources<>(testcases,
                linkTo(methodOn(TestCaseController.class).all()).withSelfRel());

    }

    @CrossOrigin
    @GetMapping(path = "/testcases/{id}", produces = {MediaType.APPLICATION_JSON_UTF8_VALUE})
    public Resource<TestCase> one(@PathVariable Long id) {

        TestCase testCase = testcaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testcases not found with id " + id));

        return assembler.toResource(testCase);
    }

    @CrossOrigin
    @PostMapping("/testcases")
    public TestCase createTestCase(@Valid @RequestBody TestCase testcase) {
            return testcaseRepository.save(testcase);
    }

    @CrossOrigin
    @PutMapping("/testcases/{id}")
    public TestCase updateTestCase(@PathVariable Long id, @Valid @RequestBody TestCase testcaseRequest) {

        return testcaseRepository.findById(id)
            .map(testcaseElement -> {
                testcaseElement.setName(testcaseRequest.getName());
                testcaseElement.setDescription(testcaseRequest.getDescription());
                testcaseElement.setComment(testcaseRequest.getComment());
                testcaseElement.setStatus(testcaseRequest.getStatus());
                testcaseElement.setEpicId(testcaseRequest.getEpicId());

                return testcaseRepository.save(testcaseElement);
            }).orElseThrow(() -> new ResourceNotFoundException("Test case not found with id " + id));
    }

    @CrossOrigin
    @DeleteMapping("/testcases/{id}")
    public ResponseEntity<?> deleteTestcase(@PathVariable Long id) {
        return testcaseRepository.findById(id)
                .map(testcaseElement -> {
                    testcaseRepository.delete(testcaseElement);

                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new ResourceNotFoundException("Test case not found with id " + id));
    }

    @CrossOrigin
    @GetMapping(path = "/testcases/epic/{epicId}", produces = {MediaType.APPLICATION_JSON_UTF8_VALUE})
    public Resources<TestCase> allEpics(@PathVariable String epicId) {
        String sql = "SELECT * FROM testcase WHERE epic_id = '" + epicId + "'";

        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);

        List<TestCase> testcases = new ArrayList<>();
        for(Map<String, Object> row:rows){
            TestCase testcase = new TestCase();
            testcase.setId((long) row.get("id"));
            testcase.setName((String) row.get("name"));
            testcase.setDescription((String) row.get("description"));
            testcase.setComment((String) row.get("comment"));
            testcase.setStatus((int) row.get("status"));
            testcase.setEpicId((String) row.get("epic_id"));

            testcases.add(testcase);
        }

        return new Resources<>(testcases,
                linkTo(methodOn(TestCaseController.class).all()).withSelfRel());
    }
}
