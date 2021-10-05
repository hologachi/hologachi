package com.hologachi.backend.controller;

import com.hologachi.backend.model.Post;
import com.hologachi.backend.repository.PostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Slf4j
public class Scheduler {

    @Autowired
    PostRepository postRepository;

    @Scheduled(cron = "0 0 0 * * *")	// 매일 00시 정각에 공동구매 자동 종료됨
    public void autoFinish() throws Exception {
        List<Post> post = postRepository.finishPost();
        for(int i=0; i<post.size(); i++){
            post.get(i).setStep("finish");
            postRepository.save(post.get(i));
        }
    }

//    @Scheduled(cron = "0 * * * * *")	// 1분마다
//    public void test3() throws Exception {
//        List<Post> post = postRepository.finishPost();
//        for(int i=0; i<post.size(); i++){
//            post.get(i).setStep("finish");
//            postRepository.save(post.get(i));
//        }
//    }
}
