package com.templateconstructor.templateconstructor.controllers;

import com.templateconstructor.templateconstructor.domains.Post;
import com.templateconstructor.templateconstructor.domains.Template;
import com.templateconstructor.templateconstructor.repos.TemplateRepo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TemplateController {
    @Autowired
    private TemplateRepo templateRepo;

    @Operation(summary = "Получение списка всех шаблонов", description = "")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Not Found")
    })
    @GetMapping("/templates")
    public ResponseEntity<List<Template>> getAllTemplates(@RequestParam(required = false) String name) {
        try {
            List<Template> templates = new ArrayList<>();

            if(name == null)
                templateRepo.findAll().forEach(templates::add);

            if (templates.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(templates, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Создание шаблона", description = "")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Not Found")
    })
    @PostMapping("/templates")
    public ResponseEntity<Template> createPost(@RequestBody Template template) {
        try {
            Template _template = templateRepo.save(new Template(template.getName(), template.getLocal_id()));
            return new ResponseEntity<>(_template, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
