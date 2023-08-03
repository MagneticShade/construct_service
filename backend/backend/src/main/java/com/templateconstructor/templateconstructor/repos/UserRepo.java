package com.templateconstructor.templateconstructor.repos;

import com.templateconstructor.templateconstructor.domains.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<User, String> {

}
