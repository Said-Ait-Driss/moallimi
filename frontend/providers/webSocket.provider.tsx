import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const connectWebSocket = (teacherId: any, onMessageReceived: any) => {
    const socket = new SockJS('http://localhost:9090/ws');
    const client = new Client({
        webSocketFactory: () => socket,
        debug: (str) => {
            console.log(str);
        },
        onConnect: () => {
            console.log('Connected to WebSocket');
            client.subscribe(`/topic/teacher/${teacherId}`, (message) => {
                onMessageReceived(message.body);
            });
        },
        onStompError: (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        }
    });

    client.activate();
    return client;
};

export default connectWebSocket;
