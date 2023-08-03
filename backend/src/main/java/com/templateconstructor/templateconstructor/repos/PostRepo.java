package com.templateconstructor.templateconstructor.repos;

import com.templateconstructor.templateconstructor.domains.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostRepo extends MongoRepository<Post, String> {
    List<Post> findByHeaderContaining(String header);
}
