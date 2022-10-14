type Listener = (...params: any[]) => void;

export default class Emit {
  private static listenerMap: Map<string, Listener[]> = new Map();

  static on(name: string, listener: Listener) {
    const listeners = this.listenerMap.get(name) || [];
    this.listenerMap.set(name, [...listeners, listener]);
    
    return () => {
      this.off(name, listener);
    };
  }

  static off(name: string, listener: Listener) {
    const listeners = this.listenerMap.get(name) || [];
    this.listenerMap.set(name, listeners.filter((l) => l !== listener));
  }

  static emit(name: string, ...params: any[]) {
    const listeners = this.listenerMap.get(name) || [];
    listeners.forEach((listener) => listener(...params));
  }
}
