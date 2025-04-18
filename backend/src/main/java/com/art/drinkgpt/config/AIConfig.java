package com.art.drinkgpt.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AIConfig {

    @Bean
    public ChatClient openAiChatClient(ChatClient.Builder chatClientBuilder) {
        return chatClientBuilder.build();
    }
} 