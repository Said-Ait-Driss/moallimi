import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

class WebSocketService {
    client: any;
    constructor() {
        this.client = null;
    }

    connect(onMessageReceived: any, teacherId: any) {
        const socket = new SockJS('http://localhost:9090/ws'); // Your WebSocket endpoint
        this.client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log('Connected to WebSocket');
                this.client.subscribe(`/topic/teacher/${teacherId}`, (message: any) => {
                    onMessageReceived(JSON.parse(message.body));
                });
            },
            debug: (str) => {
                console.log(str);
            }
        });

        this.client.activate();
    }

    sendMessage(notification: any) {
        if (this.client && this.client.connected) {
            this.client.publish({
                destination: '/app/notification', // Your message sending endpoint
                body: JSON.stringify(notification)
            });
        }
    }

    disconnect() {
        if (this.client) {
            this.client.deactivate();
        }
    }
}

export default new WebSocketService();
