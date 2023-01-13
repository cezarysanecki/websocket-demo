package pl.cezarysanecki.websocket;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("app.websocket")
public class WebSocketProperties {
  /**
   * Prefix used for WebSocket destination mappings
   */
  private String applicationPrefix = "/topic";
  /**
   * Prefix used by topics
   */
  private String topicPrefix = "/topic";
  /**
   * Endpoint that can be used to connect to
   */
  private String endpoint = "/live";
  /**
   * Allowed origins
   */
  private String[] allowedOrigins = new String[0];

  String getApplicationPrefix() {
    return applicationPrefix;
  }

  void setApplicationPrefix(String applicationPrefix) {
    this.applicationPrefix = applicationPrefix;
  }

  String getTopicPrefix() {
    return topicPrefix;
  }

  void setTopicPrefix(String topicPrefix) {
    this.topicPrefix = topicPrefix;
  }

  String getEndpoint() {
    return endpoint;
  }

  void setEndpoint(String endpoint) {
    this.endpoint = endpoint;
  }

  String[] getAllowedOrigins() {
    return allowedOrigins;
  }

  void setAllowedOrigins(String[] allowedOrigins) {
    this.allowedOrigins = allowedOrigins;
  }
}
