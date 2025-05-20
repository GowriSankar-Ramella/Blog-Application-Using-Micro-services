import amqp from "amqplib";
import { redisClient } from "../index.js"
import { Blog } from "../models/blog.model.js";


export const startCacheConsumer = async () => {
    try {
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: "localhost",
            port: 5672,
            username: "admin",
            password: "admin123",
        });

        const channel = await connection.createChannel();

        const queueName = "cache-invalidation";

        await channel.assertQueue(queueName, { durable: true });

        console.log("✅ Blog Service cache consumer started");

        channel.consume(queueName, async (msg) => {
            if (msg) {
                try {
                    const content = JSON.parse(
                        msg.content.toString()
                    );

                    console.log(
                        "📩 Blog service recieved cache invalidation message",
                        content
                    );

                    if (content.action === "invalidateCache") {
                        for (const pattern of content.keys) {
                            const keys = await redisClient.keys(pattern);

                            if (keys.length > 0) {
                                await redisClient.del(keys);

                                console.log(
                                    `🗑️ Blog service invalidated ${keys.length} cache keys matching: ${pattern}`
                                );

                                const category = "";

                                const search = "";

                                const cacheKey = `blogs:${search}:${category}`;

                                const blogs = await Blog.find().sort({ createdAt: -1 });

                                await redisClient.set(cacheKey, JSON.stringify(blogs), {
                                    EX: 3600,
                                });

                                console.log("🔄️ Cache rebuilt with key:", cacheKey);
                            }
                        }
                    }

                    channel.ack(msg);
                } catch (error) {
                    console.error(
                        "❌ Error processing cache invalidation in blog service:",
                        error
                    );

                    channel.nack(msg, false, true);
                }
            }
        });
    } catch (error) {
        console.error("❌ Failed to start rabbitmq consumer");
    }
};