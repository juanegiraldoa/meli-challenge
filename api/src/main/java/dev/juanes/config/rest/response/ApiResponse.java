package dev.juanes.config.rest.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResponse(
        Object data,
        String message,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        LocalDateTime timestamp) {

    public ApiResponse(Object data) {
        this(data, null, LocalDateTime.now());
    }

    public ApiResponse(String msg) {
        this(null, msg, LocalDateTime.now());
    }
}
