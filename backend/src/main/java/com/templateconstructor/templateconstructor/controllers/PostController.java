package com.templateconstructor.templateconstructor.controllers;

import com.templateconstructor.templateconstructor.domains.Post;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.templateconstructor.templateconstructor.repos.PostRepo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class PostController {
    @Autowired
    PostRepo postRepo;

    @Operation(summary = "Получение списка всех постов", description = "")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Not Found")
    })
    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getAllPosts(@RequestParam(required = false) String header) {
        try {
            List<Post> posts = new ArrayList<>();

            if(header == null)
                postRepo.findAll().forEach(posts::add);
            else
                postRepo.findByHeaderContaining(header).forEach(posts::add);

            if (posts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(posts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Получение конкретного поста по его id", description = "")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Not Found")
    })
    @GetMapping("/posts/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable("id") String id) {
        Optional<Post> postData = postRepo.findById(id);

        if(postData.isPresent()) {
            return new ResponseEntity<>(postData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Создание поста", description = "")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Not Found")
    })
    @PostMapping("/posts")
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        try {
            Post _post = postRepo.save(new Post(post.getLocal_id(), post.getContent(), post.getHeader()));
            return new ResponseEntity<>(_post, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Обновление определенного поста по его id", description = "")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Not Found")
    })
    @PutMapping("/posts/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable("id") String id, Post post) {
        Optional<Post> postData = postRepo.findById(id);

        if(postData.isPresent()) {
            Post _post = postData.get();
            _post.setHeader(post.getHeader());
            _post.setContent(post.getContent());
            _post.setLocal_id(post.getLocal_id());
            return new ResponseEntity<>(postRepo.save(_post), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Удаление поста по его id", description = "")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Not Found")
    })
    @DeleteMapping("/posts/{id}")
    public ResponseEntity<HttpStatus> deletePost(@PathVariable("id") String id) {
        try {
            postRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Удаление всех постов", description = "")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Not Found")
    })
    @DeleteMapping("/posts")
    public ResponseEntity<HttpStatus> deleteAllPosts() {
        try {
            postRepo.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
