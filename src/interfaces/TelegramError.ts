export interface TelegramError {
    response: {
      ok: boolean;
      error_code: number;
      description: string;
      parameters?: { retry_after: number };
    };
    on: {
      method: string;
      payload: {
        chat_id: number;
        message_thread_id?: any;
        text: string;
      };
    };
  }
  