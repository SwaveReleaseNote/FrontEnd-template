
import * as StompJs from '@stomp/stompjs';

let client: StompJs.Client | null = null;

export const createStompClient = (token: string): void => {
  client = new StompJs.Client({
    brokerURL: 'ws://61.109.214.110:80/api/alert/ws-stomp',
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
