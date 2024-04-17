import { EventBus } from '../EventBus';

type WSSendData = string | number | object;

export enum WSTransportEvents {
  Error = 'error',
  Connected = 'connected',
  Close = 'close',
  Message = 'message'
}

export class WSTransport extends EventBus {
  public socket?: WebSocket;

  private pingInterval?: ReturnType<typeof setInterval>;

  private readonly pingIntervalTime = 30000;

  private url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  public send(data: WSSendData) {
    try {
      if (!this.socket) {
        throw new Error('Socket is not connected');
      }

      this.socket.send(JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  public connect(): Promise<void> {
    try {
      if (this.socket) {
        throw new Error('The socket is already connected');
      }

      this.socket = new WebSocket(this.url);
      this.subscribe(this.socket);
      this.setupPing();
    } catch (error) {
      console.log(error);
    }

    return new Promise((resolve, reject) => {
      this.on(WSTransportEvents.Error, reject);
      this.on(WSTransportEvents.Connected, () => {
        this.on(WSTransportEvents.Error, reject);
        resolve();
      });
    });
  }

  public close() {
    try {
      this.socket?.close();
      clearInterval(this.pingInterval);
    } catch (error) {
      console.log(error);
    }
  }

  private setupPing() {
    try {
      this.pingInterval = setInterval(() => {
        this.send({ type: 'ping' });
      }, this.pingIntervalTime);

      this.on(WSTransportEvents.Close, () => {
        clearInterval(this.pingInterval);
        this.pingInterval = undefined;
      });
    } catch (error) {
      console.log(error);
    }
  }

  private subscribe(socket: WebSocket) {
    try {
      socket.addEventListener('open', () => {
        this.emit(WSTransportEvents.Connected);
      });

      socket.addEventListener('close', () => {
        this.emit(WSTransportEvents.Close);
      });

      socket.addEventListener('error', (error: Event) => {
        this.emit(WSTransportEvents.Error, error);
      });

      socket.addEventListener('message', (message: MessageEvent<any>) => {
        try {
          const data = JSON.parse(message.data);
          if (['pong', 'user connected'].includes(data?.type)) {
            return;
          }
          this.emit(WSTransportEvents.Message, data);
        } catch (error) {
          console.error(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
