# 消息队列JMS通讯开发

## JMS连接工厂池

JMS连接工厂池，用于池化JMS连接，减少创建JMS连接的开销。

使用JMS连接池三方库

``` xml
<dependency>
    <groupId>org.messaginghub</groupId>
    <artifactId>pooled-jms</artifactId>
    <version>1.2.8</version>
</dependency>
```

## JMS连接工厂

> 如下以IBM MQ为例，提供连接工厂配置

``` java
public JmsPoolConnectionFactory jmsPoolConnectionFactory() {
    JmsPoolConnectionFactory jmsPoolConnectionFactory = new JmsPoolConnectionFactory();
    MqQueueConnectionFactory connectionFactory = new MqQueueConnectionFactory();
    connectionFactory.setAppName("MQ_APP");
    connectionFactory.setQueueManager("QM1");
    connectionFactory.setChannel("DEV.APP.SVRCONN");
    connectionFactory.setHostName("192.168.0.3");
    connectionFactory.setPort(1420);
    connectionFactory.setCCSID(1208);
    connectionFactory.setTransportType(WmqConstants.WMQ_CM_CLIENT);
    connectionFactory.setStringProperty(WMQConstants.USERID, "mqm");
    connectionFactory.setStringProperty(WMQConstants.PASSWORD, "<PASSWORD>");
    jmsPoolConnectionFactory.setConnectionFactory(connectionFactory);
    jmsPoolConnectionFactory.setMaxConnections(10);
    jmsPoolConnectionFactory.setConnectionIdleTimeout(30000);
    return jmsPoolConnectionFactory;
}
```

## 消费者

``` java
public void receiveMessage(String queueName) {
    try (Connection connection = jmsPoolConnectionFactory.createConnection();
        Session session = connection.createSession(true, Session.SESSION_TRANSACTED)) {
        Destination destination = session.createQueue(queueName);
        MessageConsumer consumer = session.createConsumer(destination);
        Session finalSession = session;
        consumer.setMessageListener(message -> {
            TextMessage textMessage = (TextMessage) message;
            try {
                // todo 业务处理
                finalSession.commit();
            } catch (Exception e) {
                try {
                    finalSession.rollback();
                } catch (JMSException e1) {
                    logger.error("rollback error", e1);
                }
            }
        });
        connection.start();
    } catch (Exception e) {
        logger.error("receive message error", e);
    }
}
```

## 生产者

``` java
public void sendMessage(String queueName, String message) {
    try (Connection connection = jmsPoolConnectionFactory.createConnection();
        Session session = connection.createSession(true, Session.SESSION_TRANSACTED)) {
        Destination destination = session.createQueue(queueName);
        MessageProducer producer = session.createProducer(destination);
        TextMessage textMessage = session.createTextMessage(message);
        producer.send(textMessage);
        session.commit();
    } catch (Exception e) {
        logger.error("receive message error", e);
    }
}
```