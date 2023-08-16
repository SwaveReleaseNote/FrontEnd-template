
import * as StompJs from '@stomp/stompjs';

let client: StompJs.Client | null = null;

export const createStompClient = (token: string): void => {
  client = new StompJs.Client({
    brokerURL: 'ws://back-service:8080/ws-stomp',
    connectHeaders: {
      Authorization: token,
    },
    onConnect: () => {
      console.log('StompJS client connected');
    },
  });
};

export const activateStompClient = (): void => {
  if (client != null) {
    client.activate();
  }
};

export const deactivateStompClient = (): void => {
  if (client != null) {
    void client.deactivate();
    console.log('StompJS client deactivated');
  }
};