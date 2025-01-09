"use client";

import { makeSessionPremium } from "@/action/auth";
import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { HOST } from "@/utils/enums/host";

function WebSocketClient({ username }: { username: string }) {
    const clientRef = useRef<any>(null);

    useEffect(() => {
        const socket = new SockJS(`${HOST.BACKEND_URL}/ws`);
        const client = Stomp.over(socket);

        // Configure heartbeat intervals
        client.heartbeat.outgoing = 10000; // Send heartbeats every 10 seconds
        client.heartbeat.incoming = 10000; // Expect heartbeats every 10 seconds

        // Limit debug output to connection events
        client.debug = (str) => {
            if (str.includes("CONNECTED") || str.includes("DISCONNECTED")) {
                console.log(str);
            }
        };

        client.connect(
            {},
            () => {
                console.log("Connected to WebSocket server");

                // Subscribe to the desired topic
                const subscription = client.subscribe(
                    `/topic/${username}/login`,
                    async (message) => {
                        console.log("Relogin requested");
                        await makeSessionPremium();
                    }
                );

                // Store the client and subscription for cleanup
                clientRef.current = { client, subscription };
            },
            (error) => {
                console.error("Connection error:", error);
            }
        );

        return () => {
            if (clientRef.current) {
                const { client, subscription } = clientRef.current;
                if (subscription) subscription.unsubscribe();
                client.disconnect(() => {
                    console.log("Disconnected from WebSocket server");
                });
            }
        };
    }, []);

    return null;
}

export default WebSocketClient;
