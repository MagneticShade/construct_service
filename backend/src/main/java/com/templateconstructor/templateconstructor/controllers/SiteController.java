package com.templateconstructor.templateconstructor.controllers;

import com.templateconstructor.templateconstructor.domains.Site;
import com.templateconstructor.templateconstructor.repos.SiteRepo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class SiteController {
    @Autowired
    SiteRepo siteRepo;

    @Operation(summary = "Получение списка всех сайтов", description = "Возвращает Json с сайтами")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Not Found")
    })
    @GetMapping("/sites")
    public ResponseEntity<List<Site>> getAllPosts() {
        try {
            List<Site> sites = new ArrayList<>();

            siteRepo.findAll().forEach(sites::add);

            return new ResponseEntity<>(sites, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Получение данных определенного сайта по его id", description = "Возвращает Json с сайтом")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Not Found")
    })
    @GetMapping("/sites/{id}")
    public ResponseEntity<Site> getSiteById(@PathVariable("id") String id) {
        Optional<Site> siteData = siteRepo.findById(id);

        if(siteData.isPresent()) {
            return new ResponseEntity<>(siteData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Создание сайта", description = "")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Not Found")
    })
    @PostMapping("/sites")
    public ResponseEntity<Site> createSite(@RequestBody Site site) {
        try {
            Site _site = siteRepo.save(new Site(site.getLocal_id(), site.getUrl(), site.getAdmin_id(), site.getTemplates()));
            return new ResponseEntity<>(_site, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
