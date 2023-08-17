
import * as StompJs from '@stomp/stompjs';

let client: StompJs.Client | null = null;

export const createStompClient = (token: string): void => {
  client = new StompJs.Client({
    brokerURL: 'ws://266e8974276247f4b3cad8498606fafb.kakaoiedge.com:80/api/socket/ws-stomp',
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
